export type ThreeDOptions = {
	isOn: boolean;
	isGlobe: boolean;
	scale: number;
	lightness: number;
	shadow: number;
	sun: { x: number; y: number; z: number };
	rotateMesh: number;
	rotateGlobe: number;
	skyColor: string;
	waterColor: string;
	sunColor: string;
	extendedWater: boolean;
	labels3d: boolean;
	wireframe: boolean;
	resolution: number;
	resolutionScale: number;
	subdivide: boolean;
	erosion: boolean;
	erosionDetail: number;
	erosionStrength: number;
	erosionRiverDepth: number;
	erosionOctaves: number;
	satellite: boolean;
};

export type TimeOfDayPreset = {
	sun: { x: number; y: number; z: number };
	sunColor: string;
	lightness: number;
	skyColor: string;
	waterColor: string;
};

export const timeOfDayPresets: Record<string, TimeOfDayPreset> = {
	dawn: {
		sun: { x: -500, y: 400, z: 800 },
		sunColor: "#f06a6a",
		lightness: 0.4,
		skyColor: "#b5b5ba",
		waterColor: "#46464c",
	},
	noon: {
		sun: { x: 100, y: 800, z: 1000 },
		sunColor: "#b5b5ba",
		lightness: 0.6,
		skyColor: "#b5b5ba",
		waterColor: "#7d7d83",
	},
	evening: {
		sun: { x: 500, y: 400, z: 800 },
		sunColor: "#e05252",
		lightness: 0.5,
		skyColor: "#f06a6a",
		waterColor: "#35353a",
	},
	night: {
		sun: { x: 0, y: -500, z: 1000 },
		sunColor: "#55555b",
		lightness: 0.2,
		skyColor: "#202023",
		waterColor: "#151517",
	},
};

export const defaultOptions = {
	isOn: false,
	isGlobe: false,
	scale: 50,
	lightness: 0.6,
	shadow: 0.5,
	sun: { x: 100, y: 800, z: 1000 },
	rotateMesh: 0,
	rotateGlobe: 0.5,
	skyColor: "#b5b5ba",
	waterColor: "#7d7d83",
	sunColor: "#b5b5ba",
	extendedWater: false,
	labels3d: false,
	satellite: false,
	wireframe: false,
	resolution: 2,
	resolutionScale: 4096,
	subdivide: false,
	erosion: false,
	erosionDetail: 1024,
	erosionStrength: 30,
	erosionRiverDepth: 10,
	erosionOctaves: 2,
};

window.ThreeDOptions = defaultOptions;

declare global {
	interface Window {
		ThreeDOptions: typeof defaultOptions;
	}
}
