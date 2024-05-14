import { INodeProperties } from 'n8n-workflow';

export const mainFields: INodeProperties[] = [
	{
		displayName: 'Use Custom Server',
		name: 'useCustomServer',
		description: 'Whether to use a custom server. If not, the default server will be used.',
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
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'options',
		default: 3,
		options: [
			{
				name: 'Max',
				value: 5,
			},
			{
				name: 'High',
				value: 4,
			},
			{
				name: 'Default',
				value: 3,
			},
			{
				name: 'Low',
				value: 2,
			},
			{
				name: 'Min',
				value: 1,
			},
		],
		noDataExpression: true,
	},
	{
		displayName: 'Emojis/Tags',
		name: 'tags',
		type: 'fixedCollection',
		default: {},
		placeholder: 'Add Emoji/Tag',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: '',
				name: 'emojisAndTags',
				values: [
					{
						displayName: 'Emoji/Tag',
						name: 'tag',
						type: 'resourceLocator',
						default: '',
						modes: [
							{
								displayName: 'String',
								name: 'string',
								type: 'string',
							},
							{
								displayName: 'Emoji',
								name: 'list',
								type: 'list',
								typeOptions: {
									searchListMethod: 'searchEmojis',
									searchable: true,
								},
							},
						],
					},
				],
			},
		],
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		typeOptions: {
			rows: 7,
		},
	},
];
