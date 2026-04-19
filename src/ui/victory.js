import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Container, Graphics } from 'pixi.js';

gsap.registerPlugin(MotionPathPlugin);

const COLORS = [0xffd700, 0xff69b4, 0x00bfff, 0x98fb98, 0xffa500];
const DEFAULT_CONFETTI_COUNT = 150;

function drawConfettiPiece(graphics) {
	const shape = Math.random() > 0.5 ? 'circle' : 'square';
	const color = COLORS[Math.floor(Math.random() * COLORS.length)];

	graphics.clear();

	if (shape === 'circle') {
		graphics.circle(0, 0, 4).fill(color);
	} else {
		graphics.rect(-4, -4, 8, 8).fill(color);
	}

	return graphics;
}

function createConfettiPiece() {
	const graphics = new Graphics();
	drawConfettiPiece(graphics);

	return graphics;
}

class VictoryConfettiController {
	constructor() {
		this.container = new Container();
		this.container.label = 'victoryConfetti';
		this.activePieces = [];
		this.pool = [];
		this.animations = [];
	}

	show(app, count = DEFAULT_CONFETTI_COUNT) {
		this.clear();

		if (!this.container.parent) {
			app.stage.addChild(this.container);
		}

		for (let i = 0; i < count; i++) {
			const confetti = this.getPiece();
			this.resetPiece(confetti);
			confetti.x = app.renderer.width / 2;
			confetti.y = 0;
			confetti.rotation = Math.random() * Math.PI * 2;
			confetti.alpha = 0;
			confetti.visible = true;

			this.container.addChild(confetti);
			this.activePieces.push(confetti);

			const startX = confetti.x;
			const startY = confetti.y;
			const endX = startX + (Math.random() - 0.5) * app.renderer.width;
			const endY = startY + Math.random() * app.renderer.height;
			const controlX = startX + (endX - startX) * 0.5;
			const controlY = startY - 100;

			const delayedAnimation = gsap.delayedCall(i * 0.02, () => {
				this.animations.push(
					gsap.to(confetti, {
						alpha: 1,
						duration: 0.2,
						ease: 'power1.out',
					})
				);

				this.animations.push(
					gsap.to(confetti, {
						duration: 2 + Math.random() * 0.8,
						ease: 'power2.out',
						motionPath: {
							path: [
								{ x: startX, y: startY },
								{ x: controlX, y: controlY },
								{ x: endX, y: endY },
							],
							curviness: 2.5,
						},
						rotation: confetti.rotation + Math.random() * 4,
						onComplete: () => {
							this.animations.push(
								gsap.to(confetti, {
									alpha: 0,
									duration: 0.5,
								})
							);
						},
					})
				);
			});

			this.animations.push(delayedAnimation);
		}
	}

	clear() {
		this.animations.forEach(animation => animation.kill());
		this.animations = [];

		this.activePieces.forEach(piece => {
			gsap.killTweensOf(piece);
			piece.visible = false;
			piece.alpha = 0;
			piece.position.set(0, 0);
			piece.rotation = 0;
			this.pool.push(piece);
		});

		this.activePieces = [];
		this.container.removeChildren();
	}

	getPiece() {
		return this.pool.pop() || createConfettiPiece();
	}

	resetPiece(piece) {
		drawConfettiPiece(piece);
	}
}

const victoryConfettiController = new VictoryConfettiController();

export function showVictoryConfetti(app, count = DEFAULT_CONFETTI_COUNT) {
	victoryConfettiController.show(app, count);
}

export function clearVictoryConfetti() {
	victoryConfettiController.clear();
}
