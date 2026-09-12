<script lang="ts">
  // @ts-check
  import {tooltip} from "scripts/tooltip";

  export let icon: string;
  export let tip: string = undefined;
  export let onclick: () => void;

  const handleClick = (event: Event) => {
    event.stopPropagation();
    onclick();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") handleClick(event);
  };
</script>

<svg role="button" tabindex="0" on:click={handleClick} on:keydown={handleKeydown} data-tooltip={tip} use:tooltip>
  <use href="#{icon}-icon" />
</svg>

<style>
  svg {
    fill: currentColor;
    width: 0.8em;
    height: 0.8em;
    vertical-align: middle;
    cursor: pointer;
  }

  svg:active {
    transform: translateY(1px);
  }
</style>
