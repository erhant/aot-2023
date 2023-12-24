export type DayCounter<L extends number, R extends number> = GotoLeft<L, R>

// first we keep an array of Ctr's until we reach the number L
// this should look like [0, 1, ..., L-1]
type GotoLeft<L extends number, R extends number, Ctr extends number[] = []> = 
	Ctr['length'] extends L 
	? GotoRight<R, Ctr>
	: GotoLeft<L, R, [...Ctr, Ctr['length']]>;

// then we start storing each Ctr value as we keep progressing to R,
// where the Ctr now looks like [0, 1, ..., L-1, L, L+1, ..., R-1]
// and our Acc looks like [L, L+1, ..., R-1]
// at the final step, we add the last R and use [number] to convert the Array to union
type GotoRight<R extends number, Ctr extends number[], Acc extends number[] = []> =
	Ctr['length'] extends R 
	? [...Acc, Ctr['length']][number]
	: GotoRight<R, [...Ctr, Ctr['length']], [...Acc, Ctr['length']]>;
