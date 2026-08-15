export const theme = $state({ isDark: false });

export function initTheme(): void {
	if (typeof localStorage === 'undefined') return;
	const saved = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	theme.isDark = saved === 'dark' || (saved === null && prefersDark);
	document.documentElement.classList.toggle('dark', theme.isDark);
}

export function toggleTheme(): void {
	theme.isDark = !theme.isDark;
	document.documentElement.classList.toggle('dark', theme.isDark);
	localStorage.setItem('theme', theme.isDark ? 'dark' : 'light');
}
