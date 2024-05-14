import { INodeProperties } from 'n8n-workflow';

export const additionalFields: INodeProperties[] = [
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Click Action',
				name: 'click',
				type: 'string',
				default: '',
				placeholder: 'https://example.com',
				description:
					'URL to open when the notification is clicked. Refer to the <a href="https://docs.ntfy.sh/publish/#click-action">NTFY Docs</a> for valid URLs.',
			},
		],
	},
];
