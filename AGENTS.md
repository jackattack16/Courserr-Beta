# AGENTS.md - Courserr Development Guide

## Build, Lint, and Test Commands

### Core Commands
```bash
npm run dev       # Development server (hot reload)
npm run build     # Production build (typecheck + build)
npm run lint      # Lint all files
npm run preview   # Preview production build locally
```

### Testing
No test framework configured. When adding tests:
- Use **Vitest** (works with Vite)
- Place tests alongside components: `.test.ts` or `.test.tsx`
- Run single file: `npx vitest run src/Components/App.test.tsx`
- Watch mode: `npx vitest src/`

---

## Code Style Guidelines

### TypeScript
- Use explicit types for function parameters and return values
- Use `type` for unions/interfaces; avoid `interface` unless extending
- Example: `type CardAreaProps = { searchQuery: string; }`

### Naming Conventions
- **Components**: PascalCase (`ClassCard`, `Searchbar`)
- **Functions/variables**: camelCase (`calculateScore`, `filteredCourses`)
- **Files**: kebab-case for utilities, PascalCase for components
- **Constants**: PascalCase (`filters`)

### Imports Order
1. React imports (`react`)
2. External libraries (`react-router-dom`)
3. Internal modules (`../assets/Class`)
4. CSS/Styles (`../Styles/...`)

### React Patterns
- Use function components exclusively
- Use arrow functions: `const Component = ({ props }) => { ... }`
- Use `React.memo` for expensive components
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed as props
- Destructure props in component signature

### Event Handlers
```typescript
const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    updateSearchQuery(value);
  }
}, [value, updateSearchQuery]);
```

### CSS/Styling
- CSS colocated with components (`Searchbar.tsx` + `Searchbar.css`)
- Use CSS variables for theming

### Error Handling
- Use `try/catch` for async operations
- Throw descriptive errors in utilities

### Lazy Loading
```typescript
const CardArea = lazy(() => import('./CardArea'))

<Suspense fallback={<Loading />}>
  <CardArea />
</Suspense>
```

---

## Project Structure

```
src/
├── Components/        # React components
│   ├── App.tsx       # Root with routing
│   ├── CardArea.tsx  # Main grid
│   └── ...
├── assets/           # Data and utilities
│   ├── Class.ts             # Class model
│   ├── ClassInstantiation.ts # All classes
│   ├── classUtilities.ts    # Helpers
│   └── filters.ts           # Filter options
├── Styles/          # CSS (colocated)
└── main.tsx         # Entry point
```

---

## Key Utilities (classUtilities.ts)

- `getSubjectClass()` - Maps subject to CSS class
- `subjectToIcon` - Maps subjects to Material Icons
- `titleCase()` - Capitalizes strings
- `calculateScore()` - Scores search matches
- `isCloseMatch()` - Checks close title matches
- `getPrereqCourseId()` - Finds course ID by name

### Class Model
- Getters for all properties
- Computed values: `getAverageGrade()`, `getAverageTimePerWeek()`

---

## Common Tasks

### Add New Class
1. Add instance to `ClassInstantiation.ts`: `const className = new Class(...)`
2. Add to courseMap: `courseMap.set(className.getCourseId(), className)`

### Add New Component
1. Create `ComponentName.tsx` in `src/Components/`
2. Create `ComponentName.css` in `src/Styles/`
3. Export as default, import in parent

---

## Notes for Agents

1. Always run `npm run build` before finishing
2. Use `npm run lint` (auto-fixes many issues)
3. Test changes manually (no automated tests)
4. Keep responses under 4 lines unless detail requested
