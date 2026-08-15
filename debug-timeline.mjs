import { chromium } from '@playwright/test';

const PORTS = [5173, 5174, 5175, 5176];
async function findUrl() {
	for (const p of PORTS) {
		try {
			const res = await fetch(`http://localhost:${p}/about`, { signal: AbortSignal.timeout(3000) });
			if (res.ok) return `http://localhost:${p}/about`;
		} catch {}
	}
	return null;
}
const url = await findUrl();
if (!url) { console.log('NO_DEV_SERVER'); process.exit(1); }
console.log('URL:', url);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const total = await page.evaluate(() => document.documentElement.scrollHeight);
console.log('docScrollHeight:', total);

for (const y of [0, 800, 1600, 2400, 3000, 3908, 4200]) {
	await page.evaluate((yy) => window.scrollTo(0, yy), y);
	await page.waitForTimeout(400);
	const s = await page.evaluate(() => {
		const track = document.querySelector('.track');
		const sticky = document.querySelector('.sticky-viewport');
		const m = track ? new DOMMatrix(getComputedStyle(track).transform) : null;
		const maxT = track ? track.scrollWidth - window.innerWidth : 0;
		return {
			scrollY: Math.round(window.scrollY),
			stickyTop: Math.round(sticky.getBoundingClientRect().top),
			translateX: m ? Math.round(m.m41) : null,
			maxTranslate: Math.round(maxT)
		};
	});
	console.log(JSON.stringify(s));
}
await browser.close();
