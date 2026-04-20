import { Howl, Howler } from 'howler';

class SoundManager {
	constructor() {
		this.sounds = {
			click: new Howl({
				src: ['audio/click.mp3'],
				volume: 0.5,
			}),
			win: new Howl({
				src: ['audio/win.mp3'],
				volume: 0.7,
			}),
			bg: new Howl({
				src: ['audio/bg.mp3'],
				loop: true,
				volume: 0.2,
			}),
		};

		this.isMuted = false;
	}

	play(soundName) {
		const sound = this.sounds[soundName];
		if (!sound) return;
		if (soundName === 'bg' && sound.playing()) return;

		sound.play();
	}

	toggleMute() {
		this.isMuted = !this.isMuted;
		Howler.mute(this.isMuted);
		return this.isMuted;
	}
}

export const soundManager = new SoundManager();
