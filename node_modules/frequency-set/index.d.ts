declare class FrequencySet<T = any> {
    private data: Map<T, { count: number }>;

    constructor(iterable?: Iterable<T> | Iterable<[T, number]>);
    add(value: T, count?: number): this;
    clear(): void;
    delete(value: T): boolean;
    entries(): IterableIterator<[T, number]>;
    forEach(callback: (value: T, count: number, set: FrequencySet) => void, thisArg?: any): void;
    has(value: T): boolean;
    values(): IterableIterator<T>;
    [Symbol.iterator](): IterableIterator<[T, number]>;
    toJSON(): [T, number];
}

export = FrequencySet;
