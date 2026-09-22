import { debounce, ensureEl, findEl } from "@/utils";

type TipType = "info" | "success" | "warn" | "error";

const TIP_CLASSES: Record<TipType, string> = {
	info: "world-engine-tip-info",
	success: "world-engine-tip-success",
	warn: "world-engine-tip-warn",
	error: "world-engine-tip-error",
};

const getTooltip = () => ensureEl("tooltip");

/**
 * Show a message in the tooltip line
 * @param message - text to show, may contain html
 * @param main - pin the message so it is restored after transient tips
 * @param type - defines the tooltip background color
 * @param time - if set, clear the main tip after that many ms
 */
export function tip(
	message: string,
	main = false,
	type: TipType = "info",
	time = 0,
): void {
	const tooltip = getTooltip();
	tooltip.innerHTML = message;
	tooltip.classList.remove(
		"world-engine-tip-info",
		"world-engine-tip-success",
		"world-engine-tip-warn",
		"world-engine-tip-error",
	);
	tooltip.classList.add(TIP_CLASSES[type]);

	if (main) {
		tooltip.dataset.main = message;
		tooltip.dataset.type = type;
	}

	if (time) setTimeout(clearMainTip, time);
}

export function showMainTip(): void {
	const tooltip = getTooltip();
	const type = (tooltip.dataset.type || "info") as TipType;
	tooltip.classList.remove(
		"world-engine-tip-info",
		"world-engine-tip-success",
		"world-engine-tip-warn",
		"world-engine-tip-error",
	);
	tooltip.classList.add(TIP_CLASSES[type]);
	tooltip.innerHTML = tooltip.dataset.main || "";
}

export function clearMainTip(): void {
	const tooltip = getTooltip();
	tooltip.dataset.type = "";
	tooltip.dataset.main = "";
	tooltip.innerHTML = "";
}

/** Show the data-tip of the hovered element, appending its shortcut on desktop */
export function showDataTip(event: Event): void {
	const target = event.target as HTMLElement | null;
	if (!target) return;

	const parent = target.parentNode as HTMLElement | null;
	let dataTip = target.dataset?.tip || parent?.dataset?.tip;
	if (!dataTip) return;

	const shortcut = target.dataset.shortcut;
	if (shortcut && !MOBILE) dataTip += `. Shortcut: ${shortcut}`;

	tip(dataTip);
}

export function showElementLockTip(event: Event): void {
	const locked = (event.target as HTMLElement | null)?.classList?.contains(
		"icon-lock",
	);
	tip(
		locked
			? "Locked. Click to unlock the element and allow it to be changed by regeneration tools"
			: "Unlocked. Click to lock the element and prevent changes to it by regeneration tools",
	);
}

// non-svg containers holding elements with data-tip
const TIP_CONTAINERS = [
	"dialogs",
	"optionsContainer",
	"exitCustomization",
	"tourPromptButton",
];

function initialize(): void {
	const onDataTipMove = debounce(showDataTip, 50);
	for (const id of TIP_CONTAINERS)
		findEl(id)?.addEventListener("mousemove", onDataTipMove);
}

initialize();

export const Tooltips = {
	tip,
	showMainTip,
	clearMainTip,
	showDataTip,
	showElementLockTip,
};

window.tip = tip;
window.clearMainTip = clearMainTip;
window.showDataTip = showDataTip;
window.showElementLockTip = showElementLockTip;
