import React, { useState } from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Pricing from './pages/Pricing'
import SubscriptionBanner from './components/SubscriptionBanner'
import { useUser } from '@clerk/clerk-react'

const AuthModalContext = React.createContext({
  modalOpen: false,
  openModal: () => {},
  closeModal: () => {},
})


function Header() {
  const { modalOpen, openModal, closeModal } = React.useContext(AuthModalContext)
  const location = useLocation()

  return (
    <header className="w-full bg-white text-black border-b">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-md px-3 py-2 font-bold">Applyperfect</div>
          {location.pathname !== '/pricing' && (
            <nav className="hidden md:flex gap-6 ml-6">
              <a className="hover:underline" href="#features">Features</a>
              <Link className="hover:underline" to="/pricing">Pricing</Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <button className="btn btn-primary">Sign In</button>
            </SignInButton>
            <SignUpButton>
              <button className="btn btn-secondary">Sign Up</button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Modal overlay for sign-in (Auth0 fallback) */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 mx-4">
              <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-700" onClick={closeModal} aria-label="Close">✕</button>
              <h3 className="text-xl md:text-2xl font-semibold text-center mb-6">Continue to Applyperfect</h3>

              <div className="flex justify-center">
                <button
                  onClick={() => openModal()}
                  className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg w-full max-w-md hover:shadow-sm focus:outline-none"
                >
                  <span className="text-sm font-medium">Continue with Google (Auth0)</span>
                </button>
              </div>

              <div className="mt-6 text-center text-xs text-gray-500 border-t pt-4">Secured by Auth0</div>
            </div>
          </div>
        )}
    </header>
  )
}

function Hero({ onUpload, resumeText, setResumeText, jdText, setJdText, runAnalyze, analysis }) {
  const { openModal } = React.useContext(AuthModalContext)
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid gap-8 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl hero-title">Make your resume speak the job description</h1>
          <p className="mt-4 text-lg hero-sub">Upload your resume and paste the job description — Applyperfect aligns your skills, adds missing keywords, and produces an ATS-friendly resume.</p>
              <div className="mt-6 flex gap-3 justify-center">
                <button onClick={() => openModal()} className="btn btn-primary">Try Now</button>
                <button onClick={runAnalyze} className="btn btn-secondary">Demo</button>
              </div>
          
        </div>
      </div>
    </section>
  )
}

function Features(){
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-3 gap-6">
  <div className="p-6 bg-white rounded shadow border border-transparent hover:border-black transform hover:-translate-y-1 hover:scale-105 hover:z-10 hover:shadow-lg transition">
          <h3 className="font-semibold">ATS Optimization</h3>
          <p className="mt-2 text-sm text-gray-500">Matches your resume to JD keywords and computes a compatibility score.</p>
        </div>
  <div className="p-6 bg-white rounded shadow border border-transparent hover:border-black transform hover:-translate-y-1 hover:scale-105 hover:z-10 hover:shadow-lg transition">
          <h3 className="font-semibold">AI Rewrite</h3>
          <p className="mt-2 text-sm text-gray-500">Leverages an LLM to rewrite and align achievements with the role.</p>
        </div>
  <div className="p-6 bg-white rounded shadow border border-transparent hover:border-black transform hover:-translate-y-1 hover:scale-105 hover:z-10 hover:shadow-lg transition">
          <h3 className="font-semibold">Download</h3>
          <p className="mt-2 text-sm text-gray-500">Get updated resume as DOCX and PDF with improved formatting.</p>
        </div>
  <div className="p-6 bg-white rounded shadow border border-transparent hover:border-black transform hover:-translate-y-1 hover:scale-105 hover:z-10 hover:shadow-lg transition">
          <h3 className="font-semibold">Keyword Enrichment</h3>
          <p className="mt-2 text-sm text-gray-500">Automatically adds relevant industry keywords and phrases to improve discoverability.</p>
        </div>
  <div className="p-6 bg-white rounded shadow border border-transparent hover:border-black transform hover:-translate-y-1 hover:scale-105 hover:z-10 hover:shadow-lg transition">
          <h3 className="font-semibold">Tone Consistency</h3>
          <p className="mt-2 text-sm text-gray-500">Ensures the resume tone (professional, technical, managerial) stays consistent throughout.</p>
        </div>
  <div className="p-6 bg-white rounded shadow border border-transparent hover:border-black transform hover:-translate-y-1 hover:scale-105 hover:z-10 hover:shadow-lg transition">
          <h3 className="font-semibold">Formatting & Export</h3>
          <p className="mt-2 text-sm text-gray-500">Applies clean formatting and prepares downloadable DOCX/PDF files ready for submission.</p>
        </div>
      </div>
    </section>
  )
}

function MainApp(){
  const [resumeText, setResumeText] = useState('')
  const [jdText, setJdText] = useState('')
  const [analysis, setAnalysis] = useState(null)

  async function handleUpload(e){
    const f = e.target.files[0]
    if(!f) return
    const form = new FormData()
    form.append('file', f)
    const api = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    const res = await fetch(`${api}/upload`, {method:'POST', body: form})
    const j = await res.json()
    setResumeText(j.text)
  }

  async function runAnalyze(){
  const form = new FormData()
  form.append('text', resumeText)
  form.append('jd', jdText)
  const api = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  const res = await fetch(`${api}/analyze`, {method:'POST', body: form})
  const j = await res.json()
  setAnalysis(j)
  }

  return (
    <div>
  <Hero onUpload={handleUpload} resumeText={resumeText} setResumeText={setResumeText} jdText={jdText} setJdText={setJdText} runAnalyze={runAnalyze} analysis={analysis} />
      <Features />
      
    </div>
  )
}

export default function App(){
  const domain = import.meta.env.VITE_AUTH0_DOMAIN || 'YOUR_AUTH0_DOMAIN'
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || 'YOUR_CLIENT_ID'
  const { isLoaded, isSignedIn, user } = useUser()
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const onPricing = pathname.toLowerCase().startsWith('/pricing')
  const hasActive = user?.publicMetadata?.activeSubscription === true
  const shouldBlock = isLoaded && isSignedIn && !hasActive && !onPricing

  if (shouldBlock) {
    return (
      <AuthModalContext.Provider value={{ modalOpen, openModal, closeModal }}>
        <div className="min-h-screen bg-white">
          {/* Profile button in top-right while blocked */}
          {isSignedIn && (
            <div className="fixed top-4 right-4 z-50">
              <UserButton />
            </div>
          )}
          <SubscriptionBanner />
        </div>
      </AuthModalContext.Provider>
    )
  }

  return (
    <AuthModalContext.Provider value={{ modalOpen, openModal, closeModal }}>
      <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{redirect_uri: window.location.origin}}>
        <BrowserRouter>
          <div className="min-h-screen font-sans bg-gray-50">
            <Header />
            <SubscriptionBanner />
            <Routes>
              <Route path="/" element={<MainApp />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
            <footer className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500">© {new Date().getFullYear()} Applyperfect</footer>
          </div>
        </BrowserRouter>
      </Auth0Provider>
    </AuthModalContext.Provider>
  )
}
