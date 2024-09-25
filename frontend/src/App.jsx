import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Notes from "./pages/Notes"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function Logout() { //Clear local storage of any tokens and redirect to login screen
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {  //Clear local storage to prevent token mixup with new account, direct to Register page
  localStorage.clear()
  return <Register />
}

//Will default to home if logged in and authorized (checked via protected route). Otherwise will route to Login.
//Register and other pages may be accessed through links, redirects, or modifying the url directory
//If no directory exists, it will default to the NotFound page
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<RegisterAndLogout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notes" element={<Notes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
