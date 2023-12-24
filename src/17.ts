type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";

export type WhoWins<L extends RockPaperScissors, R extends RockPaperScissors> = 
	// winning cases
	[L, R] extends ['👊🏻', '🖐🏾'] ? 'win' :
	[L, R] extends ['🖐🏾', '✌🏽'] ? 'win' :
	[L, R] extends ['✌🏽', '👊🏻'] ? 'win' :
	// losing cases
	[L, R] extends ['🖐🏾', '👊🏻'] ? 'lose' :
	[L, R] extends ['✌🏽', '🖐🏾'] ? 'lose' :
	[L, R] extends ['👊🏻', '✌🏽'] ? 'lose' :
	// otherwise draw
	'draw'
	;
