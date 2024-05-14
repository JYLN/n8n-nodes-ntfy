import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class NtfyApi implements ICredentialType {
	name = 'ntfyApi';
	displayName: string = 'NTFY API';
	properties: INodeProperties[] = [
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
}
