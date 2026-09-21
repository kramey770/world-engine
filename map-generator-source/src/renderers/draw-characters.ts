import { select } from "d3";
import type { Character } from "@/generators/characters-generator";
import { rn } from "../utils";

export function drawCharacter(character: Character): string {
  const { i, name, x, y, icon = "♟", color = "#d7f9ff" } = character;
	return /* html */ `
    <g id="character${i}" data-id="${i}" class="character-marker" transform="translate(${rn(x, 1)} ${rn(y, 1)})">
      <circle r="18" fill="#102a43" stroke="${color}" stroke-width="3" />
      <text text-anchor="middle" dominant-baseline="central" font-size="18">${icon}</text>
      <text y="30" text-anchor="middle" fill="${color}" font-size="12">${name}</text>
    </g>`;
}

export const drawCharacters = (): void => {
	const characters = pack.characters || [];
	select("#characters").html(characters.map(drawCharacter).join(""));
};
