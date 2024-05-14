import { INodeType, INodeTypeDescription } from 'n8n-workflow';

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
		properties: [],
	};
}
