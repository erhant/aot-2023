// maps a PropertyKey to a good key if it is string
// otherwise, returns never
type GoodProperty<K extends PropertyKey> = 
	K extends string ? `good_${K}` : never;

export type AppendGood<T extends Record<string, any>> = 
	{[K in keyof T as GoodProperty<K>]: T[K]}
