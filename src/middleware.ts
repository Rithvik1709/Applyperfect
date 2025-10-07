// Clerk middleware for protecting routes (Next.js style)
// If your app uses Next.js, install `@clerk/nextjs` and place this file at the project root
// (next will automatically pick up `middleware.ts`).
//
// The middleware below is the canonical setup from Clerk's docs. It enforces
// authentication on all routes except static/_next/api routes. Adjust `matcher`
// as needed for your application.

import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

// Configure which routes the middleware should run on.
// This example protects all routes except: _next, static files, public, and api endpoints.
export const config = {
	matcher: ['/', '/((?!_next/static|_next/image|favicon.ico|api|static|public).*)'],
}
