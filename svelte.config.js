import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		css: 'injected'
	},
	kit: {
		adapter: adapter({
			pages: 'public',
			assets: 'public',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			$lib: 'src/lib'
		},
		prerender: {
			handleMissingId: 'warn'
		}
	}
};

export default config;
