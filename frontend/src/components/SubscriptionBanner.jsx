import React from 'react'
// Use a normal anchor tag here because this component may render before
// the Router is mounted (blocked state). react-router's Link requires a
// Router context which causes errors when used outside it.
import { useUser } from '@clerk/clerk-react'

export default function SubscriptionBanner() {
  const { isLoaded, isSignedIn, user } = useUser()

  // Wait until Clerk finishes loading
  if (!isLoaded || !isSignedIn) return null

  // Do not show banner on the Pricing page. Use window.location so this
  // component can be rendered outside of a Router (we render it before
  // the BrowserRouter when blocking access).
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  if (pathname.toLowerCase().startsWith('/pricing')) return null

  // Look for a publicMetadata flag set on the user indicating an active subscription.
  // This is a client-side check; in production you should verify subscriptions server-side.
  const hasActive = user?.publicMetadata?.activeSubscription === true

  if (hasActive) return null

  return (
    <div className="max-w-6xl mx-auto px-6 mt-4">
      <div className="rounded-md bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
        <strong>Oops — it looks like you don&apos;t have an active subscription plan.</strong>
        <div className="mt-1">Check out <a href="/pricing" className="underline font-medium">Pricing</a> and choose the best plan for you.</div>
      </div>
    </div>
  )
}
