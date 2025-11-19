// Re-export from the JSX implementation so imports that omit the extension
// still work. The actual JSX provider is in AuthContext.jsx.
export { useAuth, AuthProvider } from './AuthContext.jsx';