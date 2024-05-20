import {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeParameterResourceLocator,
} from 'n8n-workflow';

type NTFYBody = {
	[key: string]: string | string[] | undefined;
};

type EmojisAndTags = {
	emojisAndTags: {
		tag: INodeParameterResourceLocator;
	}[];
};

type AdditionalOptions = {
	[key: string]: any | undefined;
};

function getValueFromNodeParameter(
	this: IExecuteFunctions,
	index: number,
	fieldName: string,
): string | string[] | EmojisAndTags | undefined {
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
