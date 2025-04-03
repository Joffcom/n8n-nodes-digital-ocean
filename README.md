# n8n-nodes-digital-ocean

This is an n8n community node for connecting to Digital Oceans API to manage your droplets.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history)  <!-- delete if not using this section -->  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations
- Account
	- Get
- Domain
	- Create
	- Get
	- Get Many
	- Delete
- Droplet
	- Get
	- Get Many
	- Create
	- Delete
- Event 
	- Get
	- Get Many

## Credentials

This node supports both OAuth2 and Access Key.

[OAuth 2](https://docs.digitalocean.com/reference/api/oauth/)
[Access Key](https://docs.digitalocean.com/reference/api/create-personal-access-token/)

## Compatibility

This node will work with any version of n8n after `1.62.1`

## Usage

### Authentication
1. Create new credentials in n8n and select "Digital Ocean API"
2. Choose either OAuth2 or Access Key authentication:
   - For OAuth2: Click the "Connect" button and authorize n8n
   - For Access Key: Generate a [personal access token](https://cloud.digitalocean.com/account/api/tokens) and paste it in

### Working with Droplets
- To get information about a specific droplet:
  1. Add the Digital Ocean node
  2. Select "Droplet" as Resource
  3. Choose "Get" as Operation
  4. Enter the Droplet ID

- To create a new droplet:
  1. Add the Digital Ocean node
  2. Select "Droplet" as Resource
  3. Choose "Create" as Operation
  4. Configure required fields:
     - Name
     - Region
     - Size
     - Image

### Managing Domains
- To create a new domain:
  1. Add the Digital Ocean node
  2. Select "Domain" as Resource
  3. Choose "Create" as Operation
  4. Enter the domain name
  5. Optionally configure IP address

### Monitoring Events
- To track operations on your account:
  1. Add the Digital Ocean node
  2. Select "Event" as Resource
  3. Choose "Get Many" as Operation
  4. Optionally filter by event type

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## Version history

**0.4.1** \
Fix descriptions

**0.4.0** \
Add support for AI tools
Update documentation

**0.3.0** \
Prevent node from loading n8n again

**0.2.0** \
Add support for Application images  
Add support for Actions as Events  
Add support for Domains  
Add support for Droplet actions  
Add option to get Droplet Snapshots and Backups  

**0.1.0** \
Initial Release

