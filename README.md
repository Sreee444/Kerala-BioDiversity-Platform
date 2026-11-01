# Kerala Biodiversity Platform

A React application to explore species data relevant to Kerala using public biodiversity APIs and simple client-side features (search, image-based identification, favorites, comparison, and random discovery).

## What this project currently is

- Frontend-only React app (no backend service)
- Uses external APIs at runtime
- Stores user-specific data in browser LocalStorage
- Focused on learning/demo UX rather than production-grade biodiversity analytics

## Core Features

- Text search for species (via iNaturalist API)
- Image-driven plant identification (via PlantNet API)
- Species detail view
- Favorites page (LocalStorage-backed)
- Compare up to 3 species
- Gallery view from discovered species
- Random discovery with local history

## Tech Stack

- React 17
- React Router DOM v5
- Plain CSS + inline styles
- Browser `fetch` API
- LocalStorage for persistence

## Project Structure

```text
src/
  api/
    plantnet.js          # PlantNet integration
    trefle.js            # iNaturalist search integration (legacy filename)
  components/
    Footer.js
    Header.js
    ImageSearch.js
    PlantCard.js
    PlantList.js
    SearchBar.js
  pages/
    About.js
    Compare.js
    Favorites.js
    Gallery.js
    Home.js
    NotFound.js
    RandomDiscovery.js
    SpeciesDetails.js
  styles/
    main.css
```

## Prerequisites

- Node.js 16+ (Node 18 recommended)
- npm

## Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
REACT_APP_PLANTNET_API_KEY=your_plantnet_api_key_here
```

Without this key, image identification will not work.

## Getting Started

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## Build for Production

```bash
npm run build
```

This creates optimized static files in `build/`.

## Interview Documentation

For architecture decisions, "why this instead of that", trade-offs, coding style, and future roadmap, read:

- [INTERVIEW_GUIDE.md](./docs/INTERVIEW_GUIDE.md)

## Known Limitations

- No backend; API keys are exposed to client at runtime
- No authentication/user accounts
- No server-side caching or API rate-limit handling
- Heavy inline styling can be harder to maintain at scale

## License

MIT
