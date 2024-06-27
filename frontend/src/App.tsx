import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Access/Login'
import { Signup } from './Pages/Access/Signup'
import { Home } from './Pages/Home'
import { Protected } from './Pages/Protected'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user" element={<Protected />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
