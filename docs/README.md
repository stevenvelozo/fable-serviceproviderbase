# Fable Service Provider Base

The base class that every Retold service extends. It provides the contract for registration, dependency injection, and lifecycle management within a Fable instance.

## What It Does

When you extend `FableServiceProviderBase`, your class gains:

- `this.fable` -- Reference to the Fable instance (or `false` if standalone)
- `this.log` -- Shortcut to Fable's logging service
- `this.services` -- Access to all registered services
- `this.servicesMap` -- The full service registry map
- `this.options` -- Service-specific configuration
- `this.serviceType` -- The registered type name (set this in your constructor)
- `this.Hash` -- Unique identifier for this specific instance
- `this.UUID` -- Auto-generated unique ID

## Quick Start

```javascript
const libFableServiceProviderBase = require('fable-serviceproviderbase');

class MyService extends libFableServiceProviderBase
{
    constructor(pFable, pOptions, pServiceHash)
    {
        super(pFable, pOptions, pServiceHash);
        this.serviceType = 'MyService';
    }

    doSomething()
    {
        this.log.info('MyService is doing something');
        return this.fable.getUUID();
    }
}
```

Register with a Fable instance:

```javascript
const libFable = require('fable');
let _Fable = new libFable();

// Register the type and create an instance
_Fable.serviceManager.addServiceType('MyService', MyService);
_Fable.serviceManager.instantiateServiceProvider('MyService', { SomeOption: true }, 'MyService-1');

// Access via the services shortcut
_Fable.services.MyService.doSomething();
```

Or use the shorthand:

```javascript
_Fable.addAndInstantiateServiceType('MyService', MyService);
_Fable.services.MyService.doSomething();
```

## Three Initialization Patterns

The constructor is flexible and supports three modes. See [Initialization Patterns](initialization-patterns.md) for details.

**With Fable** -- The standard pattern for application services:

```javascript
let tmpService = new MyService(fableInstance, optionsObject, serviceHash);
```

**Pre-initialization** -- For core services needed before Fable is ready:

```javascript
let tmpCore = new MyCoreService(optionsObject, serviceHash);
// Later, after Fable is ready:
fableInstance.serviceManager.connectPreinitServiceProviderInstance(tmpCore);
```

**Standalone** -- For testing or non-Fable contexts:

```javascript
let tmpService = new MyService({ Setting: 'value' });
// tmpService.fable === false
```

## Multiple Instances

You can create multiple instances of the same service type, each with a different hash:

```javascript
_Fable.serviceManager.instantiateServiceProvider('DatabaseService', { Host: 'primary-db' }, 'Primary');
_Fable.serviceManager.instantiateServiceProvider('DatabaseService', { Host: 'replica-db' }, 'Replica');

// Access the default (first registered)
_Fable.services.DatabaseService.connect();

// Access a specific instance
_Fable.servicesMap.DatabaseService['Replica'].connect();

// Change the default
_Fable.serviceManager.setDefaultServiceInstantiation('DatabaseService', 'Replica');
```

## API Reference

See the [API Reference](api.md) for complete method and property documentation.

## Learn More

- [Initialization Patterns](initialization-patterns.md) -- The three ways to construct a service
- [API Reference](api.md) -- Properties, methods, and static members
- [Fable Service Provider Pattern](/fable/fable/) -- How services compose in the Fable ecosystem
