# Project Structure

This project follows a layered architecture pattern for better maintainability and scalability.

## Directory Structure

```
src/
├── main.tsx                 # Application entry point
├── index.css                # Global styles (Tailwind CSS v4)
├── App.tsx                  # Root component
│
├── assets/                  # Static assets (images, fonts, etc.)
│   └── App.css             # Legacy app styles (if needed)
│
├── components/              # React components
│   ├── ui/                 # Shadcn/UI base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   └── features/           # Feature-specific components
│
├── lib/                    # Core libraries and utilities
│   └── utils.ts           # General utility functions (cn helper)
│
├── hooks/                  # Custom React hooks
│   ├── index.ts           # Hook exports
│   ├── useGoogleSheets.ts # Google Sheets API integration hook
│   └── useLocalStorage.ts # Local storage management hook
│
├── services/              # External API services
│   └── googleSheets.ts   # Google Sheets API service
│
├── types/                 # TypeScript type definitions
│   └── index.ts          # Shared type definitions
│
├── config/               # Configuration files
│   └── i18n.ts          # Internationalization setup
│
├── constants/            # Application constants
│   ├── index.ts         # Constant exports
│   ├── app.ts          # App configuration
│   └── i18n.ts         # I18n configuration
│
└── utils/               # Pure utility functions
    └── formatters.ts   # Data formatting utilities
```

## Layer Responsibilities

### Components Layer
- **ui/**: Reusable base UI components (from shadcn/ui)
- **features/**: Feature-specific components composed from UI components

### Services Layer
- Handles external API integrations
- Manages data fetching and mutations
- Business logic for external services

### Hooks Layer
- Custom React hooks for state management
- Reusable logic encapsulation
- Side-effect handling

### Types Layer
- Shared TypeScript interfaces and types
- Data models and contracts

### Config Layer
- Application configuration
- Third-party library setup (i18n, etc.)

### Constants Layer
- Application constants
- Configuration values
- Magic numbers and strings

### Utils Layer
- Pure utility functions
- Data transformation helpers
- Formatters and validators

### Lib Layer
- Core libraries and framework utilities
- Low-level helper functions

## Import Guidelines

```typescript
// Components
import { Button } from '@/components/ui/button';
import { MyFeature } from '@/components/features/MyFeature';

// Hooks
import { useGoogleSheets } from '@/hooks';

// Services
import { GoogleSheetsService } from '@/services/googleSheets';

// Types
import type { FormField } from '@/types';

// Constants
import { API_CONFIG } from '@/constants';

// Utils
import { formatDate } from '@/utils/formatters';
```

## Best Practices

1. **Component Organization**: Keep components small and focused
2. **Type Safety**: All services and hooks should use TypeScript types
3. **Separation of Concerns**: Each layer has a clear responsibility
4. **Reusability**: Prefer hooks over direct API calls in components
5. **Testing**: Structure supports easy unit and integration testing
