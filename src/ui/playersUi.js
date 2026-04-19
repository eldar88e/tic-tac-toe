import { PixiElement } from '../utils/PixiElement.js';
import { allTextureKeys } from '../common/assets.js';
import { elementType, labels } from '../common/enums.js';

const PLAYER_UI_HALF_WIDTH = 56;
const PLAYER_UI_SIDE_PADDING = 24;

export default function createPlayers(app) {
	const playersContainer = new PixiElement({
		type: elementType.CONTAINER,
		label: labels.playersContainer,
	}, onResizeHandler, true);
	const playersContainerElement = playersContainer.getElement();

	const playerOne = new PixiElement({
		type: elementType.CONTAINER,
		label: labels.playerOne,
	});
	const playerOneElement = playerOne.getElement();

	const playerOneIcon = new PixiElement({
		type: elementType.SPRITE,
		texture: allTextureKeys.cross,
		scale: [0.11, 0.11],
		anchor: [0.5, 0.5],
		position: [0, 18],
	});

	const playerOneText = new PixiElement({
		type: elementType.TEXT,
		text: 'PLAYER 1',
		style: {
			fontSize: 22,
			fill: 0x1f2937,
			fontFamily: 'Arial',
			fontWeight: '700',
		},
		anchor: [0.5, 0],
		position: [0, 44],
	});

	const playerTwo = new PixiElement({
		type: elementType.CONTAINER,
		label: labels.playerTwo,
	});
	const playerTwoElement = playerTwo.getElement();

	const playerTwoIcon = new PixiElement({
		type: elementType.SPRITE,
		texture: allTextureKeys.zero,
		scale: [0.11, 0.11],
		anchor: [0.5, 0.5],
		position: [0, 18],
	});

	const playerTwoText = new PixiElement({
		type: elementType.TEXT,
		text: 'PLAYER 2',
		style: {
			fontSize: 22,
			fill: 0x1f2937,
			fontFamily: 'Arial',
			fontWeight: '700',
		},
		anchor: [0.5, 0],
		position: [0, 44],
	});

	playerOne.addChildren([playerOneIcon.getElement(), playerOneText.getElement()]);
	playerTwo.addChildren([playerTwoIcon.getElement(), playerTwoText.getElement()]);

	playerOneElement.position.set(PLAYER_UI_SIDE_PADDING + PLAYER_UI_HALF_WIDTH, 0);
	playerTwoElement.position.set(
		app.screen.width - PLAYER_UI_SIDE_PADDING - PLAYER_UI_HALF_WIDTH,
		0
	);

	playersContainer.addChildren([playerOneElement, playerTwoElement]);
	playersContainerElement.position.set(0, playersContainerElement.height / 2 + 25);

	function onResizeHandler() {
		playerOneElement.position.set(PLAYER_UI_SIDE_PADDING + PLAYER_UI_HALF_WIDTH, 0);
		playerTwoElement.position.set(
			app.screen.width - PLAYER_UI_SIDE_PADDING - PLAYER_UI_HALF_WIDTH,
			0
		);
	}

	return playersContainerElement;
}
