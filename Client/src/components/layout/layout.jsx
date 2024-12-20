import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ darkMode, setDarkMode, user, handleLogout }) => {
    return (
        <div>
            <header>
                <Navbar 
                    darkMode={darkMode} 
                    setDarkMode={setDarkMode} 
                    user={user} 
                    handleLogout={handleLogout} 
                />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;