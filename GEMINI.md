# Courserr - Project Context

Courserr is a React-based web application designed to help students explore and evaluate school courses. It provides a searchable and filterable catalog of classes, offering detailed insights into descriptions, prerequisites, grade distributions, and time commitments.

## Project Overview

- **Purpose:** A course discovery and review platform.
- **Core Features:**
  - Searchable course catalog with fuzzy matching.
  - Filtering by subject, grade level, duration, and course type (Honors/AP).
  - Detailed course pages with data visualizations (using Recharts).
  - Bookmarking system (persisted in local storage).
  - Responsive layout with a sidebar navigation and a search-focused header.

## Key Technologies

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (Dialog, Popover)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Analytics:** [Vercel Analytics & Speed Insights](https://vercel.com/docs/analytics)

## Project Structure

- `src/Components/`: React components. Key components include:
  - `App.tsx`: Main entry point and routing logic.
  - `CardArea.tsx`: The main grid display for course cards.
  - `ClassInfoArea.tsx`: Detailed view for a single course.
  - `Header.tsx` & `Sidebar.tsx`: Navigation and global search/filter controls.
- `src/assets/`: Data models and utilities.
  - `Class.ts`: The core `Class` data model.
  - `ClassInstantiation.ts`: The main data file containing hardcoded course instances.
  - `classUtilities.ts`: Logic for scoring search matches and calculating averages.
- `src/Styles/`: Component-specific CSS files.
- `scripts/`: Python utility scripts for data management.
  - `generate_class_data.py`: Used to populate `ClassInstantiation.ts` with mock data (grades, ratings, etc.).

## Building and Running

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Data Management
The project uses a Python script to manage mock data in `src/assets/ClassInstantiation.ts`:
```bash
# Populate classes with random grades and time data
python generate_class_data.py generate

# Clear mock data from classes
python generate_class_data.py clear
```

## Development Conventions

- **Component Pattern:** Use functional components with hooks.
- **Styling:** CSS is organized into component-specific files in `src/Styles/`. Global variables are defined in `src/Styles/variables.css`.
- **Data Flow:** Course data is loaded from `ClassInstantiation.ts` and managed via a `Map` (instantiated in that file).
- **State Management:** Uses React's `useState` and `useMemo`. Local storage is used for persistence of bookmarks and filter states.
- **Performance:** Main content areas (`CardArea`, `ClassInfoArea`) are lazy-loaded to improve initial load time.
- **Type Safety:** Strict TypeScript usage is encouraged. Data models should be defined in `src/assets/`.
