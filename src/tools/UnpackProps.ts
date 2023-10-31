export type UnpackProps<T> = T extends React.ComponentType<infer P> ? P : never;
