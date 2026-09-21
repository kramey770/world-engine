export interface Character {
	i: number;
	name: string;
	x: number;
	y: number;
	cell: number;
	title?: string;
	role?: string;
	faction?: string;
	age?: number;
	status?: string;
	culture?: string;
	origin?: string;
	notes?: string;
	icon?: string;
	color?: string;
	lock?: boolean;
}
