import type { INodeProperties } from 'n8n-workflow';

export const dropletDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['droplet'],
			},
		},
		options: [
			{
				name: 'Action',
				value: 'action',
				description: 'Perform an action on a droplet',
				action: 'Perform an action on a droplet',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new droplet',
				action: 'Create a new droplet',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a droplet',
				action: 'Delete a droplet',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get information about a droplet',
				action: 'Get information about a droplet',
			},
			{
				name: 'Get Backups',
				value: 'getBackups',
				description: 'Get all backups for a droplet',
				action: 'Get all backups for a droplet',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get information about many droplets',
				action: 'Get information about all droplets',
			},
			{
				name: 'Get Snapshots',
				value: 'getSnapshots',
				description: 'Get all snapshots for a droplet',
				action: 'Get all snapshots for a droplet',
			},
		],
		default: 'getMany',
	},
];

export const dropletFields: INodeProperties[] = [
	// ----------------------------------
	//         droplet: shared
	// ----------------------------------
	{
		displayName: 'Droplet Name or ID',
		name: 'dropletId',
		description: 'Name of the droplet operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDroplets',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['action', 'get', 'getBackups', 'delete', 'getSnapshots'],
			},
		},
		default: '',
	},
	// ----------------------------------
	//         droplet: getMany
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['getMany', 'getBackups', 'getSnapshots'],
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
				resource: ['droplet'],
				operation: ['getMany', 'getBackups', 'getSnapshots'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['getMany'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				description: 'Only return droplets with a given name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Tag Name',
				name: 'tagName',
				description: 'Only return droplets with a given tag',
				type: 'string',
				default: '',
			},
		],
	},
	// ----------------------------------
	//         droplet: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		description: 'Name of the droplet to create',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['create'],
			},
		},
		default: '',
	},
	{
		displayName: 'Use Application Image',
		name: 'useApplicationImage',
		description: 'Whether to use an application image or a distribution image',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Application Image Name or ID',
		name: 'applicationImage',
		description: 'Application image to use for the droplet. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getAppImages',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['create'],
				useApplicationImage: [true],
			},
		},
		default: '',
	},
	{
		displayName: 'Image Name or ID',
		name: 'image',
		description: 'Image to use for the droplet. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDistributionImages',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['create'],
				useApplicationImage: [false],
			},
		},
		default: '',
	},
	{
		displayName: 'Size Name or ID',
		name: 'size',
		description: 'Size of the droplet. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getSizes',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['create'],
			},
		},
		default: '',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Backups',
				name: 'backups',
				description: 'Whether to enable backups for the droplet',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Enable IPv6',
				name: 'enableIpv6',
				description: 'Whether to enable IPv6 for the droplet',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Monitoring',
				name: 'monitoring',
				description: 'Whether to enable monitoring for the droplet',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Region Name or ID',
				name: 'region',
				description: 'Region to create the droplet in. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getRegions',
				},
				default: '',
			},
			{
				// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
				displayName: 'SSH Keys',
				name: 'sshKeys',
				description: 'SSH keys to add to the droplet. Multiple keys can be separated by comma. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getSSHKeys',
				},
				default: [],
			},
			{
				// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
				displayName: 'Tags',
				name: 'tags',
				// eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-multi-options
				description: 'Tags to add to the droplet. Multiple tags can be separated by comma.',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getTags',
				},
				default: [],
			},
		],
	},
	// ----------------------------------
	//         droplet: action
	// ----------------------------------
	{
		displayName: 'Action to Perform',
		name: 'action',
		type: 'options',
		options: [
			{
				name: 'Disable Backups',
				value: 'disable_backups',
				description: 'Disable backups for the droplet',
				action: 'Disable backups for a droplet',
			},
			{
				name: 'Enable Backups',
				value: 'enable_backups',
				description: 'Enable backups for the droplet',
				action: 'Enable backups for a droplet',
			},
			{
				name: 'Enable IPv6',
				value: 'enable_ipv6',
				description: 'Enable IPv6 for the droplet',
				action: 'Enable ipv6 for a droplet',
			},
			{
				name: 'Password Reset',
				value: 'password_reset',
				description: 'Reset the password for the droplet',
				action: 'Reset the password for a droplet',
			},
			{
				name: 'Power Cycle',
				value: 'power_cycle',
				description: 'Power cycle the droplet',
				action: 'Power cycle a droplet',
			},
			{
				name: 'Power Off',
				value: 'power_off',
				description: 'Power off the droplet',
				action: 'Power off a droplet',
			},
			{
				name: 'Power On',
				value: 'power_on',
				description: 'Power on the droplet',
				action: 'Power on a droplet',
			},
			{
				name: 'Reboot',
				value: 'reboot',
				description: 'Reboot the droplet',
				action: 'Reboot a droplet',
			},
			{
				name: 'Rename',
				value: 'rename',
				description: 'Rename the droplet',
				action: 'Rename a droplet',
			},
			{
				name: 'Shutdown',
				value: 'shutdown',
				description: 'Shutdown the droplet',
				action: 'Shutdown a droplet',
			},
			{
				name: 'Snapshot',
				value: 'snapshot',
				description: 'Create a snapshot of the droplet',
				action: 'Snapshot a droplet',
			},
		],
		default: 'power_cycle',
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['action'],
			},
		},
	},
	{
		displayName: 'Snapshot Name',
		name: 'snapshotName',
		description: 'Name of the snapshot to create',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['action'],
				action: ['snapshot'],
			},
		},
	},
	{
		displayName: 'Droplet Name',
		name: 'dropletName',
		description: 'New name of the droplet',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['droplet'],
				operation: ['action'],
				action: ['rename'],
			},
		},
	},
];
