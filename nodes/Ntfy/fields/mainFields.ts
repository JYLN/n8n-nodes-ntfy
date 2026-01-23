import { INodeProperties } from 'n8n-workflow';

export const mainFields: INodeProperties[] = [
	{
		displayName: 'Topic',
		name: 'topic',
		type: 'string',
		default: '',
		placeholder: 'my-topic',
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
		default: 3,
		noDataExpression: true,
	},
	{
		displayName: 'Emojis/Tags',
		name: 'tags',
		type: 'collection',
		placeholder: 'Add Emoji/Tag',
		options: [
			{
				// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
				displayName: 'Emojis',
				name: 'emojis',
				type: 'multiOptions',
				// eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-multi-options
				description:
					'Choose from the list of emojis below. View the full list of available emojis on the <a href="https://docs.ntfy.sh/emojis">ntfy docs</a>.',
				typeOptions: {
					loadOptionsMethod: 'getEmojis',
				},
				default: [],
				// requiresDataPath: 'multiple',
			},
			{
				displayName: 'Custom Tags',
				name: 'customTags',
				description:
					'If your tag is not a valid emoji, you can add your tag here. Separate tags by using commas. EX: tag1,tag2,tag3',
				type: 'string',
				default: '',
				validateType: 'string',
			},
		],
		default: {},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		typeOptions: {
			rows: 7,
		},
		default: '',
	},
];
