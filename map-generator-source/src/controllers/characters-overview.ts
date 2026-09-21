import { closeDialogs, destroyDialog } from "@/components/dialog/dialog-helpers";
import { Layers } from "@/components/layers";
import { Controllers } from "@/controllers";
import type { Character } from "@/generators/characters-generator";
import { ensureEl } from "../utils";

const dialogId = "charactersOverview";

function open(): void {
	if (customization) return;
	closeDialogs(".stable");
	Layers.show("characters");
	seedCharacters();
	Layers.draw("characters");
	renderDialog();
	$("#charactersOverview").dialog({ title: "Characters Overview", resizable: false, width: "fit-content", close: close });
}

function renderDialog(): void {
	destroyDialog(dialogId);
	ensureEl("dialogs").insertAdjacentHTML("beforeend", `<div id="${dialogId}" class="dialog stable editorDialog">
    <div id="charactersBody" class="table"></div>
    <div class="totalLine">Characters: <span id="charactersTotal">0</span></div>
	    <div id="charactersBottom"><button id="charactersRefresh" class="icon-cw" data-tip="Refresh the Characters Overview"></button><button id="charactersAdd" class="icon-plus" data-tip="Place a character on the map"></button></div>
  </div>`);
	ensureEl("charactersBody").addEventListener("click", (event) => {
		const row = (event.target as HTMLElement).closest<HTMLElement>("[data-id]");
		if (!row) return;
		void Controllers.CharactersEditor.open(Number(row.dataset.id));
	});
	ensureEl("charactersRefresh").addEventListener("click", renderRows);
	ensureEl("charactersAdd").addEventListener("click", addCharacter);
	renderRows();
}

function renderRows(): void {
	const characters = pack.characters || [];
	ensureEl("charactersBody").innerHTML = characters.map((character) => `<div class="states pointer" data-id="${character.i}">
			<span data-col="name"><strong>${character.name}</strong><small>${character.title || "Character"}</small></span>
			<span data-col="role">${character.role || "Unassigned"}</span>
			<span data-col="faction">${character.faction || "Unaffiliated"}</span>
			<span data-col="status">${character.status || "Active"}</span>
			<span data-col="origin">${character.origin || "Unknown origin"}</span>
			<span class="icon-pencil"></span>
		</div>`).join("") || "<div class=\"empty\">No characters on this map.</div>";
	ensureEl("charactersTotal").textContent = String(characters.length);
}

function addCharacter(): void {
	void Controllers.CharacterCreator.toggle();
}

function seedCharacters(): void {
	if (pack.characters?.length) return;
	const seeds: Omit<Character, "i" | "x" | "y" | "cell">[] = [
		{ name: "Aveline Marr", title: "The Cartographer", role: "Royal surveyor", faction: "House Marr", age: 34, status: "Active", culture: "Valedorn", origin: "Northwatch", notes: "Keeps a private atlas of every disputed border." },
		{ name: "Tomas Vey", title: "Ash Captain", role: "Commander", faction: "The Ember Guard", age: 47, status: "Active", culture: "Kestrel Coast", origin: "Redwater", notes: "Known for negotiating before drawing steel." },
		{ name: "Iria Sol", title: "Keeper of Keys", role: "Archivist", faction: "The Glass Archive", age: 61, status: "Missing", culture: "Old Meridian", origin: "Meridian City", notes: "Last seen carrying a sealed map case." },
		{ name: "Bram Oakes", title: "The Quiet Giant", role: "Warden", faction: "Free Marches", age: 29, status: "Active", culture: "Marcher", origin: "Oak Hollow", notes: "Protects travelers crossing the eastern passes." },
	];
	pack.characters = seeds.map((character, index) => ({
		...character,
		i: index + 1,
		x: graphWidth * (0.2 + (index % 2) * 0.55),
		y: graphHeight * (0.25 + Math.floor(index / 2) * 0.45),
		cell: 0,
	}));
}

function close(): void {
	destroyDialog(dialogId);
}

export const CharactersOverview = { open };
