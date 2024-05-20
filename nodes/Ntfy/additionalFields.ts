import { INodeProperties } from 'n8n-workflow';

export const additionalFields: INodeProperties[] = [
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Option',
		options: [
			// TODO: Action Buttons
			// TODO: Attachments via binary (not sure how to do this yet, and will likely require all other input data to be headers instead of body)
			{
				displayName: 'Attachment',
				name: 'attach',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/filename.jpg',
				description:
					'URL of an image/file to attach to the notification (binary data not supported yet)',
			},
			{
				displayName: 'Click Action',
				name: 'click',
				type: 'string',
				default: '',
				placeholder: 'https://example.com',
				description:
					'URL to open when the notification is clicked. Refer to the <a href="https://docs.ntfy.sh/publish/#click-action">NTFY Docs</a> for valid URLs.',
			},
			// TODO: Schedule Delivery
		],
	},
];
