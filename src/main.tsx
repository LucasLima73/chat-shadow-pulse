
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add enhanced error handling for script loading issues
window.addEventListener('error', (event) => {
  if (event.target && (event.target as HTMLElement).tagName === 'SCRIPT') {
    console.warn('Script loading error detected:', event);
    // Prevent the error from breaking the app completely
    event.preventDefault();
  }
}, true);

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.warn('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  createRoot(rootElement).render(<App />);
} catch (err) {
  console.error("Error rendering application:", err);
  // Show fallback UI if rendering fails
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="text-align: center; padding: 2rem; font-family: sans-serif;">
        <h2>Erro ao carregar aplicação</h2>
        <p>Por favor, recarregue a página ou tente novamente mais tarde.</p>
        <p>Erro: ${err instanceof Error ? err.message : 'Erro desconhecido'}</p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 1rem; cursor: pointer;">
          Recarregar
        </button>
      </div>
    `;
  }
}
