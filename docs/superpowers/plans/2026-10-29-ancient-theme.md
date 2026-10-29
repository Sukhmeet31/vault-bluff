# Ancient Vault Bluff refresh

User-approved direction: ancient atmosphere, purple gems, custom player nicknames and selectable picture avatars. Preserve all game rules. Commit each logical change without co-author trailers.

- Add a validated integer portrait choice (0–11) to room player records and public player views. Existing rooms default to portrait 0. Keep nickname validation.
- Add 12 original illustrated portraits to create/join forms, persist the last selection locally, and display the selected portrait in lobby, judging, reveals and leaderboard.
- Replace modern vault illustration with ancient treasury artwork, purple amethyst gems, aged gold, stone panels and classical display typography. Keep mobile targets and reduced motion support.
- Verify avatar persistence and validation, scoring regression tests, HTTP create/join/sync, type checks, production build, and phone browser appearance. Commit feature and theme separately, push and deploy to the existing public Site.
