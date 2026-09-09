import {
	BINARY_ENCODING,
	IExecuteFunctions,
	IHttpRequestOptions,
	NodeOperationError,
	NodeParameterValueType,
} from 'n8n-workflow';
// eslint-disable-next-line
import type { Readable } from 'stream';

type NTFYRequestData = {
	headers: { [key: string]: string };
	body?: Buffer<ArrayBufferLike> | Readable | string;
};

type EmojisAndTags = {
	emojis: string[];
	customTags: string;
};

type N8NActionButtons = {
	actionButtons: {
		action: 'view' | 'http';
		label: string;
		url: string;
		clear: boolean;
		method: 'GET' | 'POST' | 'PUT' | 'DELETE';
		sendBody: boolean;
		sendHeaders: boolean;
		headersJson: string;
		bodyJson: string;
	}[];
};

type N8NAttachment = {
	attachment: {
		filename?: string;
		url: string;
	};
};

type AdditionalOptions =
	| {
			actions?: object;
			fileAttach?: string;
			urlAttach?: string;
			click?: string;
			icon?: string;
			markdown?: boolean;
			delay?: string;
	  }
	| undefined;

function getFieldsFromNode(this: IExecuteFunctions) {
	const nodeParameters = this.getNode().parameters;
	return Object.keys(nodeParameters);
}

function getValueFromNodeParameter(
	this: IExecuteFunctions,
	index: number,
	fieldName: string,
): NodeParameterValueType | object {
	try {
		return this.getNodeParameter(fieldName, index);
	} catch {
		return null;
	}
}

function getTagsFromNodeParameter(this: IExecuteFunctions, emojisAndTags: EmojisAndTags): string {
	const { emojis, customTags: customTagsInput } = emojisAndTags;
	let customTags: string[] = [];

	if (customTagsInput) {
		const tagRegex = /^[a-zA-Z-0-9_-]+$/;
		customTags = customTagsInput
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);

		const invalidTags = customTags.filter((tag) => !tagRegex.test(tag));

		if (invalidTags.length > 0) {
			throw new NodeOperationError(
				this.getNode(),
				`Invalid tag format: "${invalidTags.join(', ')}". Use only letters, numbers, hyphens, and underscores. Spaces are not allowed within tags.`,
			);
		}
	}

	return [...emojis, ...customTags].join(',');
}

function getActionButtonsFromNodeParameter(actionButtons: N8NActionButtons): string {
	const formattedActions = actionButtons.actionButtons.map(
		({ action, label, url, clear, method, sendHeaders, headersJson, sendBody, bodyJson }) => {
			const buttonParts = [action, label, url];

			if (clear === true) buttonParts.push(`clear=true`);

			if (action === 'http') {
				buttonParts.push(`method=${method}`);
				if (sendHeaders) {
					for (const [key, val] of Object.entries(JSON.parse(headersJson))) {
						buttonParts.push(`headers.${key}=${val}`);
					}
				}
				if (sendBody) {
					buttonParts.push(`body=${bodyJson}`);
				}
			}

			return buttonParts.join(', ');
		},
	);

	return formattedActions.join('; ');
}

function setHeaderName(field: string) {
	return field.replace(
		/\w\S*/g,
		(text) => 'X-' + text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
	);
}

function isValidHttpHeaderValue(val: unknown): val is string {
	if (typeof val !== 'string') return false;

	for (const char of val) {
		const codePoint = char.codePointAt(0)!;

		// Reject C0 control chars, including CR, LF, Tab...
		if (codePoint < 0x20) return false;

		// Reject DEL
		if (codePoint === 0x7f) return false;

		// Reject C1 control chars
		if (codePoint >= 0x80 && codePoint <= 0x9f) return false;
	}

	return true;
}

function validateHeaderValue(this: IExecuteFunctions, val: unknown, headerName: string): string {
	if (typeof val !== 'string' && typeof val !== 'number' && typeof val !== 'boolean') {
		throw new NodeOperationError(
			this.getNode(),
			`Header "${headerName}" must be a string, number, or boolean`,
		);
	}

	const stringValue = String(val);

	if (!isValidHttpHeaderValue(stringValue)) {
		throw new NodeOperationError(
			this.getNode(),
			`Header "${headerName}" contains invalid control characters`,
		);
	}

	return stringValue;
}

