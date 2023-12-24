// no need to worry about union in particular, it should "just work"
export type BoxToys<T extends string, N extends number, Acc extends string[] = []> = 
	N extends Acc['length']
	? Acc
	: BoxToys<T, N, [...Acc, T]>;
