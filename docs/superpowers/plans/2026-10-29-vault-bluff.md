# Vault Bluff Implementation Plan

> Use superpowers:executing-plans to implement task by task.

Goal: Deliver the approved six-round multiplayer game on phones.
Architecture: React/Vinext client and authoritative server state stored in D1. Conditional revision updates serialize room mutations. Clients poll every second; deadlines are server-enforced on every request. No private opponent state reaches clients before reveal.
Spec: Approved rules in this conversation, captured below.

## Constraints
2–8 players; six rounds; uniform 1–6 gems; 20-second claims; 15-second judgments; truthful default claim and Trust default judgment; claim locks; one judge per claim; rotating assignments; trusted claim earns claim; challenged truth earns claim+2; caught lie earns judge 3; host advances; shared ties; reconnect and host migration.

## Tasks
- [ ] 1. Create lib/game.ts and tests/game.test.mjs. Test all scoring branches, example 8/6/0, deadlines, privacy, assignment bijections for 2–8, host authorization, capacity, final ties, replay protection. Run node --experimental-strip-types --test tests/*.test.mjs, observe failures then implement.
- [ ] 2. Add db/schema.ts rooms table with JSON state and revision. Add app/api/game/route.ts using conditional revision updates and opaque player tokens. Generate migration and test real concurrent requests, joining, private state and reconnect via local HTTP.
- [ ] 3. Build app/page.tsx, globals.css and custom SVG graphics. Phone-first lobby, claim, judge, reveal, winner; accessible tap targets, reduced motion, rules and sound toggle. Browser-check phone and desktop flows.
- [ ] 4. Build and review, repair demonstrated failures, package source, deploy public, return verified URL.

## Review focus
Concurrent joins/actions cannot overwrite state. Expired phase requests cannot mutate subsequent phases. Wrong tokens cannot see vaults. Duplicate decisions cannot rescore. Network drops preserve identity and transfer host after 15 seconds.

## Ledger
Fresh isolated project directory; no existing repository to disrupt. Polling selected for reliable D1-hosted synchronization without unsupported durable-object bindings. All rounds progress on reads as well as writes. Public access explicitly approved by user.

Verification: 11 tests passing, including concurrent eight-player six-round HTTP match; TypeScript passes; phone browser claim/judge/reveal verified, no console errors. Reviewer findings on lost joins and pending action after leave repaired. Final packaging and deployment in progress.
