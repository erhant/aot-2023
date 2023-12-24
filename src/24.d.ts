type Alley = "  ";
type Santa = "🎅";
type Tree = "🎄";
type MazeItem = Tree | Santa | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

// prettier-ignore
type Move<T extends MazeMatrix, D extends Directions, I extends FullIndexType = FindSanta2D<T>> = 
	I[D][0] extends never ? MakeCookies2D<T> : // row is out-of-bounds, santa exits!
	I[D][1] extends never ? MakeCookies2D<T> : // col is out-of-bounds, santa exits!
	T[I[D][0]][I[D][1]] extends Tree ? T : // there is a tree in the way
	Replace2D<Replace2D<T, I[D][0], I[D][1], Santa>, I['cur'][0], I['cur'][1], Alley>

type IndexType = {
  l: number | never;
  r: number | never;
  c: number;
  d: number | never;
  u: number | never;
  max: number;
};

type FullIndexType = {
  left: [number | never, number | never];
  right: [number | never, number | never];
  cur: [number, number];
  up: [number | never, number | never];
  down: [number | never, number | never];
};

type MakeCookies2D<
  T extends any[][],
  Acc extends DELICIOUS_COOKIES[][] = []
> = T["length"] extends Acc["length"]
  ? Acc
  : MakeCookies2D<T, [MakeCookies1D<T[Acc["length"]]>, ...Acc]>;

type MakeCookies1D<
  T extends any[],
  Acc extends DELICIOUS_COOKIES[] = []
> = T["length"] extends Acc["length"]
  ? Acc
  : MakeCookies1D<T, [DELICIOUS_COOKIES, ...Acc]>;

// Find the index of the first empty cell from bottom at P'th column.
// Returns `never` if there is none.
// prettier-ignore
type FindSanta2D<T extends any[][], Acc extends 0[] = [], Idx extends Omit<IndexType, 'l' | 'r'> = {u: never, c: 0, d: 1, max: T['length']}> =
	// start search from last row
	T extends [infer Row extends any[], ...infer Rest extends any[][]]
		? FindSanta1D<Row> extends never
			? FindSanta2D<Rest, [0, ...Acc], {
				u: Idx['c'],
				c: [...Acc, 0]['length'], 
				d: [...Acc, 0, 0]['length']
				max: Idx['max']
			}>
			: ToIndex<Idx, FindSanta1D<Row>>
		: never;

// Find the index of the first empty cell from bottom at P'th column.
// Returns `never` if there is none.
// prettier-ignore
type FindSanta1D<T extends any[], Acc extends 0[] = [], Idx extends Omit<IndexType, 'u' | 'd'> = {l: never, c: 0, r: 1, max: T['length']}> =
	T extends [infer First, ...infer Rest]
		? First extends Santa
			? Idx
			: FindSanta1D<Rest, [0, ...Acc], {
				l: Idx['c'], 
				c: [...Acc, 0]['length'], 
				r: [...Acc, 0, 0]['length']
				max: Idx['max']
			}>
		: never;

type ToIndex<
  RowIdx extends Omit<IndexType, "l" | "r">,
  ColIdx extends Omit<IndexType, "u" | "d">
> = {
  // row left & right
  left: [RowIdx["c"], ColIdx["l"]];
  right: [RowIdx["c"], ColIdx["r"] extends ColIdx["max"] ? never : ColIdx["r"]];
  // current
  cur: [RowIdx["c"], ColIdx["c"]];
  // column up & down
  up: [RowIdx["u"], ColIdx["c"]];
  down: [RowIdx["d"] extends RowIdx["max"] ? never : RowIdx["d"], ColIdx["c"]];
};

// prettier-ignore
type Replace2D<T extends any[][], IR extends number, IC extends number, V extends any, Acc extends any[][] = []> = 
  T extends [infer First extends any[], ...infer Rest extends any[][]]
	? Acc["length"] extends IR
		? [...Acc, Replace1D<First, IC, V>, ...Rest]
		: Replace2D<Rest, IR, IC, V, [...Acc, First]>
	: T;

// prettier-ignore
type Replace1D<T extends any[], IC extends number, V extends any, Acc extends any[] = []> = 
  T extends [infer First, ...infer Rest]
	? Acc["length"] extends IC
		? [...Acc, V, ...Rest]
		: Replace1D<Rest, IC, V, [...Acc, First]>
	: T;

type x = Move<
  [["🎄", "  ", "🎄"], ["🎄", "  ", "  "], ["🎅", "  ", "🎄"]],
  "up"
>;
