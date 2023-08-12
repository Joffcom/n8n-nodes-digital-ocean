import type { OptionsWithUri } from 'request';

import type {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

export async function digitalOceanApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: string,
	resource: string,
	body: any = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
) {
	const authenticationMethod = this.getNodeParameter('authentication', 0);

	let options: OptionsWithUri = {
		method,
		qs,
		body,
		uri: uri || `https://api.digitalocean.com/v2/${resource}`,
		json: true,
	};

	options = Object.assign({}, options, option);
	if (Object.keys(options.body as IDataObject).length === 0) {
		delete options.body;
	}

	const credentialType = authenticationMethod === 'accessToken' ? 'digitalOceanApi' : 'digitalOceanOAuth2Api';

	return this.helpers.requestWithAuthentication.call(this, credentialType, options);
}

export async function digitalOceanApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	propertyName: string,
	method: string,
	resource: string,
	body: any = {},
	query: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];

	let responseData;

	let uri: string | undefined;

	do {
		query.per_page = 20;
		responseData = await digitalOceanApiRequest.call(this, method, resource, body, query, uri);
		uri = responseData.links.pages?.next || undefined;
		returnData.push.apply(returnData, responseData[propertyName] as IDataObject[]);
		const limit = query.limit as number | undefined;
		if (limit && limit <= returnData.length) {
			return returnData;
		}
	} while (responseData.links.pages?.next !== undefined && responseData.links.pages?.next !== null);

	return returnData;
}
