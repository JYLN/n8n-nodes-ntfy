import { INodeProperties } from 'n8n-workflow';

export const mainFields: INodeProperties[] = [
	{
		displayName: 'Use Custom Server',
		name: 'useCustomServer',
		description:
			'Whether to use a custom server. If not, the default server (ntfy.sh) will be used.',
		type: 'boolean',
		default: false,
	},
	{
		displayName: 'Server URL',
		name: 'serverUrl',
		description: 'The URL of the ntfy.sh server',
		type: 'string',
		default: '',
		placeholder: 'https://ntfy.sh',
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
	{
		displayName: 'Construct Notification',
		name: 'constructNotification',
		type: 'options',
		default: 'generalFields',
		options: [
			{
				name: 'Using the Fields Below',
				value: 'generalFields',
			},
			{
				name: 'JSON and Binary',
				value: 'jsonAndBinaryFields',
			},
		],
	},
];
