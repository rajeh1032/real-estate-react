# AI Rules For This Project

Use these rules before asking any AI to implement a feature in this repository.

## Project Summary

- Stack: `Vite + React 19 + React Router + Redux Toolkit + Firebase Firestore + Tailwind CSS 4`
- Language: JavaScript only, not TypeScript
- Module system: ESM
- Styling: Tailwind utility classes plus shared CSS variables from `src/styles/theme.css`
- State management: Redux Toolkit for global state
- Data layer: Firebase helpers in `src/firebase`
- Architecture: feature-based folders inside `src/features`

## Current Source Structure

```text
src/
  App.jsx
  main.jsx
  index.css
  styles/
    theme.css
  components/
    common/
  hooks/
  layouts/
    MainLayout.jsx
  routes/
    AppRouter.jsx
    appRoutes.jsx
  redux/
    provider.jsx
    store.js
    rootReducer.js
    ThemeSync.jsx
    reducer/
      themeSlice.js
  firebase/
    firebaseConfig.js
    firestoreHelper.js
  utils/
    themeStorage.js
  features/
    home/
    properties/
    property-details/
    auth/
    account/
```

## Core Architecture Rules

1. Keep the project feature-based.
2. Every new business feature should live under `src/features/<feature-name>/`.
3. Inside a feature, prefer this structure:

```text
src/features/<feature-name>/
  index.js
  pages/
    FeaturePage.jsx
  services/
    featureService.js
```

4. Page components belong in `pages/`.
5. Data-fetching, Firebase calls, and business logic belong in `services/`.
6. Reusable cross-feature UI belongs in `src/components/`.
7. Reusable hooks belong in `src/hooks/`.
8. App-wide layout belongs in `src/layouts/`.
9. Global routing must stay centralized in `src/routes/appRoutes.jsx`.
10. Global Redux setup must stay in `src/redux/`.
11. Shared Firebase setup and generic Firestore helpers must stay in `src/firebase/`.

## Import And Export Rules

1. Follow the existing style: mostly named exports for shared modules.
2. Keep `App.jsx` as the default export unless there is a strong reason to change it.
3. Each feature should expose its public API from `src/features/<feature-name>/index.js`.
4. Route files should import feature pages from feature `index.js` when possible.
5. Prefer absolute clarity over clever abstractions.
6. Do not introduce unnecessary barrel files outside the existing feature pattern.

## Routing Rules

1. Define routes in `src/routes/appRoutes.jsx`.
2. Keep router wiring in `src/routes/AppRouter.jsx`.
3. Keep shared page chrome in `src/layouts/MainLayout.jsx`.
4. New pages should be mounted as children of `MainLayout` unless the page clearly needs a separate layout.
5. Keep the wildcard route redirect behavior unless the feature explicitly requires a different fallback.

## Redux Rules

1. Use Redux Toolkit slices for shared global state only.
2. Put new slices in `src/redux/reducer/`.
3. Register new slices in `src/redux/rootReducer.js`.
4. Keep the store setup minimal in `src/redux/store.js`.
5. Do not put feature-local form state or temporary UI state into Redux unless multiple distant components truly need it.

## Firebase And Data Rules

1. Reuse `src/firebase/firebaseConfig.js` for Firebase app and Firestore setup.
2. Reuse `src/firebase/firestoreHelper.js` for generic CRUD behavior when it fits.
3. Put feature-specific Firestore access in that feature's `services/` folder.
4. Keep Firebase code separated from page JSX as much as possible.
5. Return clean data objects from services and keep UI components focused on rendering.

## Styling Rules

1. Use Tailwind classes for component styling.
2. Reuse the existing design tokens from `src/styles/theme.css`.
3. Prefer semantic color tokens such as `bg-background`, `text-text`, `border-border`, `bg-card`, and `text-text-muted`.
4. Do not hardcode random colors when an existing token can be used.
5. Preserve dark mode support.
6. Do not replace the existing theme system unless asked.
7. Keep global CSS minimal and put shared tokens in `src/styles/theme.css` or `src/index.css`.

## Component Rules

1. Keep components small and focused.
2. Use functional components only.
3. Match the current code style: simple JSX, no semicolons, concise logic.
4. Avoid overengineering.
5. Prefer readable code over abstract patterns.
6. Add comments only when the logic is not obvious.

## Feature Implementation Rules

When adding a new feature, follow this order:

1. Create or update the feature folder in `src/features/`.
2. Add page components under `pages/`.
3. Add service functions under `services/`.
4. Export the public feature modules from `index.js`.
5. Wire the feature into `src/routes/appRoutes.jsx` if it has a route.
6. Add Redux state only if the feature truly needs shared global state.
7. Reuse shared components, hooks, and Firebase helpers before creating new ones.

## Guardrails

1. Do not convert the project to TypeScript.
2. Do not change the project structure unless requested.
3. Do not move routing, redux, firebase, or layout files into a different architecture style.
4. Do not introduce a different state library.
5. Do not add a UI library unless explicitly requested.
6. Do not replace Firebase with another backend approach.
7. Do not create deeply nested folders unless the feature genuinely needs them.
8. Do not break the existing light/dark theme behavior.

## Notes About The Current Codebase

1. The home landing screen is implemented under `src/features/home/` and is mounted at `/`.
2. `src/layouts/MainLayout.jsx` owns the shared top navigation, footer, and theme controls.
3. Some non-home feature files still exist as placeholders and should be completed in the same structure when needed.
4. New feature work should complete the existing structure instead of inventing a new one.

## Copy-Paste Prompt For Any AI

```text
You are working in an existing React project. Follow these rules strictly:

- Keep the current Vite + React 19 + Redux Toolkit + React Router + Firebase structure.
- Use JavaScript only, not TypeScript.
- Keep the project feature-based under src/features.
- For each feature, prefer:
  - index.js
  - pages/
  - services/
- Put route definitions only in src/routes/appRoutes.jsx.
- Keep router setup in src/routes/AppRouter.jsx.
- Keep shared layout in src/layouts/MainLayout.jsx.
- Keep the root route `/` mapped to the home landing page unless explicitly asked to change it.
- Put shared global state only in Redux slices under src/redux/reducer.
- Register any new slice in src/redux/rootReducer.js.
- Keep Firebase setup in src/firebase and feature-specific data access inside feature services.
- Use Tailwind classes and existing theme tokens from src/styles/theme.css.
- Preserve dark mode support.
- Reuse existing patterns and naming style from the repository.
- Do not refactor unrelated files.
- Do not change architecture unless explicitly requested.
- Keep components simple, readable, and aligned with the existing code style.

Before coding, inspect the existing files and implement the new feature in the same structure and style.
```
