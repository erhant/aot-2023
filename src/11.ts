// given a ReadonlyArray (a ts built-in type) calls DeepReadonly on all its elements
type DeepReadonlyArray<
  T extends ReadonlyArray<unknown>,
  Acc extends ReadonlyArray<unknown> = []
> = T['length'] extends Acc['length'] 
    ? Acc 
    : DeepReadonlyArray<T, readonly [...Acc, DeepReadonly<T[Acc['length']]>]>;

type DeepReadonly<T> = 
  // check if T is an object
  T extends Record<any, unknown>
  // recurse into each object key
  ? {readonly [K in keyof T]: DeepReadonly<T[K]>}
  // check if T is an array
	: T extends Array<unknown>
    // recurse into each array element
	  ? DeepReadonlyArray<T>
    // otherwise, just return T
	  : T

export type SantaListProtector<T> = DeepReadonly<T>
