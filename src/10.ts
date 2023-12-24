export type StreetSuffixTester<T extends string, S extends string> = 
  T extends `${string}${S}`
    ? true
    : false;
