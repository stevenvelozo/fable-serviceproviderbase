/**
* Fable Service Base
* @license MIT
* @author <steven@velozo.com>
*/

class FableServiceProviderBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		this.fable = pFable;

		this.isFableService = true;

		this.options = (typeof(pOptions) === 'object') ? pOptions : {};

        this.serviceType = 'Unknown';

        this.UUID = pFable.getUUID();

        this.Hash = (typeof(pServiceHash) === 'string') ? pServiceHash : `${this.UUID}`;
	}
}

module.exports = FableServiceProviderBase;

module.exports.CoreServiceProviderBase = require('./Fable-ServiceProviderBase-Preinit.js');