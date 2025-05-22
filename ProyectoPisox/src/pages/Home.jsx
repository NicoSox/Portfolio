import React from 'react'
import Navbar from '../Components/Navbar.jsx';
import Mainhome from '../Components/home/Mainhome.jsx'
import Footer from '../Components/Footer.jsx'
const Home = () => {
    return (
        <>
            <div className="app-wrapper"> 
                <Navbar />
                <Mainhome />
                <Footer />
            </div>
        </>
    )
}
export default Home;