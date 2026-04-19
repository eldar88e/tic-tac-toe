import { gsap } from 'gsap';
import { BlurFilter, Container } from 'pixi.js';

import { allTextureKeys } from '../common/assets.js';
import {gameValues, winLines, labels} from '../common/enums.js';
import { animateContainer, createSprite, scaleTarget, getUIElement } from '../helpers/index.js';
import { clearVictoryConfetti, showVictoryConfetti } from '../ui/victory.js';
import { eventBus } from '../utils/EventBus.js';
import { soundManager } from '../utils/SoundManager.js';
import { gameState } from './GameState.js';

export class GameManager {
	constructor(app) {
		this.app = app;
		this.blur = new BlurFilter({ strength: 4 });
		this.isStarted = false;

		const gameContainer = getUIElement(this.app.stage, labels.game);
		const players = getUIElement(gameContainer, labels.playersContainer);
		const gameOver = getUIElement(gameContainer, labels.gameOver);
		const soundButton = getUIElement(gameContainer, labels.sound);

		this.btnStart = getUIElement(gameContainer, labels.buttonStart);
		this.board = getUIElement(gameContainer, labels.board);
		this.playerOne = getUIElement(players, labels.playerOne);
		this.playerTwo = getUIElement(players, labels.playerTwo);
		this.gameOver = gameOver;
		this.draw = getUIElement(gameOver, labels.draw);
		this.drawText = getUIElement(gameOver, labels.drawText);
		this.trophy = getUIElement(gameOver, labels.trophy);
		this.playerOneName = getUIElement(gameOver, labels.playerOneName);
		this.playerTwoName = getUIElement(gameOver, labels.playerTwoName);
		this.playAgainButton = getUIElement(gameOver, labels.playAgainButton);
		this.soundButton = soundButton;
		this.slash = getUIElement(soundButton, labels.muteSlash);

		eventBus.on('cellClick', this.handleCellClick);
		eventBus.on('startGame', this.startGame);
		eventBus.on('restartGame', this.restartGame);
		eventBus.on('toggleSound', this.toggleSound);

		this.soundButton.on('pointerdown', () => eventBus.emit('toggleSound'));
		this.playAgainButton.on('pointerdown', () => eventBus.emit('restartGame', this.board));
		this.btnStart.on('pointerdown', this.startGame);
	}

	checkWinner() {
		for (const [a, b, c] of winLines) {
			const val = gameState.getCellValue(a);
			if (
				val &&
				val === gameState.getCellValue(b) &&
				val === gameState.getCellValue(c)
			) return { winner: val, line: [a, b, c] };
		}

		const isDraw = gameState.board.every(cell => cell.value !== '');
		return isDraw ? { winner: null, line: [] } : null;
	}

	handleCellClick = ({ cell, cellContainer, cellSize }) => {
		if (gameState.isGameOver || cell.value !== '') return;

		soundManager.play('click');

		gameState.setCellValue(cellContainer.label, gameState.currentPlayer);

		let cellValue = null;
		if (gameState.currentPlayer === gameValues.cross) {
			cellValue = createSprite(allTextureKeys.cross);
			scaleTarget(this.playerTwo);
			gsap.killTweensOf(this.playerOne.scale);
		} else {
			cellValue = createSprite(allTextureKeys.zero);
			scaleTarget(this.playerOne);
			gsap.killTweensOf(this.playerTwo.scale);
		}

		if (cellValue) {
			cellValue.anchor.set(0.5, 0.5);
			cellValue.position.set(cellSize / 2, cellSize / 2);

			gsap.fromTo(
				cellValue.scale,
				{y: 0, x: 0},
				{y: 0.2, x: 0.2}
			);
			cellContainer.addChild(cellValue);
		}

		const result = this.checkWinner();

		if (result) {
			gameState.setGameOver(result.winner);

			this.board.filters = [this.blur];

			this.stopScalePlayerLogo();
			this.stopAllAnimations();
			this.resetRotationLogo();

			if (result.winner === null) {
				this.draw.visible = true;
				this.gameOver.visible = true;
				animateContainer(this.gameOver);
				animateContainer(this.drawText);
			} else {
				this.trophy.visible = true;
				this.gameOver.visible = true;
				animateContainer(this.gameOver);

				gameState.winner === gameValues.cross
					? animateContainer(this.playerOneName)
					: animateContainer(this.playerTwoName);
			}

			showVictoryConfetti(this.app);
			soundManager.play('win');
			return;
		}

		gameState.switchPlayer();
	};

	startGame = () => {
		if (this.isStarted) return;

		this.isStarted = true;
		this.board.visible = true;
		this.btnStart.visible = false;
		this.btnStart.eventMode = 'none';
		scaleTarget(this.playerOne);
		soundManager.play('bg');
	};

	restartGame = board => {
		gameState.reset();
		clearVictoryConfetti();

		// Очищаем доску
		board.children
			.filter(cell => cell instanceof Container && cell.children[1])
			.forEach(cell => cell.children[1].destroy());

		// Сбрасываем UI элементы
		this.board.filters = null;
		this.gameOver.visible = false;
		this.draw.visible = false;
		this.trophy.visible = false;

		this.stopScalePlayerLogo();
		this.stopAllAnimations();
		this.resetRotationLogo();

		scaleTarget(this.playerOne);
	};

	toggleSound = () => {
		const isMuted = soundManager.toggleMute();

		this.slash.visible = true;

		gsap.to(this.slash, {
			alpha: isMuted ? 1 : 0,
			duration: 0.25,
			ease: 'power2.out',
			onComplete: () => {
				if (!isMuted) this.slash.visible = false;
			},
		});
	};

	stopAllAnimations() {
		[
			this.playerOne.scale,
			this.playerTwo.scale,
			this.gameOver.scale,
			this.gameOver,
			this.drawText.scale,
			this.drawText,
			this.playerOneName.scale,
			this.playerOneName,
			this.playerTwoName.scale,
			this.playerTwoName,
		].forEach(target => gsap.killTweensOf(target));
	}

	stopScalePlayerLogo() {
		this.drawText.scale.set(0);
		this.playerOneName.scale.set(0);
		this.playerTwoName.scale.set(0);
	}

	resetRotationLogo() {
		this.drawText.rotation = 0;
		this.playerOneName.rotation = 0;
		this.playerTwoName.rotation = 0;
		this.gameOver.rotation = 0;
	}
}
