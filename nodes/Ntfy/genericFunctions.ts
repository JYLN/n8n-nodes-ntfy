import { IExecuteFunctions } from 'n8n-workflow';

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
