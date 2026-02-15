# Fable Service Provider Base

The base class for all services in the Fable ecosystem. Provides a standard interface for dependency injection, options handling, unique identification, and lifecycle management — used to build database connectors, API servers, template engines, view controllers, and any other service that plugs into a Fable application.

[![Build Status](https://github.com/stevenvelozo/fable-serviceproviderbase/workflows/Fable-ServiceProviderBase/badge.svg)](https://github.com/stevenvelozo/fable-serviceproviderbase/actions)
[![npm version](https://badge.fury.io/js/fable-serviceproviderbase.svg)](https://badge.fury.io/js/fable-serviceproviderbase)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Features

- **Service Base Class** - Standard constructor accepting a Fable instance, options object, and service hash
- **Dependency Injection** - Automatic access to `this.fable`, `this.log`, `this.services`, and `this.servicesMap` when connected to a Fable instance
- **Unique Identification** - Every service instance receives a UUID from Fable (or a random fallback) and a configurable Hash for service map lookups
- **Pre-Initialization Support** - Core services can be constructed before Fable is initialized and connected later via `connectFable()`
- **Standalone Mode** - Services can be instantiated without a Fable instance at all, receiving options and a random UUID
- **TypeScript Definitions** - Ships with `.d.ts` type declarations for editor support

## Installation

```bash
npm install fable-serviceproviderbase
```

## Quick Start

```javascript
const libFable = require('fable');
const libFableServiceProviderBase = require('fable-serviceproviderbase');

class GreeterService extends libFableServiceProviderBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.serviceType = 'GreeterService';
	}

	greet(pName)
	{
		this.log.info(`Hello, ${pName}! I am service ${this.Hash}.`);
	}
}

let fable = new libFable();

fable.serviceManager.addServiceType('GreeterService', GreeterService);
fable.serviceManager.instantiateServiceProvider('GreeterService',
	{ greeting: 'Hello' }, 'PrimaryGreeter');

fable.services.GreeterService.greet('World');
```

## Usage

### Basic Services

Most services extend the base class directly and receive a fully initialized Fable instance:

```javascript
const libFableServiceProviderBase = require('fable-serviceproviderbase');

class SimpleService extends libFableServiceProviderBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.serviceType = 'SimpleService';
	}

	doSomething()
	{
		this.fable.log.info(`SimpleService ${this.UUID}::${this.Hash} is doing something.`);
	}
}
```

Register and use through the Fable service manager:

```javascript
let fable = new libFable();

fable.serviceManager.addServiceType('SimpleService', SimpleService);
fable.serviceManager.instantiateServiceProvider('SimpleService',
	{ SomeOption: true }, 'SimpleService-123');

// Access via the services map
fable.services.SimpleService.doSomething();

// Or look up a specific instance by hash
fable.servicesMap.SimpleService['SimpleService-123'].doSomething();
```

### Core Pre-Initialization Services

Some services need to exist before Fable is fully initialized (e.g., logging, settings, UUID generation). These use the `CoreServiceProviderBase` export and connect to Fable later:

```javascript
const libCoreServiceBase = require('fable-serviceproviderbase').CoreServiceProviderBase;

class EarlyService extends libCoreServiceBase
{
	constructor(pOptions, pServiceHash)
	{
		super(pOptions, pServiceHash);

		this.serviceType = 'EarlyService';
	}

	earlyWork()
	{
		console.log(`EarlyService ${this.UUID}::${this.Hash} is working.`);
	}
}

// Create before Fable exists
let earlyService = new EarlyService({ SomeOption: true }, 'EarlyService-1');
earlyService.earlyWork();

// Later, connect to Fable
let fable = new libFable();
fable.serviceManager.connectPreinitServiceProviderInstance(earlyService);

// Now it has full fable access
earlyService.fable.log.info('Connected to Fable!');
```

### Standalone Mode

Services can be instantiated without any Fable instance. They receive a random UUID and the first parameter is treated as the options object:

```javascript
let standalone = new SimpleService({ Setting: 'Something' });
// standalone.options.Setting === 'Something'
// standalone.UUID is a random string like 'CORE-SVC-12345'
// standalone.fable === false
```

## API

### Constructor

```javascript
new FableServiceProviderBase(pFable, pOptions, pServiceHash)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `pFable` | `Fable \| Object` | A Fable instance, or an options object if no Fable is available |
| `pOptions` | `Object \| String` | Options object, or service hash string if no Fable is available |
| `pServiceHash` | `String` | Identifier for this service instance in the services map |

### Methods

| Method | Description |
|--------|-------------|
| `connectFable(pFable)` | Attach a Fable instance after construction. Sets `this.fable`, `this.log`, `this.services`, and `this.servicesMap`. Returns `true` on success or an `Error` on failure. |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `fable` | `Fable \| false` | The connected Fable instance, or `false` if standalone |
| `UUID` | `String` | Unique identifier assigned by Fable or generated randomly |
| `Hash` | `String` | Service hash for lookups in the services map (defaults to UUID) |
| `serviceType` | `String` | Service type identifier (set by the deriving class) |
| `options` | `Object` | Options object passed at construction |
| `log` | `Object` | Reference to `fable.Logging` (available after Fable connection) |
| `services` | `Object` | Reference to `fable.services` (available after Fable connection) |
| `servicesMap` | `Object` | Reference to `fable.servicesMap` (available after Fable connection) |

### Static Properties

| Property | Type | Description |
|----------|------|-------------|
| `isFableService` | `Boolean` | Always `true` — used to identify Fable service classes |

### Exports

| Export | Description |
|--------|-------------|
| `require('fable-serviceproviderbase')` | The `FableServiceProviderBase` class |
| `require('fable-serviceproviderbase').CoreServiceProviderBase` | Same class (alias for pre-init service pattern) |

## Part of the Retold Framework

Fable Service Provider Base is the foundation class for all services in the ecosystem:

- [fable](https://github.com/stevenvelozo/fable) - Application services framework and service manager
- [fable-log](https://github.com/stevenvelozo/fable-log) - Logging framework (core service)
- [fable-uuid](https://github.com/stevenvelozo/fable-uuid) - UUID generation (core service)
- [meadow](https://github.com/stevenvelozo/meadow) - ORM built as Fable services
- [orator](https://github.com/stevenvelozo/orator) - API server built as Fable services
- [pict](https://github.com/stevenvelozo/pict) - MVC framework built as Fable services

## Testing

Run the test suite:

```bash
npm test
```

Run with coverage:

```bash
npm run coverage
```

## License

MIT - See [LICENSE](LICENSE) for details.

## Author

Steven Velozo - [steven@velozo.com](mailto:steven@velozo.com)
