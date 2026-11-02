import type { TechKey } from './tech';

export interface Project {
	slug: string;
	title: string;
	desc: string;
	caseStudy: string;
	tags: TechKey[];
	link: string;
	linkLabel: 'Inquire' | 'Visit Site' | 'Private' | 'Source Code';
	secondaryLink?: string;
	secondaryLinkLabel?: string;
	images: string[];
	featured?: boolean;
}

export interface SocialLink {
	name: string;
	href: string;
	ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/qkrekdhka/',
		ariaLabel: 'Instagram'
	},
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/muhammad-dawam-amali-7487ab28b/',
		ariaLabel: 'LinkedIn'
	},
	{
		name: 'GitHub',
		href: 'https://github.com/Seafood99/',
		ariaLabel: 'GitHub'
	}
];

export const projects: Project[] = [
	{
		slug: 'tsa',
		title: 'Taktik Sejahtera Abadi — Company Profile & CMS',
		desc: 'Full-stack company profile for a construction & property company with an integrated CMS admin panel.',
		caseStudy:
			'Built a complete company profile from scratch with dynamic content management. The CMS admin panel runs on Next.js server actions with Better Auth for secure admin login. PostgreSQL + Drizzle ORM for type-safe queries. SvelteKit frontend is fully bilingual (ID/EN) with GSAP scroll animations and Tailwind v4 for styling. Deployed to a client-managed VPS with Nginx reverse proxy.',
		tags: ['sveltekit', 'postgresql', 'drizzle', 'tailwindcss', 'gsap'],
		link: 'https://taktikgroup.co.id/',
		linkLabel: 'Visit Site',
		images: ['/assets/projects/tsa/tsa-1.webp', '/assets/projects/tsa/tsa-2.webp'],
		featured: true
	},
	{
		slug: 'bcs',
		title: 'BCS X PSS Sleman — Fan Platform',
		desc: 'Production fan engagement platform (live at admin.bcsxpss.com) with matches, news, and merchandise.',
		caseStudy:
			'Architected a production-ready fan engagement platform handling match schedules, merchandise orders, and news content. Strapi v5 headless CMS on VPS for content management, Next.js 14 with TypeScript for the storefront. Full DevOps setup: Docker multi-stage builds, GitHub Actions CI/CD, automated deployment via SSH. Payment gateway integration for merchandise checkout.',
		tags: ['nextjs', 'strapi', 'typescript', 'docker', 'cicd'],
		link: 'https://bcsxpss.com/',
		linkLabel: 'Visit Site',
		images: [
			'/assets/projects/bcs/bcs-1.webp',
			'/assets/projects/bcs/bcs-2.webp',
			'/assets/projects/bcs/bcs-3.webp'
		]
	},
	{
		slug: 'sia-asrama',
		title: 'SIA Komplek M — Dormitory Information System',
		desc: 'Information system for Pondok Pesantren — attendance, permits, schedules, with WhatsApp reports.',
		caseStudy:
			'Designed a tailored information system for a dormitory community handling daily attendance, leave permits, academic schedules, and cleaning rosters. FastAPI backend with SQLite for lightweight data storage. Three.js interactive 3D background on the landing page. Auto-generated WhatsApp message templates for reporting. Deployed on Ubuntu VPS with systemd service and Nginx as reverse proxy, SSL via Let\'s Encrypt.',
		tags: ['fastapi', 'sqlite', 'threejs', 'nginx', 'vps'],
		link: 'https://www.komplekm.my.id/',
		linkLabel: 'Visit Site',
		images: [
			'/assets/projects/sia-asrama/sia-asrama-1.webp',
			'/assets/projects/sia-asrama/sia-asrama-2.webp'
		]
	},
	{
		slug: 'css',
		title: 'CSS — E-Commerce Platform',
		desc: 'Private Laravel 13 + Next.js 14 platform with Xendit payment integration.',
		caseStudy:
			'Contributed full-stack to a private e-commerce platform with modern payment flow. Laravel 13 backend with Xendit payment gateway integration, role-based admin dashboard with activity logging. Next.js 14 frontend with app router, cart state, checkout flow, and coupon validation. Admin panel has detailed sales analytics and order management with strict role checks.',
		tags: ['laravel', 'nextjs', 'xendit', 'restapi'],
		link: 'https://curvasudshop.com/',
		linkLabel: 'Visit Site',
		images: [
			'/assets/projects/css/css-1.webp',
			'/assets/projects/css/css-2.webp',
			'/assets/projects/css/css-3.webp'
		]
	},
	{
		slug: 'origin',
		title: 'Origin Entertainment — Event Platform',
		desc: 'Full-stack event management with event CRUD, guest stars, and media uploads.',
		caseStudy:
			'Built a full-stack event management platform with comprehensive admin capabilities. Laravel 12 backend provides RESTful APIs for event CRUD, guest star management, media library with image optimization, contact inbox with ticketing, and dashboard statistics. Next.js frontend with Tailwind CSS for responsive event listings and detail pages.',
		tags: ['laravel', 'nextjs', 'react', 'tailwindcss'],
		link: '/contact',
		linkLabel: 'Private',
		images: [
			'/assets/projects/origin/origin-1.webp',
			'/assets/projects/origin/origin-2.webp'
		]
	},
	{
		slug: 'nutrify',
		title: 'Nutrify — Health Food Landing Page',
		desc: 'High-performance landing page with perfect Lighthouse score for a competition.',
		caseStudy:
			'Engineered a high-performance landing page optimized for Core Web Vitals. Svelte single-file app with zero client-side JS overhead. Perfect Lighthouse scores: performance 100, accessibility 100, best practices 100, SEO 100. Tailwind CSS with minimal bundle size. Critical CSS inlined, lazy-loaded images, preloaded web fonts. Built for a business innovation competition.',
		tags: ['svelte', 'tailwindcss', 'lighthouse'],
		link: 'https://nutrifyy.vercel.app/',
		linkLabel: 'Visit Site',
		images: [
			'/assets/projects/nutrify/nutrify-1.webp',
			'/assets/projects/nutrify/nutrify-2.webp',
			'/assets/projects/nutrify/nutrify-3.webp'
		]
	},
	{
		slug: 'wise',
		title: 'Wise — AI Wound Identification System',
		desc: 'Cloud-native backend serving ML predictions, deployed on Google Cloud Run.',
		caseStudy:
			'Bangkit Academy capstone selected for distinction. Co-built and architected the cloud-native backend handling image upload, preprocessing, and ML prediction serving. Flask app containerized with Docker (multi-stage build for small image size), deployed on Google Cloud Run with auto-scaling. REST API with input validation, CORS, and rate limiting. Achieved 99.9% uptime during the demo period. The ML model uses a CNN to classify wound images into categories.',
		tags: ['gcp', 'flask', 'docker', 'cloudrun'],
		link: 'https://github.com/muhafiq/wise',
		linkLabel: 'Source Code',
		secondaryLink: 'https://github.com/muhafiq/wise-api-services',
		secondaryLinkLabel: 'API Services Repo',
		images: [
			'/assets/projects/wise/wise-1.webp',
			'/assets/projects/wise/wise-2.webp',
			'/assets/projects/wise/wise-3.webp',
			'/assets/projects/wise/wise-4.webp',
			'/assets/projects/wise/wise-5.webp',
			'/assets/projects/wise/wise-6.webp',
			'/assets/projects/wise/wise-7.webp'
		]
	},
	{
		slug: 'kpop',
		title: 'K-Pop Song Ranking Classifier',
		desc: 'Predictive ML model ranking K-pop songs by audio features using scikit-learn.',
		caseStudy:
			'Built a predictive ML model that ranks K-pop songs by predicted popularity from audio feature data. Cleaned the Spotify-dataset-like data with pandas (dedup, normalize, handle missing). Engineered features from raw audio data. Compared multiple scikit-learn models — tuned Random Forest and Gradient Boosting. Evaluated with Spearman rank correlation against actual chart positions.',
		tags: ['python', 'scikitlearn', 'pandas'],
		link: '/contact',
		linkLabel: 'Private',
		images: []
	}
];

