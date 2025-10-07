Clerk + Next.js (App Router) integration
======================================

Files added (placeholders only):

- `src/middleware.ts` — uses `clerkMiddleware()`
- `app/layout.tsx` — wraps app with `<ClerkProvider>` and shows SignIn/SignUp/UserButton
- `app/api/protected/route.ts` — example protected API route using `auth()`
- `.env.local.example` — placeholders for keys

Important notes
---------------
- Do NOT commit `.env.local` with real keys. Use `.env.local` on your machine and in your host environment settings.
- Install the Clerk package:

```
npm install @clerk/nextjs@latest
```

Verification checklist
----------------------
1. `src/middleware.ts` exists and uses `clerkMiddleware()`.
2. `app/layout.tsx` wraps the app with `<ClerkProvider>`.
3. `app/api/protected/route.ts` demonstrates server-side auth using `auth()`.
4. `.env.local` contains real values and `.env.local.example` has placeholders.

If you want, I can help wire Clerk into your host (Vercel, Render) and set the environment variables for production.
