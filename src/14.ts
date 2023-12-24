export type DecipherNaughtyList<T extends string> = 
T extends `${infer Head}/${infer Rest}` 
	? Head | DecipherNaughtyList<Rest> 
	: T;
