import { ensureEl } from "@/utils";

export interface WorldEngineConfirmationOptions {
	title?: string;
	message?: string;
	cancel?: string;
	confirm?: string;
	checkboxLabel?: string;
	onCancel?: () => void;
	onConfirm?: () => void;
}

export interface WorldEnginePromptOptions {
	title?: string;
	message: string;
	defaultValue: number | string;
	step?: number;
	min?: number;
	max?: number;
	required?: boolean;
	onConfirm?: (value: number | string) => void;
}

const FEEDBACK_CLASSES = ["world-engine-feedback"];

export function showWorldEngineConfirmation(
	options: WorldEngineConfirmationOptions = {},
): void {
	const {
		title = "Confirm action",
		message = "Are you sure you want to continue?<br />The action cannot be reverted",
		cancel = "Cancel",
		confirm = "Continue",
		checkboxLabel,
		onCancel,
		onConfirm,
	} = options;
	const alert = ensureEl("alert");

	alert.classList.add(...FEEDBACK_CLASSES);
	alert.setAttribute("role", "dialog");
	alert.setAttribute("aria-modal", "true");
	alert.setAttribute("aria-labelledby", "worldEngineFeedbackTitle");
	alert.innerHTML = /* html */ `
		<div class="world-engine-feedback-card">
			<h2 id="worldEngineFeedbackTitle">${title}</h2>
			<div id="alertMessage">${message}</div>
			${checkboxLabel ? `<label class="world-engine-feedback-check"><input id="worldEngineFeedbackCheck" type="checkbox" /><span>${checkboxLabel}</span></label>` : ""}
			<div class="world-engine-feedback-actions">
				<button id="worldEngineFeedbackCancel" type="button">${cancel}</button>
				<button id="worldEngineFeedbackConfirm" type="button">${confirm}</button>
			</div>
		</div>`;
	alert.style.display = "flex";

	function close(callback?: () => void): void {
		callback?.();
		alert.style.display = "none";
		alert.classList.remove(...FEEDBACK_CLASSES);
		alert.removeAttribute("role");
		alert.removeAttribute("aria-modal");
		alert.removeAttribute("aria-labelledby");
		alert.innerHTML = '<p id="alertMessage">Warning!</p>';
		document.removeEventListener("keydown", onKeyDown);
	}

	function onKeyDown(event: KeyboardEvent): void {
		if (event.key === "Escape") close(onCancel);
	}

	alert.querySelector("#worldEngineFeedbackCancel")?.addEventListener(
		"click",
		() => close(onCancel),
		{ once: true },
	);
	alert.querySelector("#worldEngineFeedbackConfirm")?.addEventListener(
		"click",
		() => close(onConfirm),
		{ once: true },
	);
	document.addEventListener("keydown", onKeyDown);
	alert.querySelector<HTMLButtonElement>("#worldEngineFeedbackCancel")?.focus();
}

export function showWorldEnginePrompt(options: WorldEnginePromptOptions): void {
	const prompt = ensureEl("prompt");
	const type = typeof options.defaultValue === "number" ? "number" : "text";
	prompt.classList.add(...FEEDBACK_CLASSES);
	prompt.setAttribute("role", "dialog");
	prompt.setAttribute("aria-modal", "true");
	prompt.setAttribute("aria-labelledby", "worldEnginePromptTitle");
	prompt.innerHTML = /* html */ `
		<div class="world-engine-feedback-card">
			<h2 id="worldEnginePromptTitle">${options.title || "Provide a value"}</h2>
			<div class="world-engine-prompt-message">${options.message}</div>
			<form id="worldEnginePromptForm">
				<input id="worldEnginePromptInput" type="${type}" value="${options.defaultValue}" placeholder="type a ${type}" ${options.step === undefined ? "" : `step="${options.step}"`} ${options.min === undefined ? "" : `min="${options.min}"`} ${options.max === undefined ? "" : `max="${options.max}"`} ${options.required === false ? "" : "required"} />
				<div class="world-engine-feedback-actions">
					<button id="worldEnginePromptCancel" type="button">Cancel</button>
					<button type="submit">Confirm</button>
				</div>
			</form>
		</div>`;
	prompt.style.display = "flex";

	const close = () => {
		prompt.style.display = "none";
		prompt.classList.remove(...FEEDBACK_CLASSES);
		prompt.removeAttribute("role");
		prompt.removeAttribute("aria-modal");
		prompt.removeAttribute("aria-labelledby");
		prompt.innerHTML = '<form id="promptForm"></form>';
		document.removeEventListener("keydown", onKeyDown);
	};
	function onKeyDown(event: KeyboardEvent): void {
		if (event.key === "Escape") close();
	}

	prompt.querySelector("#worldEnginePromptForm")?.addEventListener("submit", (event) => {
		event.preventDefault();
		const input = prompt.querySelector<HTMLInputElement>("#worldEnginePromptInput");
		if (!input) return;
		const value = type === "number" ? Number(input.value) : input.value;
		close();
		options.onConfirm?.(value);
	});
	prompt.querySelector("#worldEnginePromptCancel")?.addEventListener("click", close, {once: true});
	document.addEventListener("keydown", onKeyDown);
	prompt.querySelector<HTMLInputElement>("#worldEnginePromptInput")?.focus();
}