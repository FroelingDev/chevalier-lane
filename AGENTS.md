# Agent Guidelines for Chevalier Lane

## Build & Test Commands

### Development
- `bun run dev` - Start development server on port 3000
- `bun run build` - Build for production
- `bun run serve` - Preview production build

### Testing
- `bun run test` - Run all tests with Vitest
- `bunx vitest run --reporter=verbose` - Run tests with detailed output
- `bunx vitest run src/components/MyComponent.test.tsx` - Run single test file

### Linting & Type Checking
- TypeScript strict mode is enabled - run `npx tsc --noEmit` for type checking
- No dedicated linter configured - rely on TypeScript for code quality

## Code Style Guidelines

### TypeScript & React
- **Strict TypeScript**: All code must pass strict TypeScript checks
- **JSX Transform**: Use modern JSX transform (no React imports needed)
- **Component Exports**: Use default exports for components
- **File Extensions**: Use `.tsx` for components, `.ts` for utilities

### Imports & Dependencies
- **Import Order**:
  1. React imports (useState, useEffect, etc.)
  2. External libraries (lucide-react, @tanstack/router, etc.)
  3. Internal imports using `@/` path aliases
- **Path Aliases**: Use `@/*` for src directory imports
- **Barrel Exports**: Avoid - import directly from specific files

### Naming Conventions
- **Components**: PascalCase (e.g., `Header.tsx`, `CarDetail.tsx`)
- **Files**: kebab-case for routes, PascalCase for components
- **Functions/Variables**: camelCase
- **Types/Interfaces**: PascalCase with descriptive names
- **Constants**: UPPER_SNAKE_CASE

### Styling
- **Tailwind CSS**: Primary styling framework
- **Custom Colors**: Use luxury color scheme (luxury-gold, luxury-black, etc.)
- **Class Names**: Use `cn()` utility for conditional classes
- **Responsive**: Mobile-first approach with sm/md/lg breakpoints

### Error Handling
- **TypeScript Errors**: Must resolve all TypeScript errors
- **Runtime Errors**: Use try/catch for async operations
- **User Input**: Validate and sanitize all user inputs
- **API Errors**: Handle gracefully with user-friendly messages

### File Structure
- **Routes**: File-based routing in `src/routes/`
- **Components**: Feature-based organization in `src/components/`
- **Utilities**: Shared logic in `src/lib/`
- **Assets**: Static files in `public/`

## Cursor Rules Integration

This project uses **TanStack Start** with:
- File-based routing with TanStack Router
- Data fetching with TanStack Query
- Server-side rendering support
- TypeScript-first development
- Tailwind CSS for styling

## Security & Best Practices

- Never commit secrets or API keys
- Use environment variables for sensitive data
- Validate all user inputs
- Follow React security best practices
- Use HTTPS in production</content>
<parameter name="filePath">AGENTS.md