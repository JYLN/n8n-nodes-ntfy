import { INodeProperties } from 'n8n-workflow';

export const generalFields: INodeProperties[] = [
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				constructNotification: ['generalFields'],
			},
		},
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
		displayOptions: {
			show: {
				constructNotification: ['generalFields'],
			},
		},
	},
	{
		displayName: 'Emojis/Tags',
		name: 'tags',
		description: 'View the full list of emojis <a href="https://docs.ntfy.sh/emojis">here</a>',
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
						noDataExpression: true,
					},
				],
			},
		],
		displayOptions: {
			show: {
				constructNotification: ['generalFields'],
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		typeOptions: {
			rows: 7,
		},
		displayOptions: {
			show: {
				constructNotification: ['generalFields'],
			},
		},
	},
];
