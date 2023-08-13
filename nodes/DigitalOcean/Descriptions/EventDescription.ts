import type { INodeProperties } from 'n8n-workflow';

export const eventDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get event information',
				action: 'Get event information',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get information about many events',
				action: 'Get information about many events',
			},
		],
		default: 'get',
	},
];

export const eventFields: INodeProperties[] = [
	// ----------------------------------
	//         event: get
	// ----------------------------------
	{
		displayName: 'Event ID',
		name: 'eventId',
		description: 'ID of the event to get',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['get'],
			},
		},
		default: 0,
	},
	// ----------------------------------
	//         event: getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['event'],
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
				resource: ['event'],
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
