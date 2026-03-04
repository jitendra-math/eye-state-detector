<!-- src/lib/components/CameraView.svelte -->

<script>
import { onMount, onDestroy } from "svelte";
import { initFaceMesh } from "$lib/vision/faceMesh";
import { detectEyeState } from "$lib/vision/eyeDetection";
import { updateEyeState } from "$lib/stores/eyeStore";

let video;
let canvas;
let ctx;

let cameraInstance;

/**
 * Draw face landmarks
 */
function drawLandmarks(landmarks) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#6ee7ff";

  for (const point of landmarks) {
    const x = point.x * canvas.width;
    const y = point.y * canvas.height;

    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
    ctx.fill();
  }
}

/**
 * FaceMesh results callback
 */
function handleResults(results) {
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
    return;
  }

  const landmarks = results.multiFaceLandmarks[0];

  drawLandmarks(landmarks);

  const eyeData = detectEyeState(landmarks);

  updateEyeState(eyeData);
}

onMount(() => {
  ctx = canvas.getContext("2d");

  cameraInstance = initFaceMesh(video, handleResults);
});

onDestroy(() => {
  if (cameraInstance?.camera) {
    cameraInstance.camera.stop();
  }
});
</script>

<div class="camera-wrapper">
  <video
    bind:this={video}
    autoplay
    playsinline
    muted
  ></video>

  <canvas bind:this={canvas} width="640" height="480"></canvas>
</div>