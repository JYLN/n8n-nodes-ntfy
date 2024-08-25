import { INodeProperties } from 'n8n-workflow';

export const jsonFields: INodeProperties[] = [
	{
		displayName: 'JSON',
		name: 'manualJson',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				constructNotification: ['jsonAndBinaryFields'],
			},
		},
		description:
			'JSON object to send as headers. Check ntfy <a href="https://docs.ntfy.sh/publish/#list-of-all-parameters" target="_blank">docs</a> to learn more.',
	},
	{
		displayName: 'File Attachment',
		name: 'fileAttachment',
		type: 'string',
		default: '',
		description:
			'File to use as attachment on notification. Data must be a n8n binary item. For more information regarding file attachments, check ntfy <a href="https://docs.ntfy.sh/publish/#attach-local-file" target="_blank">docs</a>.',
		displayOptions: {
			show: {
				constructNotification: ['jsonAndBinaryFields'],
			},
		},
		hint: 'The name of the input binary field containing the file to be extracted',
	},
];
