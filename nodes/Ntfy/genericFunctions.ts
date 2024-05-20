import {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeParameterResourceLocator,
} from 'n8n-workflow';

type NTFYBody = {
	[key: string]: string | string[] | NTFYActionButton[] | undefined;
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
): string | string[] | EmojisAndTags | N8NActionButtons | N8NAttachment | undefined {
	try {
		return this.getNodeParameter(fieldName, index) as string;
	} catch {
		const additionalOptions = this.getNodeParameter(
			'additionalOptions',
			index,
		) as AdditionalOptions;
		return additionalOptions[fieldName] as string;
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

export async function constructBody(
	this: IExecuteFunctions,
	index: number,
	fields: string[],
): Promise<NTFYBody> {
	const body: NTFYBody = {};

	for (const field of fields) {
		const value = getValueFromNodeParameter.call(this, index, field);

		if (value) {
			switch (field) {
				case 'tags':
					if ((value as EmojisAndTags).emojisAndTags) {
						body[field] = getTagsFromNodeParameter(value as EmojisAndTags);
					}
					break;
				case 'actions':
					if ((value as N8NActionButtons).actionButtons) {
						body[field] = getActionButtonsFromNodeParameter(value as N8NActionButtons);
					}
					break;
				case 'attach':
					if ((value as N8NAttachment).attachment) {
						const { filename, url } = (value as N8NAttachment).attachment;
						body.attach = url;
						if (filename) body.filename = filename;
					}
					break;
				default:
					body[field] = value as string;
			}
		}
	}

	return body;
}

export async function requestNTFYApi(this: IExecuteFunctions, index: number, body: NTFYBody) {
	const useCustomServer = this.getNodeParameter('useCustomServer', index);
	const serverUrl = useCustomServer
		? (this.getNodeParameter('serverUrl', index) as string)
		: 'https://ntfy.sh';

	const options: IHttpRequestOptions = {
		url: serverUrl,
		method: 'POST',
		json: true,
		body,
	};

	try {
		const credentials = await this.getCredentials('ntfyApi', index);
		if (credentials) return this.helpers.requestWithAuthentication.call(this, 'ntfyApi', options);
	} catch {
		return this.helpers.request(options);
	}
}
