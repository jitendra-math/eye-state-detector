// src/lib/stores/eyeStore.js

import { writable } from "svelte/store";

export const eyeStore = writable({
  state: "open",
  ear: 0,
  blinkCount: 0,
  closedDuration: 0
});

/**
 * Update eye state data
 */
export function updateEyeState(data) {
  eyeStore.update((store) => ({
    ...store,
    ...data
  }));
}

/**
 * Reset eye tracking data
 */
export function resetEyeState() {
  eyeStore.set({
    state: "open",
    ear: 0,
    blinkCount: 0,
    closedDuration: 0
  });
}