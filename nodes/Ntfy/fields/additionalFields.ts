import { INodeProperties } from 'n8n-workflow';

export const additionalFields: INodeProperties[] = [
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				constructNotification: ['generalFields'],
			},
		},
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
								description:
									'URL to open when the action button is clicked. Refer to the <a href="https://docs.ntfy.sh/publish/#click-action">NTFY Docs</a> for valid URLs.',
								type: 'string',
								default: '',
								placeholder: 'https://example.com',
							},
							{
								displayName: 'Clear',
								name: 'clear',
								description: 'Whether to clear the notfication after action button is pressed',
								type: 'boolean',
								default: false,
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
							// TODO: Header and body parameters by name/value fixedCollection
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
								description: 'JSON object of headers to send',
								type: 'json',
								default: '',
								displayOptions: {
									show: {
										sendHeaders: [true],
									},
								},
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
								description: 'JSON object to send as body',
								type: 'json',
								default: '',
								displayOptions: {
									show: {
										sendBody: [true],
									},
								},
							},
						],
					},
				],
			},
			{
				displayName: 'Attachment',
				name: 'attach',
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
