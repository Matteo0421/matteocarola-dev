---
title: 'Tech Radar: a GenAI pipeline that works for me twice a week'
description:
  'GitHub Actions, zero npm dependencies and an LLM with constrained output: how the /radar page
  updates itself — but nothing gets published without my approval.'
pubDate: 2026-07-10
lang: en
---

The [/radar](/en/radar) page of this site publishes short cards about cloud, AWS and AI news. I
don't write the cards from scratch: they're **proposed by a pipeline** that runs on its own twice a
week. I approve them, discard them or add a personal note. It's the first of this site's two GenAI
projects (the other is the [RAG chatbot](/en/blog/chatbot-rag)), and this post explains how it's
built.

## The idea: human in the loop, always

The non-negotiable requirement was that **nothing publishes itself**. An LLM writing directly to my
site is a reputational risk; an LLM opening a Pull Request is a collaborator preparing drafts. The
whole difference lies there: the merge — i.e. the publication — is always my decision.

## How it works

1. **Cron on GitHub Actions** — Monday and Thursday at 6:00 UTC a workflow runs a single Node
   script.
2. **Free sources** — the script pulls candidates from AWS What's New (RSS), Hacker News (Algolia
   API) and GitHub Search (fast-growing new repositories). No API keys needed for the sources.
3. **Dedup** — already-published candidates are discarded by comparing normalized URLs against the
   existing cards in the repository.
4. **Selection and summarization with Gemini** — the model receives a numbered list of candidates
   and picks the 2-3 most interesting items for a cloud/AI developer audience, writing title,
   summary and tags. The output is **schema-constrained JSON**.
5. **Pull Request** — the script writes the cards as Markdown files and the workflow opens a PR. In
   review I can edit the summary, add my note (the file body) or delete a card.
6. **Merge = deploy** — on merge, Vercel publishes automatically.

## The anti-hallucination choices

The most delicate part of any LLM pipeline is preventing it from making things up. Here the rules
are structural, not entrusted to the model's good will:

- the model **picks from a numbered list**: it can't propose news that doesn't exist;
- **URLs and sources never pass through the model**: they stay exactly as they came from the feed;
- the summary must be based **only on the provided title and context**, and the format is enforced
  by a JSON `responseSchema`;
- and in any case, at the end, there's the human review of the PR.

## Zero dependencies, zero costs

The script uses only Node's native `fetch` — no npm install in the workflow, no supply chain to
maintain for a cron job. GitHub Actions is free on public repositories and Gemini runs within the
free tier (a few items per week). Total cost: **zero**.

## What it taught me

That the "LLM + rigid structure + human in the loop" pattern is the right one for automating
content curation: the model does the boring work (reading dozens of feeds, summarizing), the
structure prevents it from failing dangerously, and the final decision stays with the person whose
name is on it. The code is
[public on GitHub](https://github.com/Matteo0421/matteocarola-dev), pipeline included.
