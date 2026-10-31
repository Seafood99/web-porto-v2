export interface Tech {
	label: string;
	icon: string | null;
}

/**
 * Satu-satunya sumber kebenaran untuk teknologi yang muncul di portfolio.
 * `icon: null` = tidak punya logo (atau tidak tersedia di simple-icons) → dirender sebagai pill teks.
 * Nama file ikon mengikuti slug simple-icons, bukan key di sini.
 */
export const techRegistry = {
	sveltekit: { label: 'SvelteKit', icon: '/assets/tech/svelte.svg' },
	svelte: { label: 'Svelte', icon: '/assets/tech/svelte.svg' },
	nextjs: { label: 'Next.js', icon: '/assets/tech/nextdotjs.svg' },
	react: { label: 'React', icon: '/assets/tech/react.svg' },
	typescript: { label: 'TypeScript', icon: '/assets/tech/typescript.svg' },
	laravel: { label: 'Laravel', icon: '/assets/tech/laravel.svg' },
	tailwindcss: { label: 'Tailwind CSS', icon: '/assets/tech/tailwindcss.svg' },
	gsap: { label: 'GSAP', icon: '/assets/tech/gsap.svg' },
	threejs: { label: 'Three.js', icon: '/assets/tech/threedotjs.svg' },
	strapi: { label: 'Strapi', icon: '/assets/tech/strapi.svg' },
	drizzle: { label: 'Drizzle ORM', icon: '/assets/tech/drizzle.svg' },
	fastapi: { label: 'FastAPI', icon: '/assets/tech/fastapi.svg' },
	flask: { label: 'Flask', icon: '/assets/tech/flask.svg' },
	postgresql: { label: 'PostgreSQL', icon: '/assets/tech/postgresql.svg' },
	sqlite: { label: 'SQLite', icon: '/assets/tech/sqlite.svg' },
	python: { label: 'Python', icon: '/assets/tech/python.svg' },
	pandas: { label: 'Pandas', icon: '/assets/tech/pandas.svg' },
	scikitlearn: { label: 'Scikit-learn', icon: '/assets/tech/scikitlearn.svg' },
	gcp: { label: 'GCP', icon: '/assets/tech/googlecloud.svg' },
	cloudrun: { label: 'Cloud Run', icon: '/assets/tech/googlecloud.svg' },
	docker: { label: 'Docker', icon: '/assets/tech/docker.svg' },
	nginx: { label: 'Nginx', icon: '/assets/tech/nginx.svg' },
	cicd: { label: 'CI/CD', icon: '/assets/tech/githubactions.svg' },
	lighthouse: { label: 'Lighthouse 100', icon: '/assets/tech/lighthouse.svg' },
	vps: { label: 'VPS', icon: null },
	xendit: { label: 'Xendit', icon: null },
	restapi: { label: 'REST API', icon: null }
} satisfies Record<string, Tech>;

export type TechKey = keyof typeof techRegistry;
