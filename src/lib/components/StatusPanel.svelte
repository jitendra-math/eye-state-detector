<!-- src/lib/components/StatusPanel.svelte -->

<script>
import { eyeStore } from "$lib/stores/eyeStore";

$: eye = $eyeStore;

$: isClosedLong = eye.closedDuration > 2;
</script>

<div class="status-panel card">

  <div class="status-row">
    <span>Eyes</span>
    <span class={eye.state === "open" ? "status-open" : "status-closed"}>
      {eye.state === "open" ? "OPEN 👁️" : "CLOSED 😴"}
    </span>
  </div>

  <div class="status-row">
    <span>Blinks</span>
    <span class="blink-count">
      {eye.blinkCount}
    </span>
  </div>

  <div class="status-row">
    <span>Closed Duration</span>
    <span>
      {eye.closedDuration.toFixed(2)}s
    </span>
  </div>

  {#if isClosedLong}
    <div class="warning">
      ⚠ Drowsiness detected
    </div>
  {/if}

</div>