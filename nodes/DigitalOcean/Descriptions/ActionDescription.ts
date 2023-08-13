import type { INodeProperties } from 'n8n-workflow';

export const actionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['action'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get action information',
				action: 'Get action information',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get information about many actions',
				action: 'Get information about many actions',
			},
		],
		default: 'get',
	},
];

export const actionFields: INodeProperties[] = [
	// ----------------------------------
	//         action: get
	// ----------------------------------
	{
		displayName: 'Action ID',
		name: 'actionId',
		description: 'ID of the action to get',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['action'],
				operation: ['get'],
			},
		},
		default: 0,
	},
	// ----------------------------------
	//         action: getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['action'],
				operation: ['getMany'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['action'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];
