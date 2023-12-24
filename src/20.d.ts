// prettier-ignore
type Letters = {
  A: [
    '█▀█ ',
    '█▀█ ',
    '▀ ▀ ',
  ],
  B: [
    '█▀▄ ',
    '█▀▄ ',
    '▀▀  '
  ],
  C: [
    '█▀▀ ',
    '█ ░░',
    '▀▀▀ '
  ],
  E: [
    '█▀▀ ',
    '█▀▀ ',
    '▀▀▀ '
  ],
  H: [
    '█ █ ',
    '█▀█ ',
    '▀ ▀ '
  ],
  I: [
    '█ ',
    '█ ',
    '▀ '
  ],
  M: [
    '█▄░▄█ ',
    '█ ▀ █ ',
    '▀ ░░▀ '
  ],
  N: [
    '█▄░█ ',
    '█ ▀█ ',
    '▀ ░▀ '
  ],
  P: [
    '█▀█ ',
    '█▀▀ ',
    '▀ ░░'
  ],
  R: [
    '█▀█ ',
    '██▀ ',
    '▀ ▀ '
  ],
  S: [
    '█▀▀ ',
    '▀▀█ ',
    '▀▀▀ '
  ],
  T: [
    '▀█▀ ',
    '░█ ░',
    '░▀ ░'
  ],
  Y: [
    '█ █ ',
    '▀█▀ ',
    '░▀ ░'
  ],
  W: [
    '█ ░░█ ',
    '█▄▀▄█ ',
    '▀ ░ ▀ '
  ],
  ' ': [
    '░',
    '░',
    '░'
  ],
  ':': [
    '#',
    '░',
    '#'
  ],
  '*': [
    '░',
    '#',
    '░'
  ],
};

// include lowercase letters
type AllLetters = Letters & {
  [K in keyof Letters as K extends string ? Lowercase<K> : never]: Letters[K];
};

// prettier-ignore
type Append<T extends [string, string, string], N extends [string, string, string]> =
  [`${T[0]}${N[0]}`, `${T[1]}${N[1]}`, `${T[2]}${N[2]}`]

// prettier-ignore
type ToAsciiArt<
	S extends string,
	Acc extends string[] = [],
	Cur extends [string, string, string] = ["", "", ""],
> = 
  S extends `\n${infer Rest}`
  ? ToAsciiArt<Rest, [...Acc, ...Cur], ["", "", ""]>
  : S extends `${infer First extends keyof AllLetters}${infer Rest}` 
    ? ToAsciiArt<Rest, Acc, Append<Cur, AllLetters[First]>>
    : [...Acc, ...Cur];
