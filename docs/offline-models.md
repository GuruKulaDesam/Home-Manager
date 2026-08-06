# Offline household models

The downloadable model weights live under `private-data/models/`. That directory is intentionally excluded from Git and Firebase deployment because the files are large and household inference must remain local.

Run `powershell -ExecutionPolicy Bypass -File scripts/install-offline-models.ps1` to install or resume downloading the four upstream bases. The installation includes:

- SmolLM2 360M Instruct Q8 GGUF for conversation and compact household workflows.
- SmolLM2 1.7B Instruct Q4 ONNX for planning and learning workflows.
- Qwen3 Embedding 0.6B Safetensors for retrieval and memory matching.
- Qwen3 0.6B Q8 GGUF as the optional compact general model.

These are upstream base models, not household-trained DLMs. `private-data/models/manifest.json` maps the proposed household roles to shared bases without copying weights. Finance and safety calculations or hard boundaries must remain deterministic code/rules; model output is never authoritative for diagnosis, emergencies, medication changes, or financial transactions.

Home Manager now vendors wllama 3.5.1 and serves the compact GGUF from `assets/models/`. `js/offline-ai.js` exposes a lazy `window.HomeAI` browser service. Its first use downloads the 386 MB model from the same Firebase origin and stores it in the runtime's browser cache; subsequent use can run offline. Nothing opens a local port and household prompts are not sent to an inference server.

Example:

```js
const answer = await window.HomeAI.ask({
  role: "planner",
  message: "Turn our stated goal into a weekly plan.",
  context: "Only include household data the user explicitly consented to share."
});
```

Listen for `home-ai-status` events to display the model download/loading progress. Model loading is deliberately lazy so visiting Home Manager does not automatically consume hundreds of megabytes. The current browser runtime requires WebAssembly Memory64 support and therefore does not support Safari. It uses one CPU thread to preserve compatibility with the app's Google cross-origin integrations; supported browsers may also use WebGPU through wllama.

This workspace includes a private portable Node.js runtime for Firebase tooling. Deploy from PowerShell with `scripts/firebase-local.ps1`. The hosted model is Git-ignored but deliberately not excluded by `firebase.json`, so deployments from this prepared workspace include it. Do not deploy from a clean checkout until `scripts/install-offline-models.ps1` has recreated the hosted model hardlink.
