// the same solution works for arrays too!
// see: https://github.com/type-challenges/type-challenges/blob/main/questions/03192-medium-reverse/README.md
export type Reverse<T extends string> = T extends `${infer F}${infer S}` ? `${Reverse<S>}${F}` : T;
