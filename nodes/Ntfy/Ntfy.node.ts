import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
	NodeOutput,
} from 'n8n-workflow';
import emojis from './data/emojis.json';
import { additionalFields } from './fields/additionalFields';
import { mainFields } from './fields/mainFields';
import { constructRequestData, requestNTFYApi } from './genericFunctions';

export class Ntfy implements INodeType {
	description: INodeTypeDescription = {
		name: 'ntfy',
		displayName: 'ntfy',
		icon: 'file:ntfy.svg',
		version: 1,
		description: 'Send notifcations with ntfy.sh',
		subtitle: `={{ "Send to topic: " + $parameter["topic"] }}`,
		group: ['transform'],
		defaults: {
			name: 'NTFY',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		properties: [...mainFields, ...additionalFields],
		credentials: [
			{
				name: 'ntfyApi',
				required: true,
			},
		],
		usableAsTool: true,
	};

	methods = {
		loadOptions: {
			async getEmojis(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return emojis.map((emoji) => ({
					name: `${emoji.emoji} - ${emoji.text}`,
					value: emoji.text,
				}));
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<NodeOutput> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const requestData = await constructRequestData.call(this, i);
				const response = await requestNTFYApi.call(this, i, requestData);
				returnData.push(response);
			} catch (err) {
				if (this.continueOnFail()) {
					returnData.push({ error: err.message });
					continue;
				}
				throw err;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
