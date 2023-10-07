/**
* Fable Service Base
* @author <steven@velozo.com>
*/

class FableServiceProviderBase
{
	// The constructor can be used in two ways:
	// 1) With a fable, options object and service hash (the options object and service hash are optional)
	// 2) With an object or nothing as the first parameter, where it will be treated as the options object
	constructor(pFable, pOptions, pServiceHash)
	{
		// Check if a fable was passed in
		if ((typeof(pFable) === 'object') && pFable.isFable)
		{
			this.fable = pFable;
		}
		else
		{
			this.fable = false;
		}

		if (this.fable)
		{
			this.connectFable(this.fable);
			this.options = (typeof(pOptions) === 'object') ? pOptions
							: {};
		}
		else
		{
			// With no fable, check to see if there was an object passed into either of the first two
			// Parameters, and if so, treat it as the options object
			this.options = ((typeof(pFable) === 'object') && !pFable.isFable) ? pFable
							: (typeof(pOptions) === 'object') ? pOptions
							: {};
		}

		// It's expected that the deriving class will set this
		this.serviceType = 'Unknown';

		if (this.fable)
		{
			this.UUID = pFable.getUUID();
		}
		else
		{
			// Without any dependencies, get a decently random UUID for the service
			this.UUID = `CORE-SVC-${Math.floor((Math.random() * (99999 - 10000)) + 10000)}`
		}

		// The service hash is used to identify the specific instantiation of the service in the services map
		this.Hash = (typeof(pServiceHash) === 'string') ? pServiceHash 
					: (!this.fable && (typeof(pOptions) === 'string')) ? pOptions
					: `${this.UUID}`;
	}

	connectFable(pFable)
	{
		if ((typeof(pFable) !== 'object') || (!pFable.isFable))
		{
			let tmpErrorMessage = `Fable Service Provider Base: Cannot connect to Fable, invalid Fable object passed in.  The pFable parameter was a [${typeof(pFable)}].}`;
			console.log(tmpErrorMessage);
			return new Error(tmpErrorMessage);
		}

		if (!this.fable)
		{
			this.fable = pFable;
		}

		this.log = this.fable.log;
		this.servicesMap = this.fable.servicesMap;
		this.services = this.fable.services;

		return true;
	}

	static isFableService = true;
}

module.exports = FableServiceProviderBase;

// This is left here in case we want to go back to having different code for "core" services
module.exports.CoreServiceProviderBase = FableServiceProviderBase;