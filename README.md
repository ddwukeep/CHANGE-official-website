# CHANGE — Official Website

A responsive, high-performance Web3 infrastructure concept for the CHANGE network. The first release includes a live canvas network globe, simulated metrics and activity feeds, a protocol overview, exchange preview, roadmap, and documentation directory.

> All displayed network, market, and activity data is simulated. Wallet connection and trading are intentionally unavailable.

## Development

```bash
npm install
npm run dev
```

Create a production bundle with `npm run build`. Vite is configured for the `/CHANGE-official-website/` GitHub Pages base path, and pushes to `main` deploy through the Pages workflow.

## Architecture

- `src/data/` contains mock content independent of presentation components.
- `src/services/dataProvider.js` is the current asynchronous data boundary.
- `src/services/apiAdapter.js` is the integration seam for a future API or chain client.
- `public/assets/logo-placeholder.svg` can be replaced by the final CHANGE mark without changing layout code.
