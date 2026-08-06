import { LoggerWithoutDebug, Wllama } from "../vendor/wllama/esm/index.js";

const MODEL_URL = "/assets/models/home-assistant-smollm2-360m-q8_0.gguf";
const WASM_URL = "/vendor/wllama/esm/wasm/wllama.wasm";

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

function emitStatus(detail) {
  window.dispatchEvent(new CustomEvent("home-ai-status", { detail }));
}

async function load() {
  if (engine?.isModelLoaded()) return engine;
  if (loading) return loading;
  loading = (async () => {
    emitStatus({ state: "loading", progress: 0 });
    const instance = new Wllama({ default: WASM_URL }, { logger: LoggerWithoutDebug });
    await instance.loadModelFromUrl(MODEL_URL, {
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

async function unload() {
  if (engine) await engine.exit();
  engine = undefined;
  loading = undefined;
  emitStatus({ state: "idle", progress: 0 });
}

window.HomeAI = Object.freeze({
  ask,
  load,
  unload,
  roles: Object.keys(ROLE_INSTRUCTIONS),
  modelUrl: MODEL_URL
});

emitStatus({ state: "idle", progress: 0 });
