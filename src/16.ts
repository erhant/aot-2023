// iterates a row to find santa, returns never if not exists
type CheckRow<T extends any[], Acc extends 0[] = []> = 
	T['length'] extends Acc['length']
	? never
	: T[Acc['length']] extends '🎅🏼'
		? Acc['length']
		: CheckRow<T, [...Acc, 0]>

export type FindSanta<T extends any[][], Acc extends 0[] = []> = 
	T['length'] extends Acc['length']
	? never
	: CheckRow<T[Acc['length']]> extends never
		? FindSanta<T, [...Acc, 0]>
		: [Acc['length'], CheckRow<T[Acc['length']]>]
