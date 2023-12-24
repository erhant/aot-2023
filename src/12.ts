export type FindSanta<T extends any[]> = T extends [...infer Rest, infer Last] 
  ? Last extends '🎅🏼'
    ? Rest['length']
    : FindSanta<Rest>
  : never ;
