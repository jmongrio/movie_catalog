import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Access/Login'
import { Signup } from './Pages/Access/Signup'
import { Home } from './Pages/Home'
import { Users } from './Pages/Users'
import { NotFound } from './Pages/HttpCodes/NotFound'
import { Forbidden } from './Pages/HttpCodes/Forbidden'
import { Unauthorized } from './Pages/HttpCodes/Unauthorized'
import { LoadingComponent } from './Components/LoadingComponent'
import { ProtectedRoute } from './Components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard/user" element={<Users />} />,
            <Route path="/dashboard/l" element={<LoadingComponent />} />
        </Route>

      // Http codes
        <Route path="/404" element={<NotFound />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/401" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App