const stylePanelPresets = [
	["gloom", "Gloom", "gloom.png"],
	["ancient", "Ancient", "ancient.png"],
	["pale", "Pale", "pale.png"],
	["light", "Light", "light.png"],
	["ink", "Ink", "ink.png"],
	["default", "Default", "default.png"],
	["frostbite", "Frostbite", "frostbite.png"],
	["darkSeas", "Dark Seas", "dark-seas.png"],
	["cyberpunk", "Cyberpunk", "cyberpunk.png"],
	["night", "Night", "night.png"],
	["watercolor", "Watercolor", "watercolor.png"],
	["clean", "Clean", "clean.png"],
	["atlas", "Atlas", "atlas.png"],
	["cinderwood", "Cinderwood", "cinderwood.png"],
	["monochrome", "Monochrome", "monochrome.png"],
];

const stylePanelFilters = [
	["grayscale", "Grayscale"],
	["sepia", "Sepia"],
	["tint", "Tint"],
	["dingy", "Dingy"],
];

const stylePanel = document.getElementById("stylePanel");
const stylePanelTrigger = document.getElementById("stylePanelTrigger");
const stylePanelContent = document.getElementById("stylePanelContent");
const stylePanelPresetsEl = document.getElementById("stylePanelPresets");
const stylePanelFiltersEl = document.getElementById("stylePanelFilters");

function syncStylePanel() {
	const selectedPreset = document.getElementById("stylePreset")?.value;
	stylePanelPresetsEl?.querySelectorAll("button").forEach((button) => {
		button.classList.toggle("pressed", button.dataset.preset === selectedPreset);
		button.setAttribute("aria-pressed", String(button.dataset.preset === selectedPreset));
	});
	const activeFilter = document.querySelector("#mapFilters .pressed")?.id;
	stylePanelFiltersEl?.querySelectorAll("button").forEach((button) => {
		button.classList.toggle("pressed", button.dataset.filter === activeFilter);
		button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter));
	});
}

function createStyleButton([preset, label, image]) {
	const button = document.createElement("button");
	button.type = "button";
	button.dataset.preset = preset;
	button.setAttribute("aria-label", label);
	button.setAttribute("aria-pressed", "false");
	button.title = label;
	button.innerHTML = `<img src="images/map-styles/${image}" alt="${label} map style" loading="lazy"><span>${label}</span>`;
	button.addEventListener("click", () => {
		const select = document.getElementById("stylePreset");
		if (!select) return;
		select.value = preset;
		select.dispatchEvent(new Event("change", { bubbles: true }));
		syncStylePanel();
	});
	return button;
}

function createFilterButton([filter, label]) {
	const button = document.createElement("button");
	button.type = "button";
	button.dataset.filter = filter;
	button.textContent = label;
	button.setAttribute("aria-pressed", "false");
	button.addEventListener("click", () => {
		document.getElementById(filter)?.click();
		syncStylePanel();
	});
	return button;
}

stylePanelPresetsEl?.replaceChildren(...stylePanelPresets.map(createStyleButton));
stylePanelFiltersEl?.replaceChildren(...stylePanelFilters.map(createFilterButton));

stylePanelTrigger?.addEventListener("click", () => {
	const expanded = stylePanel?.classList.toggle("expanded");
	stylePanelTrigger.setAttribute("aria-expanded", String(expanded));
	if (expanded) stylePanelContent.removeAttribute("hidden");
	else stylePanelContent.setAttribute("hidden", "");
});

document.getElementById("stylePreset")?.addEventListener("change", syncStylePanel);
document.getElementById("mapFilters")?.addEventListener("click", () => window.setTimeout(syncStylePanel, 0));
window.setTimeout(syncStylePanel, 0);
