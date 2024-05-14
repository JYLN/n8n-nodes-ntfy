import {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import emojis from './emojis.json';
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
}
