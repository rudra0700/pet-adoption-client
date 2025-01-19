import React from 'react';
import Navbar from '../../Components/Navbar';
import Banner from '../../Components/Banner';

const Home = () => {
    return (
        <div className='container mx-auto'>
             <Navbar></Navbar>
             <Banner></Banner>
        </div>
    );
};

export default Home;