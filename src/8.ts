type Naughty<T extends string = string> = `naughty_${T}`
export type RemoveNaughtyChildren<T> = {[P in Exclude<keyof T, Naughty>]: T[P]}
