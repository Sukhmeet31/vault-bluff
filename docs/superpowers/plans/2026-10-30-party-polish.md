# Party polish

Implement the requested lighter UI, automatic three-point room welcome, an animated Oracle with phase-aware comments and optional browser speech, distinct synthesized action and phase effects, and a larger animated selected portrait beside the gallery. Keep existing scoring, room capacity and shared game state unchanged. Use the existing portraits; animation is floating/pulsing, not generated facial animation. Honor reduced-motion preferences. Audio starts only after a player gesture and can be muted.

Verification: TypeScript check, 14 existing multiplayer/scoring tests, production build, desktop and 390px phone browser review. Checked selected portrait update, automatic welcome, sound checkbox, dismissal and Oracle display. Browser speech depends on device voices; audible output was not independently recorded. All changes committed without co-author trailers.
