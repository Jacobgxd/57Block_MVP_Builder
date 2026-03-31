import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import RequestAccess from './pages/RequestAccess'
import Invite from './pages/Invite'
import ForgotPassword from './pages/ForgotPassword'
import Onboarding from './pages/Onboarding'
import NewProject from './pages/NewProject'
import Workspace from './pages/Workspace'
import Delivery from './pages/Delivery'

const AppContent = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const hideChrome = ['/signin', '/request-access', '/invite', '/forgot-password', '/onboarding', '/projects/new', '/delivery'].some(p => location.pathname.startsWith(p))
    || location.pathname.startsWith('/workspace')

  return (
    <div className="min-h-screen flex flex-col">
      {isHomePage && <Navbar />}
      <main className={`flex-1 ${isHomePage ? 'pt-[68px]' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/request-access" element={<RequestAccess />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/projects/new" element={<NewProject />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspace/:asset" element={<Workspace />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
      </main>
      {isHomePage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
