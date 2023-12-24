export type Count<T extends any[], V, Acc extends 0[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends V
    ? Count<Rest, V, [...Acc, 0]>
    : Count<Rest, V, Acc>
  : Acc["length"];
