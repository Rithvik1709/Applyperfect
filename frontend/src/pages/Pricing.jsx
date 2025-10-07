import React from 'react'
import { Link } from 'react-router-dom'
import { useClerk } from '@clerk/clerk-react'

export default function Pricing(){
  const clerk = useClerk()

  return (
    <main className="min-h-screen flex items-start bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-20 w-full">
        <Link to="/" className="inline-flex items-center gap-3 text-base text-black mb-6"> 
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Go back</span>
        </Link>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold mb-6">Once in blue moon</h2>
            <div className="text-center text-4xl font-extrabold mb-2">$3<span className="text-base font-medium">/One week</span></div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3"><span className="text-green-600">✓</span>20 resume downloads</li>
              <li className="flex items-center gap-3"><span className="text-green-600">✘</span>All customization features</li>
              <li className="flex items-center gap-3"><span className="text-green-600">✘</span>Access to Beta features</li>
            </ul>
            <div className="mt-8">
              <button onClick={() => clerk.openSignIn()} className="w-full btn btn-primary">Sign In to buy</button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold mb-6">Frequent Job Seeker</h2>
            <div className="text-center text-4xl font-extrabold mb-2">$5<span className="text-base font-medium">/One month</span></div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3"><span className="text-green-600">✓</span>80 resume downloads</li>
              <li className="flex items-center gap-3"><span className="text-green-600">✓</span>All customization features</li>
              <li className="flex items-center gap-3"><span className="text-green-600">✘</span>Access to Beta features</li>
            </ul>
            <div className="mt-8">
              <button onClick={() => clerk.openSignIn()} className="w-full btn btn-primary">Sign In to buy</button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold mb-6">Hard Core<br/>applier</h2>
            <div className="text-center text-4xl font-extrabold mb-2 mt-6">$10<span className="text-base font-medium">/Life Time</span></div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3"><span className="text-green-600">✓</span>500 resume downloads</li>
              <li className="flex items-center gap-3"><span className="text-green-600">✓</span>All customization features</li>
              <li className="flex items-center gap-3"><span className="text-green-600">✓</span>Access to Beta features</li>
            </ul>
            <div className="mt-8">
              <button onClick={() => clerk.openSignIn()} className="w-full btn btn-primary">Sign In to buy</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
