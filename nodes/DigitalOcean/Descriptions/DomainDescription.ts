import type { INodeProperties } from 'n8n-workflow';

export const domainDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['domain'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a domain',
				action: 'Create a domain',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get domain information',
				action: 'Get domain information',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get information about many domains',
				action: 'Get information about many domains',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a domain',
				action: 'Delete a domain',
			},
		],
		default: 'get',
	},
];

export const domainFields: INodeProperties[] = [
	// ----------------------------------
	//         domain: Shared
	// ----------------------------------
	{
		displayName: 'Domain Name',
		name: 'domainName',
		description: 'Name of the domain to operate on',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domain'],
				operation: ['get', 'delete', 'create'],
			},
		},
		default: '',
	},
	// ----------------------------------
	//         domain: getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['domain'],
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
				resource: ['domain'],
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
	// ----------------------------------
	//         domain: create
	// ----------------------------------
	{
		displayName: 'IP Address',
		name: 'ipAddress',
		description: 'IP address of the domain to create',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domain'],
				operation: ['create'],
			},
		},
		default: '',
	},
];
