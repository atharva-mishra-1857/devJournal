import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/usercontext'
import Navbar from './components/navbar'
import MobileNav from './components/mobilenav'
import Home from './pages/home'
import NewEntry from './pages/newentry'
import SingleEntry from './pages/singleentry'
import Stats from './pages/stats'
import SelectUser from './pages/selectuser'

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0f1117] text-gray-100">
          <Navbar />
          <main className="max-w-5xl mx-auto px-4 py-8 pb-20 sm:pb-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/select" element={<SelectUser />} />
              <Route path="/new" element={<NewEntry />} />
              <Route path="/entry/:id" element={<SingleEntry />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
          <MobileNav />
        </div>
      </BrowserRouter>
    </UserProvider>
  )
}