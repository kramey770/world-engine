// The fill picker: an SVG overlay to pick a color or a hatching pattern.
import { color as d3Color, type D3DragEvent, drag, select } from "d3";
import { tip } from "@/components/tooltips";
import {
	nearestPaletteColor,
	parseTransform,
	rn,
	WORLD_ENGINE_PALETTE,
} from "@/utils";

const COLUMNS = 14;
const SWATCH_STEP_X = 22;
const SWATCH_STEP_Y = 20;
const SWATCH_X = 4;
const SWATCH_SIZE = 16;
const PICKER_WIDTH = 315;

/** Open the picker for the current fill, calling back on every pick */
function open(fill: string, callback: (fill: string) => void): void {
	document.getElementById("pickerContainer")?.remove();
	const container = renderPicker();
	addListeners(container, callback);

	const parsedColor = fill.startsWith("url(") ? null : d3Color(fill);
	if (parsedColor) {
		const paletteFill = nearestPaletteColor(parsedColor.formatHex());
		if (paletteFill !== fill.toLowerCase()) callback(paletteFill);
		fill = paletteFill;
	}

	updateSelectedRect(fill);
}

function renderPicker(): SVGSVGElement {
	const hatches = Array.from(
		document.querySelectorAll<SVGPatternElement>("g#defs-hatching > pattern"),
	);
	const number = hatches.length;
	const colors = WORLD_ENGINE_PALETTE;
	const rows = Math.ceil(number / COLUMNS);
	const colorsBottom = 36 + rows * SWATCH_STEP_Y;
	const hatchesBottom = 16 + number * 2 + rows * SWATCH_STEP_Y;
	const height = Math.max(40, colorsBottom, hatchesBottom) + 9;
	const x = (svgWidth - PICKER_WIDTH) / 2;
	const y = (svgHeight - height) / 2;
	const zIndex =
		Array.from(document.querySelectorAll<HTMLElement>(".ui-front")).reduce(
			(max, element) =>
				Math.max(max, Number(getComputedStyle(element).zIndex) || 0),
			100,
		) + 1;

	const colorRects = colors
		.map(
			(color, i) => /* html */ `<rect
        id="picker_${color}"
        fill="${color}"
        class="${i ? "" : "selected"}"
        x="${(i % COLUMNS) * SWATCH_STEP_X + SWATCH_X}"
        y="${40 + Math.floor(i / COLUMNS) * SWATCH_STEP_Y}"
        width="${SWATCH_SIZE}"
        height="${SWATCH_SIZE}"
      ></rect>`,
		)
		.join("");

	const hatchRects = hatches
		.map(
			(hatch, i) => /* html */ `<rect
        id="picker_${hatch.id}"
        fill="url(#${hatch.id})"
        x="${(i % COLUMNS) * SWATCH_STEP_X + SWATCH_X}"
        y="${Math.floor(i / COLUMNS) * SWATCH_STEP_Y + 20 + number * 2}"
        width="${SWATCH_SIZE}"
        height="${SWATCH_SIZE}"
      ></rect>`,
		)
		.join("");

	document.body.insertAdjacentHTML(
		"beforeend",
		/* html */ `<svg
      id="pickerContainer"
      width="100%"
      height="100%"
      style="z-index: ${zIndex}"
    >
      <rect id="pickerOverlay" x="0" y="0" width="100%" height="100%" opacity="0.2"></rect>
      <g id="picker" transform="translate(${x},${y})">
        <rect id="pickerBackground" x="0" y="0" width="${PICKER_WIDTH}" height="${height}" fill="#151517" stroke="#35353a"></rect>
        <g id="pickerColors" stroke="#35353a">${colorRects}</g>
        <g id="pickerHatches" stroke="#35353a">${hatchRects}</g>
        <rect id="pickerHeader" x="0" y="-30" width="${PICKER_WIDTH}" height="30"></rect>
        <text id="pickerLabel" x="12" y="-10">Color Picker</text>
        <rect id="pickerCloseRect" x="${PICKER_WIDTH - 23}" y="-21" width="14" height="14"></rect>
        <text id="pickerCloseText" x="${PICKER_WIDTH - 20}" y="-10">✕</text>
      </g>
    </svg>`,
	);

	return document.getElementById("pickerContainer") as unknown as SVGSVGElement;
}

function addListeners(
	container: SVGSVGElement,
	callback: (fill: string) => void,
): void {
	const picker = getSvgElement<SVGGElement>("picker");
	const closePicker = () => container.remove();
	const tipClose = () => tip("Click to close the picker");
	const tipDrag = () => tip("Drag to change the picker position");

	getSvgElement("pickerOverlay").addEventListener("mousemove", tipClose);
	getSvgElement("pickerOverlay").addEventListener("click", closePicker);
	getSvgElement("pickerCloseRect").addEventListener("mousemove", tipClose);
	getSvgElement("pickerCloseRect").addEventListener("click", closePicker);
	getSvgElement("pickerBackground").addEventListener("mousemove", tipDrag);
	getSvgElement("pickerHeader").addEventListener("mousemove", tipDrag);
	getSvgElement("pickerLabel").addEventListener("mousemove", tipDrag);

	addFillListeners(
		getSvgElement("pickerColors"),
		callback,
		"Click to fill with the color",
	);
	addFillListeners(getSvgElement("pickerHatches"), callback);

	select(picker).call(
		drag<SVGGElement, unknown>().on("start", function (event) {
			onPickerDrag.call(this, event);
		}),
	);
}

function addFillListeners(
	group: SVGGElement,
	callback: (fill: string) => void,
	hint?: string,
): void {
	group.addEventListener("click", (event) => {
		const rect = (event.target as Element).closest<SVGRectElement>("rect");
		if (rect) onFillClicked(rect, callback);
	});
	group.addEventListener("mouseover", (event) => {
		const rect = (event.target as Element).closest<SVGRectElement>("rect");
		if (rect) tip(hint || `Click to fill with the hatching ${rect.id}`);
	});
}

function getSvgElement<T extends SVGElement = SVGElement>(id: string): T {
	return document.getElementById(id) as unknown as T;
}

function pickFill(callback: (fill: string) => void): void {
	const selected = getSvgElement("picker").querySelector("rect.selected");
	if (selected) callback(selected.getAttribute("fill") as string);
}

function updateSelectedRect(fill: string): void {
	const picker = getSvgElement("picker");
	picker.querySelector("rect.selected")?.classList.remove("selected");
	picker
		.querySelector(`rect[fill='${fill.toLowerCase()}']`)
		?.classList.add("selected");
}

function onFillClicked(
	rect: SVGRectElement,
	callback: (fill: string) => void,
): void {
	const fill = rect.getAttribute("fill") as string;
	updateSelectedRect(fill);
	pickFill(callback);
}

function onPickerDrag(
	this: SVGGElement,
	event: D3DragEvent<SVGGElement, unknown, unknown>,
): void {
	const transform = parseTransform(this.getAttribute("transform")!);
	const x = Number(transform[0]) - event.x;
	const y = Number(transform[1]) - event.y;
	const bbox = this.getBBox();

	event.on("drag", (dragEvent) => {
		const px = rn(((x + dragEvent.x + bbox.width) / svgWidth) * 100, 2);
		const py = rn(((y + dragEvent.y + bbox.height) / svgHeight) * 100, 2);
		this.setAttribute(
			"transform",
			`translate(${x + dragEvent.x},${y + dragEvent.y})`,
		);
		this.dataset.x = String(px);
		this.dataset.y = String(py);
	});
}

export const ColorPicker = { open };
