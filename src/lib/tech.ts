export interface Tech {
	label: string;
	icon: string | null;
	color?: string;
	darkColor?: string;
}

/**
 * Satu-satunya sumber kebenaran untuk teknologi yang muncul di portfolio.
 * `icon: null` = tidak punya logo (atau tidak tersedia di simple-icons) → dirender sebagai pill teks.
 * Nama file ikon mengikuti slug simple-icons, bukan key di sini.
 * `color` & `darkColor` adalah warna resmi brand teknologi tersebut.
 */
export const techRegistry: Record<TechKey, Tech> = {
	sveltekit: { label: 'SvelteKit', icon: '/assets/tech/svelte.svg', color: '#FF3E00' },
	svelte: { label: 'Svelte', icon: '/assets/tech/svelte.svg', color: '#FF3E00' },
	nextjs: { label: 'Next.js', icon: '/assets/tech/nextdotjs.svg', color: '#000000', darkColor: '#FFFFFF' },
	react: { label: 'React', icon: '/assets/tech/react.svg', color: '#087EA4', darkColor: '#61DAFB' },
	typescript: { label: 'TypeScript', icon: '/assets/tech/typescript.svg', color: '#3178C6' },
	laravel: { label: 'Laravel', icon: '/assets/tech/laravel.svg', color: '#FF2D20' },
	tailwindcss: { label: 'Tailwind CSS', icon: '/assets/tech/tailwindcss.svg', color: '#06B6D4' },
	gsap: { label: 'GSAP', icon: '/assets/tech/gsap.svg', color: '#0AE448' },
	threejs: { label: 'Three.js', icon: '/assets/tech/threedotjs.svg', color: '#000000', darkColor: '#FFFFFF' },
	strapi: { label: 'Strapi', icon: '/assets/tech/strapi.svg', color: '#4945FF' },
	drizzle: { label: 'Drizzle ORM', icon: '/assets/tech/drizzle.svg', color: '#7EA806', darkColor: '#C5F74F' },
	fastapi: { label: 'FastAPI', icon: '/assets/tech/fastapi.svg', color: '#009688' },
	flask: { label: 'Flask', icon: '/assets/tech/flask.svg', color: '#000000', darkColor: '#FFFFFF' },
	postgresql: { label: 'PostgreSQL', icon: '/assets/tech/postgresql.svg', color: '#4169E1' },
	sqlite: { label: 'SQLite', icon: '/assets/tech/sqlite.svg', color: '#003B57', darkColor: '#4BB8FA' },
	python: { label: 'Python', icon: '/assets/tech/python.svg', color: '#3776AB' },
	pandas: { label: 'Pandas', icon: '/assets/tech/pandas.svg', color: '#150458', darkColor: '#E70488' },
	scikitlearn: { label: 'Scikit-learn', icon: '/assets/tech/scikitlearn.svg', color: '#F7931E' },
	gcp: { label: 'GCP', icon: '/assets/tech/googlecloud.svg', color: '#4285F4' },
	cloudrun: { label: 'Cloud Run', icon: '/assets/tech/googlecloud.svg', color: '#4285F4' },
	docker: { label: 'Docker', icon: '/assets/tech/docker.svg', color: '#2496ED' },
	nginx: { label: 'Nginx', icon: '/assets/tech/nginx.svg', color: '#009639' },
	cicd: { label: 'CI/CD', icon: '/assets/tech/githubactions.svg', color: '#2088FF' },
	lighthouse: { label: 'Lighthouse 100', icon: '/assets/tech/lighthouse.svg', color: '#F44B21' },
	vps: { label: 'VPS', icon: null },
	xendit: { label: 'Xendit', icon: null },
	restapi: { label: 'REST API', icon: null }
};

export type TechKey =
	| 'sveltekit'
	| 'svelte'
	| 'nextjs'
	| 'react'
	| 'typescript'
	| 'laravel'
	| 'tailwindcss'
	| 'gsap'
	| 'threejs'
	| 'strapi'
	| 'drizzle'
	| 'fastapi'
	| 'flask'
	| 'postgresql'
	| 'sqlite'
	| 'python'
	| 'pandas'
	| 'scikitlearn'
	| 'gcp'
	| 'cloudrun'
	| 'docker'
	| 'nginx'
	| 'cicd'
	| 'lighthouse'
	| 'vps'
	| 'xendit'
	| 'restapi';
