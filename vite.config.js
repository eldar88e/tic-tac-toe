import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
	server: {
		port: 8081,
		host: '0.0.0.0',
		open: true
	},
	build: {
		chunkSizeWarningLimit: 800,
		sourcemap: false,
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify('production')
	},
	plugins: [
		viteSingleFile(),
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
