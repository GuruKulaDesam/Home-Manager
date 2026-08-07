import { LoggerWithoutDebug, Wllama } from "../vendor/wllama/esm/index.js";

const LOCAL_MODEL_URL = new URL("../assets/models/home-assistant-smollm2-360m-q8_0.gguf", import.meta.url).href;
const REMOTE_MODEL_URL = "https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct-GGUF/resolve/593b5a2e04c8f3e4ee880263f93e0bd2901ad47f/smollm2-360m-instruct-q8_0.gguf?download=true";
const DEEP_MODEL_URL = "https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct-GGUF/resolve/main/smollm2-1.7b-instruct-q4_k_m.gguf?download=true";
const WASM_URL = new URL("../vendor/wllama/esm/wasm/wllama.wasm", import.meta.url).href;

async function availableModelUrl() {
  try {
    const response = await fetch(LOCAL_MODEL_URL, { method: "HEAD", cache: "no-store" });
    const type = response.headers.get("content-type") || "";
    if (response.ok && !type.includes("text/html")) return LOCAL_MODEL_URL;
  } catch (_) {
    // Published builds may intentionally omit the large artifact. Wllama caches the official fallback after first use.
  }
  return REMOTE_MODEL_URL;
}

const ROLE_INSTRUCTIONS = Object.freeze({
  conversation: "Talk naturally, clarify uncertainty, and summarize succinctly.",
  intent: "Classify the request as budget, health, task, school, conflict, family-goal, operations, governance, or other.",
  memory: "Extract only explicit facts, tasks, preferences, and commitments. Return valid JSON and never invent a value.",
  planner: "Turn the stated goal into safe, realistic household steps, owners, dependencies, and dates.",
  inquiry: "Use calm reflective questions. Do not diagnose, pressure, or claim professional authority.",
  learning: "Teach at the learner's stated level, check understanding, and avoid doing assessed work dishonestly.",
  finance: "Explain classifications and variances. Leave arithmetic and transactions to deterministic application code.",
  routine: "Support routines, medicines, appointments, and habits without diagnosis or medication changes.",
  operations: "Organize maintenance, inventory, repairs, and recurring supplies into actionable records.",
  governance: "Help summarize decisions, agreements, responsibilities, consent, and unresolved questions.",
  safety: "Protect privacy and age boundaries. For urgent danger, advise contacting local emergency services and a trusted person.",
  knowledge: "Answer only from context supplied by the application. Say when the context does not contain the answer."
});

let engine;
let loading;
let deepEngine;
let deepLoading;

function emitStatus(detail) {
  window.dispatchEvent(new CustomEvent("home-ai-status", { detail }));
}

async function load() {
  if (engine?.isModelLoaded()) return engine;
  if (loading) return loading;
  loading = (async () => {
    if (deepEngine) await deepEngine.exit();
    deepEngine = undefined;
    deepLoading = undefined;
    emitStatus({ state: "loading", progress: 0 });
    const instance = new Wllama({ default: WASM_URL }, { logger: LoggerWithoutDebug });
    const modelUrl = await availableModelUrl();
    await instance.loadModelFromUrl(modelUrl, {
      useCache: true,
      n_ctx: 2048,
      n_threads: 1,
      progressCallback: ({ loaded, total }) => emitStatus({
        state: "loading",
        progress: total ? Math.round((loaded / total) * 100) : 0
      })
    });
    engine = instance;
    emitStatus({ state: "ready", progress: 100 });
    return engine;
  })().catch((error) => {
    loading = undefined;
    emitStatus({ state: "error", message: error.message });
    throw error;
  });
  return loading;
}

async function loadDeep() {
  if (deepEngine?.isModelLoaded()) return deepEngine;
  if (deepLoading) return deepLoading;
  deepLoading = (async () => {
    if (engine) await engine.exit();
    engine = undefined;
    loading = undefined;
    emitStatus({ state: "loading", progress: 0, model: "deep" });
    const instance = new Wllama({ default: WASM_URL }, { logger: LoggerWithoutDebug });
    await instance.loadModelFromUrl(DEEP_MODEL_URL, {
      useCache: true,
      n_ctx: 3072,
      n_threads: 1,
      progressCallback: ({ loaded, total }) => emitStatus({ state: "loading", progress: total ? Math.round((loaded / total) * 100) : 0, model: "deep" })
    });
    deepEngine = instance;
    emitStatus({ state: "ready", progress: 100, model: "deep" });
    return deepEngine;
  })().catch(error => {
    deepLoading = undefined;
    emitStatus({ state: "error", message: error.message, model: "deep" });
    throw error;
  });
  return deepLoading;
}

async function ask({ message, role = "conversation", context = "", maxTokens = 256 }) {
  if (!message?.trim()) throw new TypeError("A non-empty message is required.");
  const model = await load();
  const instruction = ROLE_INSTRUCTIONS[role] || ROLE_INSTRUCTIONS.conversation;
  const householdContext = context
    ? `\nUse only this household context when relevant:\n${context}`
    : "";
  const response = await model.createChatCompletion({
    messages: [
      {
        role: "system",
        content: `You are Home Manager's private offline assistant. ${instruction}${householdContext}`
      },
      { role: "user", content: message.trim() }
    ],
    max_tokens: Math.min(Math.max(maxTokens, 32), 512),
    temperature: role === "memory" || role === "intent" ? 0.1 : 0.4,
    top_p: 0.9
  });
  return response.choices?.[0]?.message?.content?.trim() || "";
}

async function askDeep({ message, context = "", maxTokens = 640 }) {
  if (!message?.trim()) throw new TypeError("A non-empty message is required.");
  const model = await loadDeep();
  const suppliedContext = context ? `\nUse this exact chapter context and do not drift to another topic:\n${context}` : "";
  const response = await model.createChatCompletion({
    messages: [
      { role: "system", content: `You are Home Manager's private deep-learning tutor. Build explanations from prerequisites, use concrete worked examples, check conditions, and never invent a fact when the supplied chapter context is insufficient.${suppliedContext}` },
      { role: "user", content: message.trim() }
    ],
    max_tokens: Math.min(Math.max(maxTokens, 64), 768),
    temperature: 0.3,
    top_p: 0.9
  });
  return response.choices?.[0]?.message?.content?.trim() || "";
}

async function unload() {
  if (engine) await engine.exit();
  if (deepEngine) await deepEngine.exit();
  engine = undefined;
  loading = undefined;
  deepEngine = undefined;
  deepLoading = undefined;
  emitStatus({ state: "idle", progress: 0 });
}

window.HomeAI = Object.freeze({
  ask,
  askDeep,
  load,
  unload,
  roles: Object.keys(ROLE_INSTRUCTIONS),
  modelUrl: LOCAL_MODEL_URL,
  fallbackModelUrl: REMOTE_MODEL_URL,
  deepModelUrl: DEEP_MODEL_URL
});

emitStatus({ state: "idle", progress: 0 });
