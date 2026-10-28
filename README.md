# Hoppy Coin

A free, experimental browser game built with Phaser 3. Started in 2024 as a place to learn game development and try ideas without commercial pressure.

**Play:** https://hoppy.co.in (availability may vary)

## Philosophy

No ads, paywalls, paid character unlocks, or roadmap promises. Gameplay experiments are welcome; features can be paused or abandoned. AI-assisted contributions are welcome and should be transparent.

## Repositories

- [Game](https://github.com/sudoist/hoppy-coin) — Phaser 3 / browser JavaScript
- [API](https://github.com/sudoist/hoppy-coin-api) — Laravel leaderboard backend
- [API documentation](https://github.com/sudoist/hoppy-coin-api-docs) — Swagger UI / API reference

## Local development

Serve the `public/` directory over HTTP; opening `index.html` directly as a file may prevent assets and configuration from loading.

For example, with Python installed:

```sh
cd public
python3 -m http.server 8000
```

Visit http://localhost:8000. The game uses a checked-in Phaser 3.80.1 browser bundle; no npm build is required for the current game. Some leaderboard functionality requires a running API and `/env.json` configuration (see `public/env-example.json`). **Do not put real secrets in browser-accessible configuration:** any key delivered to the browser is public.

## Current direction

1. Restore and stabilize existing gameplay, navigation, mobile controls, and leaderboard.
2. Experiment with stages and gameplay mechanics.
3. Earn new characters through gameplay achievements, potentially with different abilities.
4. Explore per-character and seasonal leaderboards while retaining all-time records.
5. Try other ideas only when they are fun to build.

This is a direction, not a delivery commitment. See [issues](https://github.com/sudoist/hoppy-coin/issues) for ideas and known problems.

## Contributing

Keep changes focused. Work on a short-lived branch and open a PR against `master`; no permanent `develop` branch is required. Include what changed, what was tested, and what remains uncertain. See [AGENTS.md](AGENTS.md) for contributor and coding-agent guidance.

## Licensing and assets

The existing [LICENSE.md](LICENSE.md) contains the **Phaser project's MIT notice**, credited to Richard Davey / Phaser Studio. It must not be interpreted as an independently verified license grant for all Hoppy Coin source code and assets. The project's own licensing and third-party asset permissions need a separate review before reuse or redistribution. Do not remove upstream notices or assume music, images, or templates are MIT-licensed.

## Credits

Built with [Phaser](https://phaser.io/). Original work also drew on [Phaser examples](https://labs.phaser.io/) and [Enclave Phaser Template](https://github.com/EnclaveGames/Enclave-Phaser-Template). See repository history for additional music, background, and asset sources.
