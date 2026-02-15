# Fable Service Provider Base

> The foundation class for every Retold service

A lightweight base class that provides registration, dependency injection, and lifecycle management. Every service in the Fable ecosystem -- from logging to data access to views -- extends this class.

- **Dependency Injection** -- Access logging, configuration, and other services through `this.fable`
- **Service Registry** -- Register by type, instantiate with unique hashes, discover via `this.services`
- **Flexible Initialization** -- Construct with Fable, before Fable, or without Fable at all
- **Multiple Instances** -- Run several instances of the same service type with different configurations

[Get Started](README.md)
[API Reference](api.md)
[GitHub](https://github.com/stevenvelozo/fable-serviceproviderbase)
