import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
	server: {
		port: 8081,
		host: '0.0.0.0',
		open: true
	},
	build: {
		assetsDir: 'assets',
		chunkSizeWarningLimit: 800,
		rolldownOptions: {
			output: {
				codeSplitting: false,
			},
		},
		sourcemap: false,
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify('production')
	},
	plugins: [
		viteImagemin({
			webp: {
				quality: 75,
			},
			pngquant: false,
			mozjpeg: false,
			gifsicle: false,
			svgo: true,
		}),
	],
});
