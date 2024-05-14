import { INodeProperties } from 'n8n-workflow';

export const additionalFields: INodeProperties[] = [
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Option',
		options: [],
	},
];
