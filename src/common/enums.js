export const labels = {
	game: 'game',
	board: 'board',
	logo: 'logo',
	playersContainer: 'playersContainer',
	playerOne: 'playerOne',
	playerTwo: 'playerTwo',
	buttonStart: 'buttonStart',
	gameOver: 'gameOver',
	trophy: 'trophy',
	draw: 'draw',
	drawText: 'drawText',
	playerOneName: 'playerOneName',
	playerTwoName: 'playerTwoName',
	playAgainButton: 'playAgainButton',
	sound: 'sound',
	muteSlash: 'muteSlash',
};

export const gameValues = {
	cross: 'cross',
	zero: 'zero',
	draw: 'draw',
};

export const elementType = {
	SPRITE: 'sprite',
	CONTAINER: 'container',
	TEXT: 'text',
	GRAPHICS: 'graphics',
};

export const winLines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8], // rows
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8], // columns
	[0, 4, 8],
	[2, 4, 6], // diagonals
];
