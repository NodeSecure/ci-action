/// <reference types="@types/zen-observable" />

import * as events from "events";

declare class Config<T> extends events.EventEmitter {
    // Constructor
    constructor(configFilePath: string, options?: Config.Options);

    // Properties
    public configFile: string;
    public schemaFile: string;
    public createOnNoEntry: boolean;
    public writeOnSet: boolean;
    public autoReload: boolean;
    public autoReloadActivated: boolean;
    public reloadDelay: number;
    public configHasBeenRead: boolean;
    public subscriptionObservers: Array<[string, ZenObservable.SubscriptionObserver<any>]>;
    public payload: T;
    public defaultSchema: object;

    // Static properties
    static DEFAULTSchema: object;
    static STRINGIFY_SPACE: number;
    static SUPPORTED_EXT: Set<string>;
    static DEFAULT_EXTENSION: ".json" | ".toml";

    // Methods
    public read(defaultPayload?: T): Promise<this>;
    public setupAutoReload(): boolean;
    public get<H>(fieldPath: string, depth?: number): H;
    public set<H>(fieldPath: string, fieldValue: H): void;
    public observableOf<H>(fieldPath: string, depth?: number): ZenObservable.ObservableLike<H>;
    public writeOnDisk(): Promise<void>;
    public lazyWriteOnDisk(): void;
    public close(): Promise<void>;
}

declare namespace Config {
    interface Options {
        createOnNoEntry?: boolean;
        writeOnSet?: boolean;
        autoReload?: boolean;
        reloadDelay?: number;
        defaultSchema?: object;
    }
}

export as namespace Config;
export = Config;
