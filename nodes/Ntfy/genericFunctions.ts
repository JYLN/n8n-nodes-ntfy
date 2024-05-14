import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';

type NTFYBody = {
	[key: string]: string | string[] | undefined;
};

type EmojisAndTags = {
	emojisAndTags: {
		tag: {
			__r1: boolean;
			value: string;
			mode: string;
			cachedResultName: string;
		};
	}[];
};

type AdditionalOptions = {
	[key: string]: any | undefined;
};

export async function constructBody(
	this: IExecuteFunctions,
	index: number,
	fieldArray: string[],
): Promise<NTFYBody> {
	const body: NTFYBody = {};

	for (const field of fieldArray) {
		try {
			// Main Fields
			const mainField = this.getNodeParameter(field, index);

			if (mainField) {
				switch (field) {
					case 'tags':
						const { emojisAndTags } = mainField as EmojisAndTags;

						if (emojisAndTags) {
							body[field] = emojisAndTags.map((emoji) => emoji.tag.value);
						}
						break;
					default:
						body[field] = mainField as string;
				}
			}
		} catch {
			// Additional Fields
			const additionalOption = (
				this.getNodeParameter('additionalOptions', index) as AdditionalOptions
			)[field];

			if (additionalOption) {
				switch (field) {
					default:
						body[field] = additionalOption;
				}
			}
		}
	}

	return body;
}

export async function ntfyApiRequest(this: IExecuteFunctions, index: number, body: NTFYBody) {
	// Get if custom server is used
	const useCustomServer = this.getNodeParameter('useCustomServer', index) as boolean;

	// HTTP Request options
	const options: IHttpRequestOptions = {
		url: useCustomServer
			? (this.getNodeParameter('serverUrl', index) as string)
			: 'https://ntfy.sh',
		method: 'POST',
		json: true,
		body: JSON.stringify(body),
	};

	let response;

	try {
		const credentials = await this.getCredentials('ntfyApi', index);

		if (credentials) {
			response = await this.helpers.requestWithAuthentication.call(this, 'ntfyApi', options);
		}
	} catch {
		response = await this.helpers.request(options);
	}

	return response;
}
