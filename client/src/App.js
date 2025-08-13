import NavBar from "./components/Navbar";
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import SignUpPage from "./components/SingUp";
import LoginPage from "./components/Login";
import HomePage from "./components/Home";
import './styles/main.css';
import DietaPage from "./components/DietaPage";
import GuestPage from "./components/GuestPage";
import { AuthProvider } from './context/AuthContext'; 

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/dieta" element={<DietaPage />} />
                        <Route path="/guestPage" element={<GuestPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;