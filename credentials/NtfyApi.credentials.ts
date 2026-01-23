import {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NtfyApi implements ICredentialType {
	name = 'ntfyApi';
	displayName = 'NTFY API';
	documentationUrl = 'https://github.com/JYLN/n8n-nodes-ntfy/wiki/Credentials';
	icon: Icon = 'file:../nodes/Ntfy/ntfy.svg';
	properties: INodeProperties[] = [
		{
			name: 'serverUrl',
			displayName: 'Server URL',
			type: 'string',
			default: 'https://ntfy.sh',
			required: true,
			description:
				'The URL of the ntfy server you intend to publish to. Only change this if using a custom ntfy server.',
		},
		{
			displayName: 'Bearer Token',
			name: 'bearerToken',
			type: 'string',
			default: '',
			placeholder: 'tk_xxxxxxxxxxxxxxxxxxxxxxxxxx',
			typeOptions: { password: true },
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.bearerToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.serverUrl}}',
			url: '/v1/account',
			method: 'GET',
		},
	};
}
