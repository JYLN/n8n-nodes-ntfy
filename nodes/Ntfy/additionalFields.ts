import { INodeProperties } from 'n8n-workflow';

export const additionalFields: INodeProperties[] = [
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Option',
		options: [
			// TODO: Header and body parameters by name/value fixedCollection
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
								displayName: 'Label',
								name: 'label',
								type: 'string',
								default: '',
							},
							{
								displayName: 'URL',
								name: 'url',
								type: 'string',
								default: '',
								placeholder: 'https://example.com',
								description:
									'URL to open when the action button is clicked. Refer to the <a href="https://docs.ntfy.sh/publish/#click-action">NTFY Docs</a> for valid URLs.',
							},
							{
								displayName: 'Clear',
								name: 'clear',
								type: 'boolean',
								default: false,
								description: 'Whether to clear the notfication after action button is pressed',
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
								displayName: 'Send Headers',
								name: 'sendHeaders',
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
								default: '',
								displayOptions: {
									show: {
										sendHeaders: [true],
									},
								},
								description: 'JSON object of headers to send',
							},
							{
								displayName: 'Send Body',
								name: 'sendBody',
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
								default: '',
								displayOptions: {
									show: {
										sendBody: [true],
									},
								},
								description: 'JSON object to send as body',
							},
						],
					},
				],
			},
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
			{
				displayName: 'Scheduled Delivery',
				name: 'delay',
				type: 'string',
				default: '',
				description:
					'Time to wait before sending the notification. Refer to the <a href="https://docs.ntfy.sh/publish/#scheduled-delivery">NTFY Docs</a> for valid time strings.',
			},
		],
	},
];
