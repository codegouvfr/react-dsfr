export type CallbackFactory<FactoryArgs extends unknown[], Args extends unknown[], R> = (...factoryArgs: FactoryArgs) => (...args: Args) => R;
/**
 * https://docs.powerhooks.dev/api-reference/usecallbackfactory
 *
 *  const callbackFactory= useCallbackFactory(
 *      ([key]: [string], [params]: [{ foo: number; }]) => {
 *          ...
 *      },
 *      []
 *  );
 *
 * WARNING: Factory args should not be of variable length.
 *
 */
export declare function useCallbackFactory<FactoryArgs extends (string | number | boolean)[], Args extends unknown[], R = void>(callback: (...callbackArgs: [FactoryArgs, Args]) => R): CallbackFactory<FactoryArgs, Args, R>;
