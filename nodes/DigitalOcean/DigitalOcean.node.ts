import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { NodeOperationError } from 'n8n-workflow';

import { digitalOceanApiRequest, digitalOceanApiRequestAllItems } from './GenericFunctions';
import {
	accountDescription,
	actionDescription,
	actionFields,
	dropletDescription,
	dropletFields
} from './Descriptions';

export class DigitalOcean implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Digital Ocean',
		name: 'digitalOcean',
		group: ['transform'],
		icon: 'file:digitalocean.svg',
		version: 1,
		description: 'Digital Ocean',
		defaults: {
			name: 'Digital Ocean',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'digitalOceanApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['accessToken'],
					},
				},
			},
			{
				name: 'digitalOceanOAuth2Api',
				required: true,
				displayOptions: {
					show: {
						authentication: ['oAuth2'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Access Token',
						value: 'accessToken',
					},
					{
						name: 'OAuth2',
						value: 'oAuth2',
					},
				],
				default: 'accessToken',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Action',
						value: 'action',
					},
					{
						name: 'Droplet',
						value: 'droplet',
					},
				],
				default: 'account',
			},
			...accountDescription,
			...actionDescription,
			...actionFields,
			...dropletDescription,
			...dropletFields,
		],
	};

	methods = {
		loadOptions: {
			// Get Sizes
			async getSizes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const dropletSizes = await digitalOceanApiRequestAllItems.call(this, 'sizes', 'GET', 'sizes');

				for (const dropletSize of dropletSizes) {
					const dropletSizeName = dropletSize.slug;
					const dropletSizeId = dropletSize.slug;

					returnData.push({
						name: dropletSizeName,
						value: dropletSizeId,
					});
				}

				return returnData;
			},
			// Get Images
			async getDistributionImages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const dropletImages = await digitalOceanApiRequestAllItems.call(this, 'images', 'GET', 'images?type=distribution');

				for (const dropletImage of dropletImages) {
					const dropletImageName = dropletImage.name;
					const dropletImageId = dropletImage.id;

					returnData.push({
						name: dropletImageName,
						value: dropletImageId,
					});
				}

				return returnData;
			},
			async getAppImages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const dropletImages = await digitalOceanApiRequestAllItems.call(this, 'images', 'GET', 'images?type=application');

				for (const dropletImage of dropletImages) {
					const dropletImageName = dropletImage.name;
					const dropletImageId = dropletImage.id;

					returnData.push({
						name: dropletImageName,
						value: dropletImageId,
					});
				}

				return returnData;
			},
			// Get Regions
			async getRegions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const regions = await digitalOceanApiRequestAllItems.call(this, 'regions', 'GET', 'regions');

				for (const region of regions) {
					const regionName = region.name;
					const regionId = region.slug;

					returnData.push({
						name: regionName,
						value: regionId,
					});
				}

				return returnData;
			},
			// Get SSH Keys
			async getSSHKeys(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const sshKeys = await digitalOceanApiRequestAllItems.call(this, 'ssh_keys', 'GET', 'account/keys');

				for (const sshKey of sshKeys) {
					const sshKeyName = sshKey.name;
					const sshKeyId = sshKey.id;

					returnData.push({
						name: sshKeyName,
						value: sshKeyId,
					});
				}

				return returnData;
			},
			// Get Tags
			async getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const tags = await digitalOceanApiRequestAllItems.call(this, 'tags', 'GET', 'tags');

				for (const tag of tags) {
					const tagName = tag.name;
					const tagId = tag.name;

					returnData.push({
						name: tagName,
						value: tagId,
					});
				}

				return returnData;
			},
			// Get Droplets
			async getDroplets(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const droplets = await digitalOceanApiRequestAllItems.call(this, 'droplets', 'GET', 'droplets');

				for (const droplet of droplets) {
					const dropletName = droplet.name;
					const dropletId = droplet.id;

					returnData.push({
						name: dropletName,
						value: dropletId,
					});
				}

				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		let responseData;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const resource = this.getNodeParameter('resource', 0);
				const operation = this.getNodeParameter('operation', 0);

				if (resource === 'account') {
					if (operation === 'get') {
						responseData = await digitalOceanApiRequest.call(this, 'GET', 'account');
						responseData = responseData.account;
					}
				}

				if (resource === 'action') {
					if (operation === 'get') {
						const actionId = this.getNodeParameter('actionId', itemIndex) as number;

						responseData = await digitalOceanApiRequest.call(this, 'GET', `actions/${actionId}`);
						responseData = responseData.action;
					}
					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
						const qs: IDataObject = {};

						if (returnAll) {
							responseData = await digitalOceanApiRequestAllItems.call(this, 'actions', 'GET', 'actions', {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', itemIndex) as number;
							qs.limit = limit;
							// Allow more than the 200 items default limit
							if (limit >= 200) {
								responseData = await digitalOceanApiRequestAllItems.call(this, 'actions', 'GET', 'actions', {}, qs);
							} else {
								responseData = await digitalOceanApiRequest.call(this, 'GET', 'actions', {}, qs);
								responseData = responseData.actions;
							}
						}
					}

				}

				if (resource === 'droplet') {
					if (operation === 'get') {
						const dropletId = this.getNodeParameter('dropletId', itemIndex) as number;

						responseData = await digitalOceanApiRequest.call(this, 'GET', 'droplets', {}, {droplet_id: dropletId});
						responseData = responseData.droplets;
					}
					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
						const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;
						const qs: IDataObject = {};

						if (additionalFields.tagName) {
							qs.tag_name = additionalFields.tagName as string;
						}

						if (additionalFields.name) {
							qs.name = additionalFields.name as string;
						}

						if (qs.name && qs.tag_name) {
							throw new NodeOperationError(this.getNode(), 'The Digital Ocean API does not allow both Tag Name and Name to be used, Please remove one of the options and try again.', {
								itemIndex,
							});
						}

						if (returnAll) {
							responseData = await digitalOceanApiRequestAllItems.call(this, 'droplets', 'GET', 'droplets', {}, qs);
						} else {
							const limit = this.getNodeParameter('limit', itemIndex) as number;
							qs.limit = limit;
							// Allow more than the 200 items default limit
							if (limit >= 200) {
								responseData = await digitalOceanApiRequestAllItems.call(this, 'droplets', 'GET', 'droplets', {}, qs);
							} else {
								responseData = await digitalOceanApiRequest.call(this, 'GET', 'droplets', {}, qs);
								responseData = responseData.droplets;
							}
						}
					}

					if (operation === 'delete') {
						const dropletId = this.getNodeParameter('dropletId', itemIndex) as number;

						responseData = await digitalOceanApiRequest.call(this, 'DELETE', `droplets/${dropletId}`);
						responseData = { success: true };
					}
					if (operation === 'create') {
						const name = this.getNodeParameter('name', itemIndex) as string;
						const size = this.getNodeParameter('size', itemIndex) as string;
						const useApplicationImage = this.getNodeParameter('useApplicationImage', itemIndex) as boolean;
						const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

						let image = '';
						if (useApplicationImage) {
							image = this.getNodeParameter('applicationImage', itemIndex) as string;
						} else {
							image = this.getNodeParameter('image', itemIndex) as string;
						}

						const body: IDataObject = {
							name,
							size,
							image,
						};

						if (additionalFields.region) {
							body.region = additionalFields.region as string;
						}

						if (additionalFields.sshKeys) {
							body.ssh_keys =additionalFields.sshKeys as string[];
						}

						if (additionalFields.backups) {
							body.backups = additionalFields.backups as boolean;
						}

						if (additionalFields.ipv6) {
							body.ipv6 = additionalFields.ipv6 as boolean;
						}

						if (additionalFields.monitoring) {
							body.monitoring = additionalFields.monitoring as boolean;
						}

						if (additionalFields.tags) {
							body.tags = additionalFields.tags as string[];
						}

						responseData = await digitalOceanApiRequest.call(this, 'POST', 'droplets', body);
						responseData = responseData.droplet;
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject),
					{ itemData: { item: itemIndex } },
				);
				returnData.push(...executionData);

			} catch (error) {
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					if (error.context) {
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return this.prepareOutputData(returnData);
	}
}
