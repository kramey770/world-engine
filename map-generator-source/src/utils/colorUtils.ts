import {
	color,
	interpolate,
	type RGBColor,
	range,
	shuffler,
} from "d3";

export const WORLD_ENGINE_PALETTE = [
	"#0b0b0c",
	"#151517",
	"#202023",
	"#29292d",
	"#35353a",
	"#46464c",
	"#55555b",
	"#7d7d83",
	"#66666d",
	"#b5b5ba",
	"#f1f1f2",
	"#ffffff",
	"#3d0b0b",
	"#5c1010",
	"#7a1515",
	"#941f1f",
	"#b52a2a",
	"#c23a3a",
	"#9b3030",
	"#762a2a",
	"#e05252",
	"#f06a6a",
	"#351313",
	"#421515",
	"#241516",
	"#431010",
	"#351719",
];

export const nearestPaletteColor = (value: string): string => {
	const source = color(value)?.rgb();
	if (!source) return WORLD_ENGINE_PALETTE[0];

	return WORLD_ENGINE_PALETTE.reduce(
		(nearest, candidate) => {
			const target = color(candidate)?.rgb();
			if (!target) return nearest;
			const distance =
				(source.r - target.r) ** 2 +
				(source.g - target.g) ** 2 +
				(source.b - target.b) ** 2;
			return distance < nearest.distance
				? { color: candidate, distance }
				: nearest;
		},
		{ color: WORLD_ENGINE_PALETTE[0], distance: Infinity },
	).color;
};

/**
 * Convert RGB or RGBA color to HEX
 * @param {string} rgba - The RGB or RGBA color string
 * @returns {string} - The HEX color string
 */
export const toHEX = (rgba: string): string => {
	if (rgba.charAt(0) === "#") return rgba;

	const matches = rgba.match(
		/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i,
	);
	return matches && matches.length === 4
		? "#" +
				`0${parseInt(matches[1], 10).toString(16)}`.slice(-2) +
				`0${parseInt(matches[2], 10).toString(16)}`.slice(-2) +
				`0${parseInt(matches[3], 10).toString(16)}`.slice(-2)
		: "";
};

/** Palette colors used to distinguish map regions without introducing new hues. */
export const C_12 = [
	"#3d0b0b",
	"#5c1010",
	"#7a1515",
	"#941f1f",
	"#b52a2a",
	"#0b0b0c",
	"#202023",
	"#35353a",
	"#55555b",
	"#7d7d83",
	"#b5b5ba",
	"#f1f1f2",
];

/**
 * Get an array of distinct colors
 * Uses shuffler with current Math.random to ensure seeded randomness works
 * @param {number} count - The count of colors to generate
 * @returns {string[]} - The array of HEX color strings
 */
export const getColors = (count: number): string[] => {
	// Use shuffler() to create a shuffle function that uses the current Math.random
	const shuffle = shuffler(() => Math.random());
	const colors = shuffle(
		range(count).map((i) => C_12[i % C_12.length]),
	);
	return colors.filter((c): c is string => typeof c === "string");
};

/**
 * Get a random color in HEX format
 * @returns {string} - The HEX color string
 */
export const getRandomColor = (): string => {
	return WORLD_ENGINE_PALETTE[
		Math.floor(Math.random() * WORLD_ENGINE_PALETTE.length)
	];
};

/**
 * Get a mixed color by blending a given color with a random color
 * @param {string} color - The base color in HEX format
 * @param {number} mix - The mix ratio (0 to 1)
 * @param {number} bright - The brightness adjustment
 * @returns {string} - The mixed HEX color string
 */
export const getMixedColor = (
	colorToMix: string,
	mix = 0.2,
	bright = 0.3,
): string => {
	const c = colorToMix && colorToMix[0] === "#" ? colorToMix : getRandomColor(); // if provided color is not hex (e.g. harching), generate random one
	const mixedColor: RGBColor = color(
		interpolate(c, getRandomColor())(mix),
	) as RGBColor;
	return nearestPaletteColor(mixedColor.brighter(bright).formatHex());
};

declare global {
	interface Window {
		toHEX: typeof toHEX;
	}
}
