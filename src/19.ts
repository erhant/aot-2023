type Items = { "🛹": "🚲"; "🚲": "🛴"; "🛴": "🏄"; "🏄": "🛹" };
export type Rebuild<
  T extends any[],
  Cur extends keyof Items = "🛹", // current item
  Acc extends (keyof Items)[] = [], // accumulator (for our result)
  Ctr extends 0[] = [] // counter
> = T extends [infer First, ...infer Rest]
  ? First extends Ctr["length"]
    ? Rebuild<Rest, Items[Cur], Acc, []>
    : Rebuild<[First, ...Rest], Cur, [...Acc, Cur], [0, ...Ctr]>
  : Acc;
