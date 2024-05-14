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

export async function constructBody(
	this: IExecuteFunctions,
	index: number,
	fieldArray: string[],
): Promise<NTFYBody> {
	const body: NTFYBody = {};

	for (const field of fieldArray) {
		try {
			// Main Fields
			switch (field) {
				case 'tags':
					const { emojisAndTags } = this.getNodeParameter(field, index) as EmojisAndTags;

					if (emojisAndTags) {
						body[field] = emojisAndTags.map((emoji) => emoji.tag.value);
					}
					break;
				default:
					body[field] = this.getNodeParameter(field, index) as string;
			}
		} catch (err) {
			// Additional Fields
			console.log(err);
		}
	}

	return body;
}