function encodeRfc2047(val: string): string {
	return `=?UTF-8?B?${Buffer.from(val, 'utf-8').toString('base64')}?=`;
}

function encodeHeaderValue(this: IExecuteFunctions, val: unknown, headerName: string): string {
	if (headerName.toLowerCase() === 'x-message') {
		if (typeof val !== 'string') {
			throw new NodeOperationError(this.getNode(), `Header ${headerName} must be a string`);
		}

		return encodeRfc2047(val);
	}

	const stringValue = validateHeaderValue.call(this, val, headerName);
	for (const char of stringValue) {
		if (char.codePointAt(0)! > 0x7f) {
			return encodeRfc2047(stringValue);
		}
	}

	return stringValue;
}

export async function constructRequestData(
	this: IExecuteFunctions,
	index: number,
): Promise<NTFYRequestData> {
	const fields = getFieldsFromNode.call(this);
	const requestData: NTFYRequestData = {
		headers: {},
	};

	for (const field of fields) {
		const fieldHeaderName = setHeaderName(field);
		const value = getValueFromNodeParameter.call(this, index, field);

		if (value === null || value === undefined) continue;

		switch (field) {
			case 'message': {
				const additionalOptions = getValueFromNodeParameter.call(
					this,
					index,
					'additionalOptions',
				) as AdditionalOptions;

				const message = String(value);

				if (additionalOptions?.fileAttach) {
					requestData.headers['X-Message'] = message;
				} else {
					requestData.body = message;
				}
				break;
			}
			case 'tags': {
				const tags = value as EmojisAndTags;

				if (tags.emojis || tags.customTags) {
					const tagValue = getTagsFromNodeParameter.call(this, tags);

					requestData.headers[fieldHeaderName] = validateHeaderValue.call(
						this,
						tagValue,
						fieldHeaderName,
					);
				}
				break;
			}
			case 'additionalOptions': {
				const additionalFields = value;
				const returnHeaders: NTFYRequestData['headers'] = {};
				for (const [additionalField, additionalValue] of Object.entries(additionalFields)) {
					if (additionalField === 'actions') {
						returnHeaders['X-Actions'] = getActionButtonsFromNodeParameter(
							additionalValue as N8NActionButtons,
						);
						continue;
					}
					if (additionalField === 'fileAttach') {
						let uploadData: Buffer | Readable;
						const n8nBinaryData = this.helpers.assertBinaryData(index, additionalValue);
						if (n8nBinaryData.id) {
							uploadData = await this.helpers.getBinaryStream(n8nBinaryData.id);
						} else {
							uploadData = Buffer.from(n8nBinaryData.data, BINARY_ENCODING);
						}
						requestData.body = uploadData;
						continue;
					}
					if (additionalField === 'urlAttach') {
						const urlAttachment = additionalValue as N8NAttachment;
						if (urlAttachment.attachment) {
							const { filename, url } = urlAttachment.attachment;
							returnHeaders['X-Attach'] = url;
							if (filename) returnHeaders['X-Filename'] = filename;
						}
						continue;
					}

					const headerName = setHeaderName(additionalField);
					returnHeaders[headerName] = validateHeaderValue.call(this, additionalValue, headerName);
				}

				Object.assign(requestData.headers, returnHeaders);
				break;
			}
			default:
				requestData.headers[fieldHeaderName] = validateHeaderValue.call(
					this,
					value,
					fieldHeaderName,
				);
		}
	}

	return requestData;
}

export async function requestNTFYApi(
	this: IExecuteFunctions,
	index: number,
	requestData: NTFYRequestData,
) {
	try {
		const credentials = await this.getCredentials('ntfyApi', index);
		const serverUrl = credentials.serverUrl as string;
		const { 'X-Topic': topic, ...restHeaders } = requestData.headers;

		const requestHeaders: { [key: string]: string } = {};
		for (const [header, value] of Object.entries(restHeaders)) {
			requestHeaders[header] = encodeHeaderValue.call(this, value, header);
		}

		const options: IHttpRequestOptions = {
			method: 'POST',
			url: serverUrl + '/' + topic,
			headers: requestHeaders,
			body: requestData.body || undefined,
		};

		return this.helpers.httpRequestWithAuthentication.call(this, 'ntfyApi', options);
	} catch (err) {
		throw new NodeOperationError(this.getNode(), err as Error);
	}
}
