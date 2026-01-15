export = FableServiceProviderBase;
declare class FableServiceProviderBase {
    static isFableService: boolean;
    /**
     * The constructor can be used in two ways:
     * 1) With a fable, options object and service hash (the options object and service hash are optional)a
     * 2) With an object or nothing as the first parameter, where it will be treated as the options object
     *
     * @param {import('fable')|Record<string, any>} [pFable] - (optional) The fable instance, or the options object if there is no fable
     * @param {Record<string, any>|string} [pOptions] - (optional) The options object, or the service hash if there is no fable
     * @param {string} [pServiceHash] - (optional) The service hash to identify this service instance
     */
    constructor(pFable?: any | Record<string, any>, pOptions?: Record<string, any> | string, pServiceHash?: string);
    /** @type {import('fable')} */
    fable: any;
    /** @type {string} */
    UUID: string;
    /** @type {Record<string, any>} */
    options: Record<string, any>;
    /** @type {Record<string, any>} */
    services: Record<string, any>;
    /** @type {Record<string, any>} */
    servicesMap: Record<string, any>;
    /** @type {Record<string, any>} */
    _PackageFableServiceProvider: Record<string, any>;
    serviceType: string;
    Hash: string;
    /**
     * @param {import('fable')} pFable
     */
    connectFable(pFable: any): true | Error;
    log: any;
}
declare namespace FableServiceProviderBase {
    export { FableServiceProviderBase as CoreServiceProviderBase };
}
//# sourceMappingURL=Fable-ServiceProviderBase.d.ts.map