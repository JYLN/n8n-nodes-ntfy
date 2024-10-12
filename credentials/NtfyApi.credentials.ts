import { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class NtfyApi implements ICredentialType {
	name = 'ntfyApi';
	displayName: string = 'NTFY API';
	icon?: Icon | undefined = 'file:../nodes/Ntfy/ntfy.svg';
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
