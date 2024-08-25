import {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeParameterResourceLocator,
	NodeParameterValueType,
} from 'n8n-workflow';

type NTFYRequestData = {
	headers?: { [key: string]: string };
	body?: { [key: string]: string | string[] | NTFYActionButton[] | Buffer | undefined };
};

type EmojisAndTags = {
	emojisAndTags: {
		tag: INodeParameterResourceLocator;
	}[];
};

type AdditionalOptions = {
	[key: string]: any | undefined;
};

type N8NActionButtons = {
	actionButtons: {
		action: 'view' | 'http';
		label: string;
		url: string;
		clear: boolean;
		method: 'GET' | 'POST' | 'PUT' | 'DELETE';
		headersJson: string;
		bodyJson: string;
	}[];
};

type NTFYActionButton = {
	action: 'view' | 'http';
	label: string;
	url: string;
	clear: boolean;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	headers?: { [key: string]: string };
	body?: string;
};

type N8NAttachment = {
	attachment: {
		filename?: string;
		url: string;
	};
};

function getValueFromNodeParameter(
	this: IExecuteFunctions,
	index: number,
	fieldName: string,
): NodeParameterValueType | object {
	try {
		try {
			return this.getNodeParameter(fieldName, index);
		} catch {
			const additionalOptions = this.getNodeParameter(
				'additionalOptions',
				index,
			) as AdditionalOptions;
			return additionalOptions[fieldName];
		}
	} catch {
		return null;
	}
}

function getTagsFromNodeParameter(emojisAndTags: EmojisAndTags): string[] {
	return emojisAndTags.emojisAndTags.map(({ tag }) => tag.value) as string[];
}

function getActionButtonsFromNodeParameter(actionButtons: N8NActionButtons): NTFYActionButton[] {
	return actionButtons.actionButtons.map(
		({ action, label, url, clear, method, headersJson, bodyJson }) => {
			const button: NTFYActionButton = { action, label, url, clear };

			if (action === 'http') {
				button.method = method;
				button.headers = JSON.parse(headersJson);
				button.body = bodyJson;
			}

			return button;
		},
	);
}

export async function constructRequestData(
	this: IExecuteFunctions,
	index: number,
	fields: string[],
): Promise<NTFYRequestData> {
	const requestData: NTFYRequestData = {
		headers: {},
		body: {},
	};

	for (const field of fields) {
		const value = getValueFromNodeParameter.call(this, index, field);

		if (value) {
			switch (field) {
				case 'tags':
					if ((value as EmojisAndTags).emojisAndTags) {
						requestData.body![field] = getTagsFromNodeParameter(value as EmojisAndTags);
					}
					break;
				case 'actions':
					if ((value as N8NActionButtons).actionButtons) {
						requestData.body![field] = getActionButtonsFromNodeParameter(value as N8NActionButtons);
					}
					break;
				case 'attach':
					if ((value as N8NAttachment).attachment) {
						const { filename, url } = (value as N8NAttachment).attachment;
						requestData.body!.attach = url;
						if (filename) requestData.body!.filename = filename;
					}
					break;
				case 'manualJson':
					requestData.headers = JSON.parse(value as string);
					break;
				case 'fileAttachment':
					requestData.body = {
						buffer: await this.helpers.getBinaryDataBuffer(index, value as string),
					};
					break;
				default:
					requestData.body![field] = value as string;
			}
		}
	}

	return requestData;
}

export async function requestNTFYApi(
	this: IExecuteFunctions,
	index: number,
	requestData: NTFYRequestData,
) {
	const constructNotification = this.getNodeParameter('constructNotification', index) as string;
	const useCustomServer = this.getNodeParameter('useCustomServer', index);
	const topic = this.getNodeParameter('topic', index) as string;
	const serverUrl = useCustomServer
		? `${this.getNodeParameter('serverUrl', index) as string}`
		: `https://ntfy.sh`;

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: constructNotification === 'jsonAndBinaryFields' ? serverUrl + '/' + topic : serverUrl,
		json: constructNotification === 'jsonAndBinaryFields' ? true : undefined,
		headers: constructNotification === 'jsonAndBinaryFields' ? requestData.headers : {},
		body:
			constructNotification === 'jsonAndBinaryFields' ? requestData.body?.buffer : requestData.body,
	};

	try {
		const credentials = await this.getCredentials('ntfyApi', index);
		if (credentials)
			return this.helpers.httpRequestWithAuthentication.call(this, 'ntfyApi', options);
	} catch {
		return this.helpers.httpRequest(options);
	}
}
