import React from 'react'

// Minimal stub of @clerk/clerk-react to avoid runtime errors when Clerk is not configured.
// It exports common named symbols used by apps so the bundle can build and the app can render
// without an actual Clerk setup. All components are no-ops or benign fallbacks.

export function ClerkProvider({ children }) {
  return children || null
}

export const withClerk = (Comp) => Comp

export function useUser() {
  return { isLoaded: true, isSignedIn: false, user: null }
}

export function useClerk() {
  return null
}

export function useSession() {
  return { isLoaded: true, session: null }
}

// Common components exported by @clerk/clerk-react; provide simple fallbacks.
export const SignIn = () => null
export const SignUp = () => null
export const SignInButton = ({ children, onClick, ...props }) => (
  React.createElement('button', { onClick, ...props }, children || 'Sign in')
)
export const SignUpButton = ({ children, onClick, ...props }) => (
  React.createElement('button', { onClick, ...props }, children || 'Sign up')
)
export const SignOutButton = ({ children, onClick, ...props }) => (
  React.createElement('button', { onClick, ...props }, children || 'Sign out')
)
export const UserButton = () => null
export const RedirectToSignIn = () => null
export const RedirectToSignUp = () => null
export const SignedIn = ({ children }) => children || null
export const SignedOut = ({ children }) => children || null
export const ClerkLoaded = ({ children }) => children || null

export default {
  ClerkProvider,
  withClerk,
  useUser,
  useClerk,
  useSession,
  SignIn,
  SignUp,
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
  RedirectToSignIn,
  RedirectToSignUp,
  SignedIn,
  SignedOut,
  ClerkLoaded,
}
