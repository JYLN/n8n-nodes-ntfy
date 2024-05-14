import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeListSearchResult,
	INodeType,
	INodeTypeDescription,
	NodeExecutionWithMetadata,
} from 'n8n-workflow';
import emojis from './emojis.json';
import { constructBody } from './genericFunctions';
import { mainFields } from './mainFields';

export class Ntfy implements INodeType {
	description: INodeTypeDescription = {
		name: 'ntfy',
		displayName: 'NTFY',
		icon: 'file:ntfy.svg',
		version: 1,
		description: 'Send notifications with ntfy.sh',
		group: [],
		defaults: {
			name: 'NTFY',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [...mainFields],
		credentials: [
			{
				name: 'ntfyApi',
			},
		],
	};

	methods = {
		listSearch: {
			async searchEmojis(
				this: ILoadOptionsFunctions,
				query?: string,
			): Promise<INodeListSearchResult> {
				return {
					results: emojis
						.filter((emoji) => emoji.text.toLowerCase().includes(query?.toLowerCase() || ''))
						.map((emoji) => ({
							name: `${emoji.emoji} - ${emoji.text}`,
							value: emoji.text,
						})),
				};
			},
		},
	};
	async execute(
		this: IExecuteFunctions,
	): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			const body = await constructBody.call(this, i, [
				'topic',
				'title',
				'priority',
				'tags',
				'message',
			]);

			returnData.push(body);
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
