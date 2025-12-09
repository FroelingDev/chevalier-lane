import { createRouter as createTanstackRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a default not found component
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-black text-luxury-gold">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-luxury-gold text-luxury-black font-semibold rounded hover:bg-opacity-90 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

// Create a new router instance
export const createRouter = () => {
  return createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: NotFound,
  });
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
