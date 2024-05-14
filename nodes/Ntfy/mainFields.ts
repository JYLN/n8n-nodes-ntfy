import { INodeProperties } from 'n8n-workflow';

export const mainFields: INodeProperties[] = [
	{
		displayName: 'Use Custom Server',
		name: 'useCustomServer',
		type: 'boolean',
		default: false,
	},
	{
		displayName: 'Server URL',
		name: 'serverUrl',
		type: 'string',
		default: '',
		placeholder: 'https://ntfy.sh',
		description: 'The URL of the ntfy.sh server',
		displayOptions: {
			show: {
				useCustomServer: [true],
			},
		},
	},
	{
		displayName: 'Topic',
		name: 'topic',
		type: 'string',
		default: '',
		placeholder: 'mytopic',
		required: true,
	},
];
