/**
 * Logica del widget "Chiedi a Matteo" (caricata lazy alla prima apertura).
 *
 * Stateless lato server: la history (ultimi turni) vive qui in memoria e
 * viene rimandata a ogni richiesta. I messaggi sono renderizzati clonando
 * i <template> del componente e riempiti via textContent (mai innerHTML).
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

const HISTORY_MAX_TURNS = 6;

const widget = document.getElementById('chat-widget')!;
const panel = document.getElementById('chat-panel')!;
const launcher = document.getElementById('chat-launcher')!;
const closeButton = document.getElementById('chat-close')!;
const messages = document.getElementById('chat-messages')!;
const form = document.getElementById('chat-form') as HTMLFormElement;
const input = document.getElementById('chat-input') as HTMLInputElement;
const sendButton = document.getElementById('chat-send') as HTMLButtonElement;
const iconOpen = document.getElementById('chat-icon-open')!;
const iconClose = document.getElementById('chat-icon-close')!;

const strings: ChatStrings = JSON.parse(widget.dataset.strings ?? '{}');
const history: HistoryTurn[] = [];
let pending = false;

function cloneBubble(templateId: string, text: string): HTMLElement {
  const template = document.getElementById(templateId) as HTMLTemplateElement;
  const bubble = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
  bubble.textContent = text;
  return bubble;
}

function appendBubble(templateId: string, text: string): HTMLElement {
  const bubble = cloneBubble(templateId, text);
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
  return bubble;
}

function isOpen(): boolean {
  return !panel.hidden;
}

function open() {
  panel.hidden = false;
  launcher.setAttribute('aria-expanded', 'true');
  iconOpen.classList.add('hidden');
  iconClose.classList.remove('hidden');
  input.focus();
}

function close() {
  panel.hidden = true;
  launcher.setAttribute('aria-expanded', 'false');
  iconOpen.classList.remove('hidden');
  iconClose.classList.add('hidden');
  launcher.focus();
}

export function toggleChat() {
  if (isOpen()) {
    close();
  } else {
    open();
  }
}

async function send(message: string) {
  pending = true;
  input.disabled = true;
  sendButton.disabled = true;
  appendBubble('chat-tpl-user', message);
  const thinking = appendBubble('chat-tpl-thinking', strings.thinking);

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
    appendBubble('chat-tpl-bot', reply);
    history.push({ role: 'user', text: message }, { role: 'model', text: reply });
    if (history.length > HISTORY_MAX_TURNS) history.splice(0, history.length - HISTORY_MAX_TURNS);
  } else {
    appendBubble('chat-tpl-bot', errorText);
  }
  pending = false;
  input.disabled = false;
  sendButton.disabled = false;
  input.focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message || pending) return;
  input.value = '';
  void send(message);
});

closeButton.addEventListener('click', close);

panel.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') close();
});
