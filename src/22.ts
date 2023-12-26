/** because "dashing" implies speed */
type Dasher = "💨";
/** representing dancing or grace */
type Dancer = "💃";
/** a deer, prancing */
type Prancer = "🦌";
/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";
/** for the celestial body that shares its name */
type Comet = "☄️";
/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";
/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";
/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";
/** for his famous red nose */
type Rudolph = "🔴";
type Reindeer =
  | Dasher
  | Dancer
  | Prancer
  | Vixen
  | Comet
  | Cupid
  | Donner
  | Blitzen
  | Rudolph;

// uniqueness check
// prettier-ignore
type CheckAnyExtends<T, Arr extends any[]> = 
  Arr extends [infer First, ...infer Rest]
  ? T extends First
    ? true
    : CheckAnyExtends<T, Rest>
  : false;
type Unique<T extends any[], Result extends any[] = []> = 
  T extends [infer First,...infer Rest]
  ? CheckAnyExtends<First, Result> extends true
    ? Unique<Rest, Result>
    : Unique<Rest, [...Result, First]>
  : Result;
type IsUnique<T extends any[]> = 
  T["length"] extends Unique<T>["length"] ? true : false;


export type Validate<T extends Reindeer[][][]> = 
	// check rows 
	IsUnique<[...T[0][0], ...T[0][1], ...T[0][2]]> extends false ? false :
	IsUnique<[...T[1][0], ...T[1][1], ...T[1][2]]> extends false ? false :
	IsUnique<[...T[2][0], ...T[2][1], ...T[2][2]]> extends false ? false :
	IsUnique<[...T[3][0], ...T[3][1], ...T[3][2]]> extends false ? false :
	IsUnique<[...T[4][0], ...T[4][1], ...T[4][2]]> extends false ? false :
	IsUnique<[...T[5][0], ...T[5][1], ...T[5][2]]> extends false ? false :
	IsUnique<[...T[6][0], ...T[6][1], ...T[6][2]]> extends false ? false :
	IsUnique<[...T[7][0], ...T[7][1], ...T[7][2]]> extends false ? false :
	IsUnique<[...T[8][0], ...T[8][1], ...T[8][2]]> extends false ? false :
	// check cols
	IsUnique<[T[0][0][0], T[1][0][0], T[2][0][0], T[3][0][0], T[4][0][0], T[5][0][0], T[6][0][0], T[7][0][0], T[8][0][0]]> extends false ? false :
	IsUnique<[T[0][0][1], T[1][0][1], T[2][0][1], T[3][0][1], T[4][0][1], T[5][0][1], T[6][0][1], T[7][0][1], T[8][0][1]]> extends false ? false :
	IsUnique<[T[0][0][2], T[1][0][2], T[2][0][2], T[3][0][2], T[4][0][2], T[5][0][2], T[6][0][2], T[7][0][2], T[8][0][2]]> extends false ? false :
	IsUnique<[T[0][1][0], T[1][1][0], T[2][1][0], T[3][1][0], T[4][1][0], T[5][1][0], T[6][1][0], T[7][1][0], T[8][1][0]]> extends false ? false :
	IsUnique<[T[0][1][1], T[1][1][1], T[2][1][1], T[3][1][1], T[4][1][1], T[5][1][1], T[6][1][1], T[7][1][1], T[8][1][1]]> extends false ? false :
	IsUnique<[T[0][1][2], T[1][1][2], T[2][1][2], T[3][1][2], T[4][1][2], T[5][1][2], T[6][1][2], T[7][1][2], T[8][1][2]]> extends false ? false :
	IsUnique<[T[0][2][0], T[1][2][0], T[2][2][0], T[3][2][0], T[4][2][0], T[5][2][0], T[6][2][0], T[7][2][0], T[8][2][0]]> extends false ? false :
	IsUnique<[T[0][2][1], T[1][2][1], T[2][2][1], T[3][2][1], T[4][2][1], T[5][2][1], T[6][2][1], T[7][2][1], T[8][2][1]]> extends false ? false :
	IsUnique<[T[0][2][2], T[1][2][2], T[2][2][2], T[3][2][2], T[4][2][2], T[5][2][2], T[6][2][2], T[7][2][2], T[8][2][2]]> extends false ? false :
	// check regions
	IsUnique<[...T[0][0], ...T[1][0], ...T[2][0]]> extends false ? false :
	IsUnique<[...T[0][1], ...T[1][1], ...T[2][1]]> extends false ? false :
	IsUnique<[...T[0][2], ...T[1][2], ...T[2][2]]> extends false ? false :
	IsUnique<[...T[3][0], ...T[4][0], ...T[5][0]]> extends false ? false :
	IsUnique<[...T[3][1], ...T[4][1], ...T[5][1]]> extends false ? false :
	IsUnique<[...T[3][2], ...T[4][2], ...T[5][2]]> extends false ? false :
	IsUnique<[...T[6][0], ...T[7][0], ...T[8][0]]> extends false ? false :
	IsUnique<[...T[6][1], ...T[7][1], ...T[8][1]]> extends false ? false :
	IsUnique<[...T[6][2], ...T[7][2], ...T[8][2]]> extends false ? false
	: true;
