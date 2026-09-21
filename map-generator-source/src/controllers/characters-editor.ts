import { drag, pointer, select } from "d3";
import { closeDialogs, destroyDialog } from "@/components/dialog/dialog-helpers";
import type { Character } from "@/generators/characters-generator";
import { Layers } from "@/components/layers";
import { ensureEl, rn } from "../utils";

let selectedCharacter: Character | undefined;
let selectedElement: SVGGElement | undefined;

function open(characterI?: number, target?: Element): void {
	if (customization) return;
	closeDialogs(".stable");
	const id = characterI ?? Number(target?.closest("[data-id]")?.getAttribute("data-id"));
	selectedCharacter = (pack.characters || []).find((character) => character.i === id);
	if (!selectedCharacter) return;
	selectedElement = document.getElementById(`character${id}`) as unknown as SVGGElement | undefined;
	if (selectedElement) {
		select<SVGGElement, unknown>(selectedElement)
			.raise()
			.call(drag<SVGGElement, unknown>().on("drag", dragCharacter).on("end", finishDrag));
	}
	renderDialog();
	updateInputs();
	$("#characterEditor").dialog({ title: "Edit Character", resizable: false, close: close });
}

function renderDialog(): void {
	destroyDialog("characterEditor");
	ensureEl("dialogs").insertAdjacentHTML("beforeend", `<div id="characterEditor" class="dialog">
	<div class="label">Name:</div><input id="characterName" style="width: 14em" />
	<div class="label">Title:</div><input id="characterTitle" style="width: 14em" />
	<div class="label">Role:</div><input id="characterRole" style="width: 14em" />
	<div class="label">Faction:</div><input id="characterFaction" style="width: 14em" />
	<div class="label">Status:</div><input id="characterStatus" style="width: 14em" />
	<div class="label">Notes:</div><textarea id="characterNotes" rows="3" style="width: 14em"></textarea>
    <div id="characterBottom"><button id="characterSave" class="icon-ok"></button></div>
  </div>`);
	ensureEl("characterSave").addEventListener("click", save);
}

function updateInputs(): void {
	if (!selectedCharacter) return;
	ensureEl<HTMLInputElement>("characterName").value = selectedCharacter.name;
	ensureEl<HTMLInputElement>("characterTitle").value = selectedCharacter.title || "";
	ensureEl<HTMLInputElement>("characterRole").value = selectedCharacter.role || "";
	ensureEl<HTMLInputElement>("characterFaction").value = selectedCharacter.faction || "";
	ensureEl<HTMLInputElement>("characterStatus").value = selectedCharacter.status || "";
	ensureEl<HTMLTextAreaElement>("characterNotes").value = selectedCharacter.notes || "";
}

function dragCharacter(event: any): void {
	if (!selectedElement) return;
	selectedElement.setAttribute("transform", `translate(${rn(event.x, 1)} ${rn(event.y, 1)})`);
}

function finishDrag(event: any): void {
	if (!selectedCharacter) return;
	const point = pointer(event.sourceEvent, ensureEl("viewbox"));
	selectedCharacter.x = rn(point[0], 2);
	selectedCharacter.y = rn(point[1], 2);
	selectedCharacter.cell = Pack.findCell(point[0], point[1]) ?? selectedCharacter.cell;
}

function save(): void {
	if (!selectedCharacter) return;
	selectedCharacter.name = ensureEl<HTMLInputElement>("characterName").value.trim() || "Unnamed Character";
	selectedCharacter.title = ensureEl<HTMLInputElement>("characterTitle").value.trim();
	selectedCharacter.role = ensureEl<HTMLInputElement>("characterRole").value.trim();
	selectedCharacter.faction = ensureEl<HTMLInputElement>("characterFaction").value.trim();
	selectedCharacter.status = ensureEl<HTMLInputElement>("characterStatus").value.trim();
	selectedCharacter.notes = ensureEl<HTMLTextAreaElement>("characterNotes").value.trim();
	Layers.draw("characters");
	$("#characterEditor").dialog("close");
}

function close(): void {
	destroyDialog("characterEditor");
	selectedCharacter = undefined;
	selectedElement = undefined;
}

export const CharactersEditor = { open };
