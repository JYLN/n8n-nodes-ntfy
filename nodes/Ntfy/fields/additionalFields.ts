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
				displayName: 'Action Buttons',
				name: 'actions',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Action Button',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						displayName: 'Action',
						name: 'actionButtons',
						// eslint-disable-next-line n8n-nodes-base/node-param-fixed-collection-type-unsorted-items
						values: [
							{
								displayName: 'Action',
								name: 'action',
								type: 'options',
								default: 'view',
								options: [
									{
										name: 'View',
										value: 'view',
									},
									{
										name: 'HTTP',
										value: 'http',
									},
								],
							},
							{
								displayName: 'Clear',
								name: 'clear',
								description: 'Whether to clear the notification when the action button is clicked',
								type: 'boolean',
								default: false,
							},
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Method',
								name: 'method',
								type: 'options',
								default: 'POST',
								displayOptions: {
									show: {
										action: ['http'],
									},
								},
								options: [
									{
										name: 'GET',
										value: 'GET',
									},
									{
										name: 'POST',
										value: 'POST',
									},
									{
										name: 'PUT',
										value: 'PUT',
									},
									{
										name: 'DELETE',
										value: 'DELETE',
									},
								],
							},
							{
								displayName: 'URL',
								name: 'url',
								description:
									'URL to open when the action button is clicked. Refer to the <a href="https://docs.ntfy.sh/publish/#click-action">NTFY Docs</a> for valid URLs.',
								type: 'string',
								default: '',
								placeholder: 'https://example.com',
							},
							{
								displayName: 'Send Body',
								name: 'sendBody',
								description:
									'Whether to send a custom body with the request made with the action button',
								type: 'boolean',
								default: false,
								displayOptions: {
									show: {
										action: ['http'],
									},
								},
							},
							{
								displayName: 'Body',
								name: 'bodyJson',
								type: 'json',
								default: '{}',
								displayOptions: {
									show: {
										action: ['http'],
										sendBody: [true],
									},
								},
							},
							{
								displayName: 'Send Headers',
								name: 'sendHeaders',
								description:
									'Whether to send custom headers with the request made with the action button',
								type: 'boolean',
								default: false,
								displayOptions: {
									show: {
										action: ['http'],
									},
								},
							},
							{
								displayName: 'Headers',
								name: 'headersJson',
								type: 'json',
								default: '{}',
								displayOptions: {
									show: {
										action: ['http'],
										sendHeaders: [true],
									},
								},
							},
						],
					},
				],
			},
			{
				displayName: 'Attachment by File',
				name: 'fileAttach',
				type: 'string',
				default: '',
				placeholder: 'data',
				description:
					'File to use as attachment on notification. Data must be a n8n binary item. For more information regarding file attachments, check ntfy <a href="https://docs.ntfy.sh/publish/#attach-local-file" target="_blank">docs</a>.',
				hint: 'The name of the input binary field containing the file to be extracted',
			},
			{
				displayName: 'Attachment by URL',
				name: 'urlAttach',
				// eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-json
				description:
					'Add an attachment to the notification. <strong>NOTE</strong>: This is only for live URLs to attachments. To use n8n binary data for attachments, change the "Construct Notification" field to "JSON and Binary Fields". For more information, check out the <a href="https://github.com/JYLN/n8n-nodes-ntfy/wiki/Usage#json-and-binary-fields">docs</a>.',
				type: 'fixedCollection',
				default: { attachment: [{ name: '', url: '' }] },
				placeholder: 'Add Attachment',
				options: [
					{
						displayName: 'Attachment',
						name: 'attachment',
						values: [
							{
								displayName: 'Filename',
								name: 'filename',
								description: 'Change the filename of the attachment in the notification',
								type: 'string',
								default: '',
							},
							{
								displayName: 'URL',
								name: 'url',
								description: 'URL of an image/file to attach to the notification',
								type: 'string',
								default: '',
								placeholder: 'https://example.com/filename.jpg',
							},
						],
					},
				],
			},
			{
				displayName: 'Click Action',
				name: 'click',
				description:
					'URL to open when the notification is clicked. Refer to the <a href="https://docs.ntfy.sh/publish/#click-action">NTFY Docs</a> for valid URLs.',
				type: 'string',
				default: '',
				placeholder: 'https://example.com',
			},
			{
				displayName: 'Icon',
				name: 'icon',
				description:
					'URL of a JPEG/PNG image to use as the notification icon. Refer to the <a href="https://docs.ntfy.sh/publish/#icon">NTFY Docs</a> for valid icons.',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/icon.png',
			},
			{
				displayName: 'Markdown',
				name: 'markdown',
				description:
					'Whether to use Markdown formatting within the message of the notification. Refer to the <a href="https://docs.ntfy.sh/publish/#markdown-formatting">NTFY Docs</a> for more information.',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Scheduled Delivery',
				name: 'delay',
				description:
					'Time to wait before sending the notification. Refer to the <a href="https://docs.ntfy.sh/publish/#scheduled-delivery">NTFY Docs</a> for valid time strings.',
				type: 'string',
				default: '',
				placeholder: '30m OR 2 hours OR 1 day OR etc...',
			},
		],
	},
];
