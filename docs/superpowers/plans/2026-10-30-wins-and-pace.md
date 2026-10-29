# Wins, pace and portrait personality

Requested changes: count overall wins, remove the duplicate portrait name, improve the character motion and voice, and shorten both decision phases to ten seconds.

Win totals belong to the existing player seat within a room and survive rematches and reconnects. Every tied champion gets one win. Award only when round six transitions to finished; concurrent requests are protected by the existing room revision transaction. Older player records default to zero. New rooms start at zero.

Both authoritative phase deadlines and the visual countdown now use ten seconds. The three-point popup states both limits and explains win totals.

Portrait names appear only under the enlarged preview. Add breathing zoom, light sweep, orbit/sparks, selection entrance and pointer-responsive tilt, respecting reduced motion. Images remain illustrated portraits, not facial animation.

Oracle lines are shorter and conversational, once per phase rather than repeating. Prefer installed English natural/neural/enhanced voices, preserve natural pitch, and animate speech only when audio begins. Device voice quality remains a limitation; no external speech service or credentials are introduced.

Validation: 16 tests pass, including exact timeout boundaries, ties, repeat syncs, rematch retention, legacy defaults and a simultaneous eight-player six-round HTTP match. TypeScript passes. Browser checked ten-second rules, win display and single portrait name. Audible voice quality was not independently assessed.
