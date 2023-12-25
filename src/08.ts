export type RemoveNaughtyChildren<T> = {[P in Exclude<keyof T, `naughty_${string}`>]: T[P]}
