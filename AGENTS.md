# Hoppy Coin — Agent Guidance

This is a free, public, experimental Phaser browser game. Optimize for idea → playable result with little friction. No monetization, ads, paywalls, or paid unlocks.

- Default branch: `master`. Create short-lived branches and PRs; never commit directly to `master` or merge a release PR without owner approval.
- Do not create a permanent `develop` branch or introduce staging/release infrastructure without a clear need.
- Keep PRs small and bounded. Prefer simple browser JavaScript and the existing Phaser version; do not add a bundler or upgrade dependencies just for novelty.
- Preserve gameplay behavior unless the task asks for a change. Check scene transitions, restart state, desktop controls, and mobile/touch behavior when relevant.
- Treat client-side configuration as public. Never commit credentials or claim browser-exposed API keys are secret.
- Score submission and leaderboard integrity are security-sensitive: flag abuse risks, input validation, and API compatibility before making changes.
- Do not invent asset licensing. Retain Phaser and third-party notices; licensing of Hoppy Coin's original code remains to be clarified by its owner.
- Report what you tested and what you could not test. Do not claim browser or API tests passed without running them.
- Do not change repository visibility, ownership, production settings, or deployment without explicit approval.
- No destructive git operations. Avoid more than three PRs awaiting owner review.