export interface Job {
	title: string;
	org: string;
	date: string;
	desc: string;
	active?: boolean;
}

export const experiences: Job[] = [
	{
		title: 'Full Stack Developer — Taktik Sejahtera Abadi',
		org: 'Company Profile & CMS',
		date: 'Jun 2026 — Present',
		desc: 'Built a full-stack company profile website with integrated CMS admin panel, PostgreSQL schema with Drizzle ORM, Better Auth-based admin auth, and bilingual (ID/EN) SvelteKit frontend.',
		active: true
	},
	{
		title: 'Full Stack Developer — BCS X PSS Sleman',
		org: 'Fan Engagement Platform',
		date: 'Jan 2026 — May 2026',
		desc: 'Engineered & deployed a production fan platform (admin.bcsxpss.com) using Next.js and Strapi, orchestrating Docker multi-stage builds and GitHub Actions CI/CD on a VPS.'
	},
	{
		title: 'Full Stack Developer — SIA Komplek M',
		org: 'Dormitory Information System',
		date: 'Jun 2026',
		desc: 'Built a dormitory information system with FastAPI REST API, JWT admin panel, Three.js interactive background, WhatsApp report templates, and systemd + Nginx deployment on Ubuntu VPS.'
	},
	{
		title: 'Full Stack Developer — CSS E-Commerce',
		org: 'Laravel 13 + Next.js 14',
		date: 'Apr 2026 — May 2026',
		desc: 'Contributed to a private e-commerce platform with Xendit payment integration — cart, checkout, order lookup, coupon validation, and admin role checks.'
	},
	{
		title: 'Full Stack Developer — Origin Entertainment',
		org: 'Event Management Platform',
		date: 'Feb 2026 — Apr 2026',
		desc: 'Built Laravel APIs and admin CMS features for events, guest stars, media uploads and contact inbox, integrated with Next.js frontend.'
	},
	{
		title: 'Frontend Developer — Nutrify',
		org: 'Health Food Brand',
		date: 'Mar 2025 — Apr 2025',
		desc: 'Engineered a high-performance landing page with Svelte and Tailwind CSS, achieving a perfect Lighthouse performance score for a business innovation competition.'
	},
	{
		title: 'Laboratory Assistant — Universitas Amikom',
		org: 'OS & Web Programming',
		date: 'Mar 2025 — Aug 2025',
		desc: 'Mentored 100+ students per semester in Linux Kernel programming, memory management, and full-stack web dev. Managed 20+ lab modules and acted as substitute lecturer.'
	},
	{
		title: 'Cloud Computing Cohort — Bangkit Academy',
		org: 'Google, Tokopedia, Gojek & Traveloka',
		date: 'Sep 2024 — Jan 2025',
		desc: 'Architected and deployed the RESTful API for "Wise" (AI wound identification), containerized with Docker and running on Google Cloud Run with 99.9% uptime.'
	}
];

