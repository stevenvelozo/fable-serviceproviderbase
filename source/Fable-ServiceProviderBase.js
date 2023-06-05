/**
* Fable Service Base
* @author <steven@velozo.com>
*/

class FableServiceProviderBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		this.fable = pFable;

		this.options = (typeof(pOptions) === 'object') ? pOptions
						: ((typeof(pFable) === 'object') && !pFable.isFable) ? pFable
						: {};

		this.serviceType = 'Unknown';

		if (typeof(pFable.getUUID) == 'function')
		{
			this.UUID = pFable.getUUID();
		}
		else
		{
			this.UUID = `NoFABLESVC-${Math.floor((Math.random() * (99999 - 10000)) + 10000)}`
		}

		this.Hash = (typeof(pServiceHash) === 'string') ? pServiceHash : `${this.UUID}`;

		// Pull back a few things
		this.log = this.fable.log;
		this.servicesMap = this.fable.servicesMap;
		this.services = this.fable.services;
	}

	static isFableService = true;
}

module.exports = FableServiceProviderBase;

module.exports.CoreServiceProviderBase = require('./Fable-ServiceProviderBase-Preinit.js');