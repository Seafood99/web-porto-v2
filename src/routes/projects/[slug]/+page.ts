import { error } from '@sveltejs/kit';
import { projects } from '$lib/data';

export const prerender = true;

export function entries() {
	return projects.map((project) => ({ slug: project.slug }));
}

export function load({ params }) {
	const index = projects.findIndex((project) => project.slug === params.slug);
	if (index === -1) error(404, 'Project not found');

	return {
		project: projects[index],
		previous: index > 0 ? projects[index - 1] : null,
		next: index < projects.length - 1 ? projects[index + 1] : null
	};
}
