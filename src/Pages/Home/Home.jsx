import React from 'react';
import { Link } from 'react-router';
import AllPost from '../AllPost/AllPost';

const Home = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return (
        <div className='bg-blue-400'>
            <AllPost/>
        </div>
        
    );
};

export default Home;
