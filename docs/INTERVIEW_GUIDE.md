# Kerala Biodiversity Platform - Interview Guide

Use this document to explain the project clearly in interviews.

## 1) Project Goal

The goal is to make biodiversity discovery easier for non-experts by combining:

- search-based exploration,
- image-based identification,
- and lightweight personal organization (favorites/history).

It is intentionally a frontend-first educational product.

---

## 2) Architecture at a Glance

- **Client:** React SPA
- **Routing:** React Router v5
- **Data Sources:**
  - iNaturalist API (species search/discovery)
  - PlantNet API (image-based plant identification)
  - Wikipedia summaries as fallback (inside current data layer)
- **Persistence:** Browser LocalStorage for user state
- **Styling:** Main CSS file + inline component styles

There is no backend in the current version.

---

## 3) Why These Choices (and Why Not Alternatives)

### React (vs server-rendered stack)

**Why used:**
- Fast to build interactive UI with component model.
- Good ecosystem for prototypes and demo projects.
- Easy state-driven rendering for cards, filters, favorites.

**Why not backend-rendered pages:**
- This app relies on highly interactive filtering and local state.
- For portfolio speed, a full backend + SSR was unnecessary initially.

### React Router v5 (vs v6)

**Why used:**
- Stable and simple for current route needs.
- Existing codebase already implemented with `Switch` and `component`.

**Trade-off:**
- v6 is now the modern standard and should be a future migration target.

### iNaturalist API (vs building/maintaining custom species DB)

**Why used:**
- Rich biodiversity dataset and observation counts out of the box.
- Removes need for initial database creation and maintenance.
- Good fit for discovery and quick search experiences.

**Trade-off:**
- Dependent on external availability/rate limits.
- Query semantics are constrained by third-party API behavior.

### PlantNet API (vs custom ML model)

**Why used:**
- Gives practical image identification without training/deploying ML.
- Strongly reduces project complexity for a solo portfolio app.

**Trade-off:**
- Needs API key and network availability.
- Model behavior is not directly controllable.

### LocalStorage (vs database/auth)

**Why used:**
- Zero backend requirement for favorites and history.
- Works immediately in browser for demo purposes.

**Trade-off:**
- Data is per-browser and not synced across devices.
- Not suitable for multi-user production requirements.

### CSS + inline styles (vs design system / CSS-in-JS)

**Why used:**
- Fast iteration while building UI-heavy screens.
- No additional styling dependency required.

**Trade-off:**
- Style reuse/theming is harder.
- Some pages have style duplication and should be refactored.

---

## 4) Code Style & Engineering Decisions

### Practical style used
- Functional React components + hooks
- Small API utility modules under `src/api/`
- Page-level composition in `src/pages/`
- Browser-native APIs (`fetch`, LocalStorage)

### What was cleaned recently
- Removed duplicated seasonal info block in species details.
- Removed dead PlantNet helper that was not used.
- Replaced broken placeholder image URLs with valid fallback image URL.
- Added environment-variable-based API key configuration.
- Corrected malformed quick-search labels.

---

## 5) Build / Run / Deploy

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env:
   ```bash
   # Windows (PowerShell)
   Copy-Item .env.example .env
   # macOS/Linux
   cp .env.example .env
   ```
3. Add PlantNet key in `.env`.
4. Start app:
   ```bash
   npm start
   ```

## Production build

```bash
npm run build
```

Output is generated in `build/`.

For static hosting (Vercel/Netlify/GitHub Pages), deploy the build output or connect repo and use the build command above.

---

## 6) Risks and Honest Limitations (good to mention in interview)

- API key is client-side, so it cannot be treated as a secret.
- No backend cache means repeated API calls and potential rate-limit issues.
- No typed models (TypeScript) for API contracts.
- Taxonomy/category heuristics are text-based and approximate.
- Large inline style usage makes scaling UI maintenance harder.

---

## 7) Future Roadmap

## Phase 1 - Reliability and Maintainability
- Add central API client wrapper with:
  - retry strategy,
  - timeout,
  - explicit error mapping.
- Introduce typed interfaces (migrate to TypeScript or JSDoc types).
- Refactor repeated inline styles into reusable style modules/components.
- Add unit tests for species mapping and filtering logic.

## Phase 2 - Product Depth
- Add server-side proxy for API calls and key management.
- Add caching layer for popular queries.
- Improve Kerala-specific curation (endemic species presets, regional filters).
- Add richer comparison metrics (habitat, conservation references, observation trends).

## Phase 3 - Production Readiness
- User accounts + cloud-synced favorites/history.
- Accessibility audit (keyboard navigation, color contrast, ARIA improvements).
- Performance profiling and bundle optimization.
- CI pipeline with lint/test/build checks and preview deploys.

---

## 8) Strong Interview Narrative (short version)

> "I designed this as a frontend-first biodiversity explorer to validate user value quickly. I used iNaturalist and PlantNet to avoid rebuilding large datasets or ML from scratch, and LocalStorage to keep the first version backend-free. The trade-off is external API dependency and limited data ownership. My next step is adding a backend proxy + caching + typed contracts for production reliability."
