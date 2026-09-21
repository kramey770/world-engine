import { pointer } from "d3";
import { refreshEditors } from "@/components/dialog/dialog-helpers";
import { Layers } from "@/components/layers";
import { stopMapPlacement, toggleMapPlacement } from "@/components/map-placement";
import type { Character } from "@/generators/characters-generator";
import { ensureEl, rn } from "@/utils";

function toggle(): void {
	if (ensureEl("addCharacterTool").classList.contains("pressed")) {
		stopMapPlacement();
		return;
	}

	toggleMapPlacement(
		"addCharacterTool",
		(event) => addOnClick(event),
		"Click anywhere on the map to place a character. Hold Shift to add multiple",
		undefined,
		() => ensureEl("addCharacterTool").classList.remove("pressed"),
	);
	Layers.show("characters");
}

function addOnClick(event: MouseEvent): void {
	const [x, y] = pointer(event, event.currentTarget as SVGGElement);
	const cell = Pack.findCell(x, y);
	if (cell === undefined) return;

	pack.characters ||= [];
	const i = (pack.characters.at(-1)?.i || 0) + 1;
	const character: Character = {
		i,
		name: `Character ${i}`,
		title: "New arrival",
		role: "Unassigned",
		faction: "Unaffiliated",
		status: "Active",
		x: rn(x, 2),
		y: rn(y, 2),
		cell,
	};
	pack.characters.push(character);
	Layers.draw("characters");
	refreshEditors();
	if (!event.shiftKey) stopMapPlacement();
}

export const CharacterCreator = { toggle };