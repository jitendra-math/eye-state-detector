// src/lib/vision/eyeDetection.js

const LEFT_EYE = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE = [362, 385, 387, 263, 373, 380];

const EAR_THRESHOLD = 0.23;
const BLINK_FRAMES = 2;

let frameCounter = 0;
let blinkCount = 0;
let eyeClosedStart = null;

/**
 * Distance between two landmarks
 */
function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate Eye Aspect Ratio
 */
function calculateEAR(landmarks, eye) {
  const p1 = landmarks[eye[0]];
  const p2 = landmarks[eye[1]];
  const p3 = landmarks[eye[2]];
  const p4 = landmarks[eye[3]];
  const p5 = landmarks[eye[4]];
  const p6 = landmarks[eye[5]];

  const vertical1 = distance(p2, p6);
  const vertical2 = distance(p3, p5);
  const horizontal = distance(p1, p4);

  return (vertical1 + vertical2) / (2.0 * horizontal);
}

/**
 * Detect eye state from landmarks
 */
export function detectEyeState(landmarks) {
  const leftEAR = calculateEAR(landmarks, LEFT_EYE);
  const rightEAR = calculateEAR(landmarks, RIGHT_EYE);

  const ear = (leftEAR + rightEAR) / 2;

  let state = "open";
  let closedDuration = 0;

  if (ear < EAR_THRESHOLD) {
    frameCounter++;

    if (!eyeClosedStart) {
      eyeClosedStart = Date.now();
    }

    state = "closed";
  } else {
    if (frameCounter >= BLINK_FRAMES) {
      blinkCount++;
    }

    frameCounter = 0;
    eyeClosedStart = null;
    state = "open";
  }

  if (eyeClosedStart) {
    closedDuration = (Date.now() - eyeClosedStart) / 1000;
  }

  return {
    state,
    ear,
    blinkCount,
    closedDuration
  };
}