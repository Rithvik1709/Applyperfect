import React, { useState } from 'react'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Pricing from './pages/Pricing'

const AuthModalContext = React.createContext({
  modalOpen: false,
  openModal: () => {},
  closeModal: () => {},
})


function Header() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  const { modalOpen, openModal, closeModal } = React.useContext(AuthModalContext)
  const location = useLocation()

  async function signInWithGoogle() {
    // try popup first, else redirect
    try {
      await loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' } })
    } catch (err) {
      console.error('Auth error', err)
    }
  }

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
          {!isAuthenticated && (
            <>
              <a href="https://x.com/BngRithvik" aria-label="X profile" className="inline-flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.89-.53 1.57-1.37 1.89-2.37-.83.49-1.75.85-2.72 1.04a4.17 4.17 0 0 0-7.1 3.8A11.82 11.82 0 0 1 3.15 4.6a4.17 4.17 0 0 0 1.29 5.56c-.7-.02-1.36-.21-1.94-.53v.05c0 2.03 1.44 3.73 3.36 4.12-.35.1-.72.15-1.1.15-.27 0-.54-.03-.8-.08a4.18 4.18 0 0 0 3.9 2.9A8.38 8.38 0 0 1 2 19.54a11.82 11.82 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68v-.53A8.36 8.36 0 0 0 22.46 6z" />
                </svg>
              </a>
              <button onClick={openModal} className="btn btn-primary">Sign In</button>
            </>
          )}
          {isAuthenticated && (
            <>
              <a href="https://x.com/BngRithvik" aria-label="X profile" className="inline-flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.89-.53 1.57-1.37 1.89-2.37-.83.49-1.75.85-2.72 1.04a4.17 4.17 0 0 0-7.1 3.8A11.82 11.82 0 0 1 3.15 4.6a4.17 4.17 0 0 0 1.29 5.56c-.7-.02-1.36-.21-1.94-.53v.05c0 2.03 1.44 3.73 3.36 4.12-.35.1-.72.15-1.1.15-.27 0-.54-.03-.8-.08a4.18 4.18 0 0 0 3.9 2.9A8.38 8.38 0 0 1 2 19.54a11.82 11.82 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68v-.53A8.36 8.36 0 0 0 22.46 6z" />
                </svg>
              </a>
              <span className="mr-3">{user.name}</span>
              <button onClick={() => logout({ returnTo: window.location.origin })} className="btn btn-secondary">Sign out</button>
            </>
          )}
        </div>
      </div>

      {/* Modal overlay for sign-in */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeSignIn}></div>
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
            <button className="absolute top-3 right-3 rounded-md border p-1" onClick={closeModal}>✕</button>
            <h3 className="text-xl font-semibold text-center mb-4">Continue to Applyperfect</h3>
            <div className="mt-4">
              <button onClick={signInWithGoogle} className="w-full border rounded-md py-3 flex items-center justify-center gap-3">
                <svg width="20" height="20" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg"><path d="M533.5 278.4c0-18.5-1.6-37.2-4.9-55.1H272v104.4h147.3c-6.4 34.6-25.4 63.9-54.4 83.5v69.4h87.8c51.4-47.3 81.8-117.2 81.8-202.2z" fill="#4285F4"/><path d="M272 544.3c73.5 0 135.3-24.3 180.4-65.9l-87.8-69.4c-24.4 16.4-55.6 26-92.6 26-71 0-131.3-47.9-152.8-112.4H31.5v70.5C76.5 487.9 167.7 544.3 272 544.3z" fill="#34A853"/><path d="M119.2 323.1c-10.8-32.3-10.8-66.9 0-99.2V153.4H31.5C11.3 192.4 0 236.4 0 278.4s11.3 86 31.5 124.9l87.7-69.4z" fill="#FBBC05"/><path d="M272 109.7c38.6 0 73.3 13.3 100.8 39.4l75.6-75.6C405.9 28.3 347.7 0 272 0 167.7 0 76.5 56.4 31.5 153.4l87.7 70.5C140.7 157.6 201 109.7 272 109.7z" fill="#EA4335"/></svg>
                <span>Continue with Google</span>
              </button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">Secured by Auth0</div>
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

  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <AuthModalContext.Provider value={{ modalOpen, openModal, closeModal }}>
      <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{redirect_uri: window.location.origin}}>
        <BrowserRouter>
          <div className="min-h-screen font-sans bg-gray-50">
            <Header />
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
