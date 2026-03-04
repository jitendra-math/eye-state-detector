<!-- src/routes/+page.svelte -->

<script>
import CameraView from "$lib/components/CameraView.svelte";
import StatusPanel from "$lib/components/StatusPanel.svelte";

import "../styles/global.css";
</script>

<main class="app">

  <div class="card">
    <h1 style="margin-bottom:14px;font-size:20px;">
      EyeGuardian 👁️
    </h1>

    <CameraView />

    <StatusPanel />
  </div>

</main>