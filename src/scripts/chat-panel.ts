/**
 * Logica del widget "Chiedi a Matteo" (caricata lazy alla prima apertura).
 *
 * Stateless lato server: la history (ultimi turni) vive qui in memoria e
 * viene rimandata a ogni richiesta. I messaggi sono renderizzati clonando
 * i <template> del componente e riempiti via textContent (mai innerHTML).
 *
 * Gli elementi del widget vengono ri-interrogati ad ogni uso (mai tenuti in
 * variabili di modulo): con le view transitions il DOM viene ricreato ad ogni
 * navigazione, mentre questo modulo — e quindi history e stato — sopravvive.
 */

interface HistoryTurn {
  role: 'user' | 'model';
  text: string;
}

interface ChatStrings {
  thinking: string;
  errorGeneric: string;
  errorRateLimited: string;
  errorQuota: string;
}

interface ChatElements {
  widget: HTMLElement;
  panel: HTMLElement;
  launcher: HTMLElement;
  messages: HTMLElement;
  form: HTMLFormElement;
  input: HTMLInputElement;
  sendButton: HTMLButtonElement;
  iconOpen: HTMLElement;
  iconClose: HTMLElement;
}

const HISTORY_MAX_TURNS = 6;

const history: HistoryTurn[] = [];
let pending = false;

function getElements(): ChatElements | null {
  const widget = document.getElementById('chat-widget');
  const panel = document.getElementById('chat-panel');
  const launcher = document.getElementById('chat-launcher');
  const messages = document.getElementById('chat-messages');
  const form = document.getElementById('chat-form') as HTMLFormElement | null;
  const input = document.getElementById('chat-input') as HTMLInputElement | null;
  const sendButton = document.getElementById('chat-send') as HTMLButtonElement | null;
  const iconOpen = document.getElementById('chat-icon-open');
  const iconClose = document.getElementById('chat-icon-close');
  if (
    !widget ||
    !panel ||
    !launcher ||
    !messages ||
    !form ||
    !input ||
    !sendButton ||
    !iconOpen ||
    !iconClose
  ) {
    return null;
  }
  return { widget, panel, launcher, messages, form, input, sendButton, iconOpen, iconClose };
}

// Le stringhe arrivano server-side da ui.ts e sono sempre presenti; il
// try/catch è solo difensivo (dataset assente/corrotto) per non mostrare
// mai "undefined" in una bolla.
function parseStrings(widget: HTMLElement): ChatStrings {
  const fallback: ChatStrings = {
    thinking: '…',
    errorGeneric: 'Errore. Riprova tra poco.',
    errorRateLimited: 'Troppe richieste: aspetta un momento e riprova.',
    errorQuota: 'Servizio non disponibile al momento. Riprova più tardi.',
  };
  try {
    return { ...fallback, ...JSON.parse(widget.dataset.strings ?? '{}') };
  } catch {
    return fallback;
  }
}

function cloneBubble(templateId: string, text: string): HTMLElement {
  const template = document.getElementById(templateId) as HTMLTemplateElement;
  const bubble = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
  bubble.textContent = text;
  return bubble;
}

function appendBubble(els: ChatElements, templateId: string, text: string): HTMLElement {
  const bubble = cloneBubble(templateId, text);
  els.messages.appendChild(bubble);
  els.messages.scrollTop = els.messages.scrollHeight;
  return bubble;
}

function isOpen(els: ChatElements): boolean {
  return !els.panel.hidden;
}

function open(els: ChatElements) {
  els.panel.hidden = false;
  els.launcher.setAttribute('aria-expanded', 'true');
  els.iconOpen.classList.add('hidden');
  els.iconClose.classList.remove('hidden');
  els.input.focus();
}

function close(els: ChatElements) {
  els.panel.hidden = true;
  els.launcher.setAttribute('aria-expanded', 'false');
  els.iconOpen.classList.remove('hidden');
  els.iconClose.classList.add('hidden');
  els.launcher.focus();
}

/** Aggancia gli eventi del pannello, una sola volta per istanza del DOM. */
function ensureBound(els: ChatElements) {
  if (els.panel.dataset.bound) return;
  els.panel.dataset.bound = 'true';

  els.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = els.input.value.trim();
    if (!message || pending) return;
    els.input.value = '';
    void send(els, message);
  });

  document.getElementById('chat-close')?.addEventListener('click', () => close(els));

  els.panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close(els);
  });
}

async function send(els: ChatElements, message: string) {
  const strings = parseStrings(els.widget);
  pending = true;
  els.input.disabled = true;
  els.sendButton.disabled = true;
  appendBubble(els, 'chat-tpl-user', message);
  const thinking = appendBubble(els, 'chat-tpl-thinking', strings.thinking);

  let reply: string | null = null;
  let errorText = strings.errorGeneric;
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message, history: history.slice(-HISTORY_MAX_TURNS) }),
    });
    const data: { reply?: string; error?: string } = await response.json().catch(() => ({}));
    if (response.ok && data.reply) {
      reply = data.reply;
    } else if (response.status === 429) {
      errorText = data.error === 'quota' ? strings.errorQuota : strings.errorRateLimited;
    }
  } catch {
    /* rete assente o timeout: resta l'errore generico */
  }

  thinking.remove();
  if (reply !== null) {
    appendBubble(els, 'chat-tpl-bot', reply);
    history.push({ role: 'user', text: message }, { role: 'model', text: reply });
    if (history.length > HISTORY_MAX_TURNS) history.splice(0, history.length - HISTORY_MAX_TURNS);
  } else {
    appendBubble(els, 'chat-tpl-bot', errorText);
  }
  pending = false;
  els.input.disabled = false;
  els.sendButton.disabled = false;
  els.input.focus();
}

export function toggleChat() {
  const els = getElements();
  if (!els) return;
  ensureBound(els);
  if (isOpen(els)) {
    close(els);
  } else {
    open(els);
  }
}

export function openChat() {
  const els = getElements();
  if (!els) return;
  ensureBound(els);
  if (!isOpen(els)) open(els);
}

/** Apre il pannello e invia subito una domanda (usato dall'assistente in hero). */
export function openWithQuestion(question: string) {
  const els = getElements();
  if (!els) return;
  ensureBound(els);
  if (!isOpen(els)) open(els);
  const message = question.trim().slice(0, 500);
  if (!message || pending) return;
  void send(els, message);
}
