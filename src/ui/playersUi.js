import { PixiElement } from '../utils/PixiElement.js';
import { allTextureKeys } from '../common/assets.js';
import { elementType, labels } from '../common/enums.js';

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
		position: [28, 18],
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
		position: [28, 44],
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
		position: [28, 18],
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
		position: [28, 44],
	});

	playerOne.addChildren([playerOneIcon.getElement(), playerOneText.getElement()]);
	playerTwo.addChildren([playerTwoIcon.getElement(), playerTwoText.getElement()]);

	playerOneElement.position.set(playerOneElement.width, 0);
	playerOneElement.pivot.set(playerOneElement.width / 2, playerOneElement.height / 2);

	playerTwoElement.position.set(app.screen.width - playerTwoElement.width, 0);
	playerTwoElement.pivot.set(playerTwoElement.width / 2, playerTwoElement.height / 2);

	playersContainer.addChildren([playerOneElement, playerTwoElement]);
	playersContainerElement.position.set(0, playersContainerElement.height / 2 + 25);

	function onResizeHandler() {
		playerOneElement.position.set(playerOneElement.width, 0);
		playerTwoElement.position.set(app.screen.width - playerTwoElement.width, 0);
	}

	return playersContainerElement;
}
