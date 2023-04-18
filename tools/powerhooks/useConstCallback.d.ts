/** https://stackoverflow.com/questions/65890278/why-cant-usecallback-always-return-the-same-ref */
export declare function useConstCallback<T extends ((...args: any[]) => unknown) | undefined | null>(callback: NonNullable<T>): T;
