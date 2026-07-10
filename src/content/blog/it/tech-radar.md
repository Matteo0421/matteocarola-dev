---
title: 'Tech Radar: una pipeline GenAI che lavora per me due volte a settimana'
description:
  'GitHub Actions, zero dipendenze npm e un LLM con output vincolato: come la pagina /radar si
  aggiorna da sola — ma niente viene pubblicato senza la mia approvazione.'
pubDate: 2026-07-10
lang: it
---

La pagina [/radar](/radar) di questo sito pubblica card brevi su novità cloud, AWS e AI. Le card
non le scrivo da zero: le **propone una pipeline** che gira da sola due volte a settimana. Io le
approvo, le scarto o ci aggiungo una nota personale. È il primo dei due progetti GenAI di questo
sito (l'altro è il [chatbot RAG](/blog/chatbot-rag)), e in questo post spiego come è fatto.

## L'idea: umano nel loop, sempre

Il requisito non negoziabile era che **niente si pubblicasse da solo**. Un LLM che scrive
direttamente sul mio sito è un rischio reputazionale; un LLM che apre una Pull Request è un
collaboratore che prepara bozze. La differenza è tutta lì: il merge — cioè la pubblicazione — è
sempre una decisione mia.

## Come funziona

1. **Cron su GitHub Actions** — lunedì e giovedì alle 6:00 UTC parte un workflow che esegue un
   singolo script Node.
2. **Fonti gratuite** — lo script pesca i candidati da AWS What's New (RSS), Hacker News (API
   Algolia) e GitHub Search (repository nuovi in forte crescita). Nessuna API key necessaria per le
   fonti.
3. **Dedup** — i candidati già pubblicati vengono scartati confrontando gli URL normalizzati con le
   card esistenti nel repository.
4. **Selezione e sintesi con Gemini** — il modello riceve la lista numerata dei candidati e sceglie
   le 2-3 novità più interessanti per un pubblico di sviluppatori cloud/AI, scrivendo titolo,
   sintesi e tag in italiano. L'output è **JSON con schema vincolato**.
5. **Pull Request** — lo script scrive i file Markdown delle card e il workflow apre una PR. In
   review posso modificare la sintesi, aggiungere la mia nota (il corpo del file) o eliminare la
   card.
6. **Merge = deploy** — al merge, Vercel pubblica automaticamente.

## Le scelte anti-allucinazione

La parte più delicata di qualsiasi pipeline con un LLM è impedirgli di inventare. Qui le regole
sono strutturali, non affidate alla buona volontà del modello:

- il modello **sceglie da una lista numerata**: non può proporre una notizia che non esiste;
- **URL e fonte non passano mai dal modello**: restano quelli originali del feed;
- la sintesi deve basarsi **solo su titolo e contesto forniti**, e il formato è forzato da un
  `responseSchema` JSON;
- e comunque, alla fine, c'è la review umana della PR.

## Zero dipendenze, zero costi

Lo script usa solo la `fetch` nativa di Node — niente npm install nel workflow, niente supply chain
da mantenere per un cron. GitHub Actions è gratuito sui repository pubblici e Gemini lavora nel
free tier (pochi item a settimana). Costo totale: **zero**.

## Cosa mi ha insegnato

Che il pattern «LLM + struttura rigida + umano nel loop» è quello giusto per automatizzare la
cura dei contenuti: il modello fa il lavoro noioso (leggere decine di feed, sintetizzare), la
struttura gli impedisce di sbagliare in modo pericoloso, e la decisione finale resta a chi ci mette
la faccia. Il codice è
[pubblico su GitHub](https://github.com/Matteo0421/matteocarola-dev), pipeline compresa.