export interface JourneyItem {
	kind: 'education' | 'work';
	title: string;
	org: string;
	date: string;
	desc: string;
	active?: boolean;
}

/**
 * Satu garis waktu utuh — dari pertama kali belajar sampai yang paling baru.
 * URUTAN SENGAJA ASCENDING (lama → baru): ini yang dibaca user sambil scroll ke bawah,
 * jadi ceritanya jalan maju, bukan mundur.
 * Kalau nambah entri baru, taruh di BAWAH sesuai tanggalnya.
 */
export const journey: JourneyItem[] = [
	{
		kind: 'education',
		title: 'Bachelor of Informatics',
		org: 'Universitas Amikom Yogyakarta',
		date: '2022 — Present · GPA 3.75/4.00',
		desc: 'Where it started. Focus on software engineering, cloud computing, and web technologies.'
	},
	{
		kind: 'education',
		title: 'Frontend Development Bootcamp',
		org: 'Neuversity School of Software Engineering',
		date: 'Jun 2024 — Dec 2024',
		desc: 'Advanced frontend engineering and the modern JavaScript ecosystem.'
	},
	{
		kind: 'education',
		title: 'Cloud Computing Cohort',
		org: 'Bangkit Academy — Google, Tokopedia, Gojek & Traveloka',
		date: 'Sep 2024 — Jan 2025',
		desc: 'Architected and deployed the RESTful API for "Wise" (AI wound identification), containerized with Docker on Google Cloud Run at 99.9% uptime. Capstone selected for distinction.'
	},
	{
		kind: 'work',
		title: 'Frontend Developer — Nutrify',
		org: 'Health Food Brand',
		date: 'Mar 2025 — Apr 2025',
		desc: 'Engineered a high-performance landing page with Svelte and Tailwind CSS, achieving a perfect Lighthouse performance score for a business innovation competition.'
	},
	{
		kind: 'work',
		title: 'Laboratory Assistant — Universitas Amikom',
		org: 'OS & Web Programming',
		date: 'Mar 2025 — Aug 2025',
		desc: 'Mentored 100+ students per semester in Linux Kernel programming, memory management, and full-stack web dev. Managed 20+ lab modules and acted as substitute lecturer.'
	},
	{
		kind: 'work',
		title: 'Full Stack Developer — BCS X PSS Sleman',
		org: 'Fan Engagement Platform',
		date: 'Jan 2026 — May 2026',
		desc: 'Engineered & deployed a production fan platform (admin.bcsxpss.com) using Next.js and Strapi, orchestrating Docker multi-stage builds and GitHub Actions CI/CD on a VPS.'
	},
	{
		kind: 'work',
		title: 'Full Stack Developer — Origin Entertainment',
		org: 'Event Management Platform',
		date: 'Feb 2026 — Apr 2026',
		desc: 'Built Laravel APIs and admin CMS features for events, guest stars, media uploads and contact inbox, integrated with a Next.js frontend.'
	},
	{
		kind: 'work',
		title: 'Full Stack Developer — CSS E-Commerce',
		org: 'Laravel 13 + Next.js 14',
		date: 'Apr 2026 — May 2026',
		desc: 'Contributed to a private e-commerce platform with Xendit payment integration — cart, checkout, order lookup, coupon validation, and admin role checks.'
	},
	{
		kind: 'work',
		title: 'Full Stack Developer — SIA Komplek M',
		org: 'Dormitory Information System',
		date: 'Jun 2026',
		desc: 'Built a dormitory information system with FastAPI REST API, JWT admin panel, Three.js interactive background, WhatsApp report templates, and systemd + Nginx deployment on Ubuntu VPS.'
	},
	{
		kind: 'work',
		title: 'Full Stack Developer — Taktik Sejahtera Abadi',
		org: 'Company Profile & CMS',
		date: 'Jun 2026 — Present',
		desc: 'Built a full-stack company profile website with integrated CMS admin panel, PostgreSQL schema with Drizzle ORM, Better Auth-based admin auth, and a bilingual (ID/EN) SvelteKit frontend.',
		active: true
	}
];

export interface Edu {
	title: string;
	school: string;
	year: string;
	desc: string;
}

export const education: Edu[] = [
	{
		title: 'Bachelor of Informatics',
		school: 'Universitas Amikom Yogyakarta',
		year: '2022 — Present · GPA 3.75/4.00',
		desc: 'Focus on software engineering, cloud computing, and web technologies.'
	},
	{
		title: 'Cloud Computing Cohort',
		school: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)',
		year: 'Sep 2024 — Jan 2025',
		desc: 'Distinguished capstone — built the API and deployed it on GCP.'
	},
	{
		title: 'Frontend Development Bootcamp',
		school: 'Neuversity School of Software Engineering',
		year: 'Jun 2024 — Dec 2024',
		desc: 'Advanced frontend engineering and modern JavaScript ecosystem.'
	},
	{
		title: 'Google Cloud & Dicoding',
		school: 'Associate Cloud Engineer Journey · Cloud Engineer · JS',
		year: 'Certifications',
		desc: 'Preparing Your Associate Cloud Engineer Journey, Menjadi Cloud Engineer, Belajar Dasar Pemrograman Javascript.'
	}
];
