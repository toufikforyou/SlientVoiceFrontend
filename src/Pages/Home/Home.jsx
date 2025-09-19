import React from 'react';
import { Link } from 'react-router';
import AllPost from '../AllPost/AllPost';

const Home = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return (
        <div>
            <p className='bg-blue-400 p-4 rounded-2xl'>নিরাপদ ও নিরonymously civic সমস্যা রিপোর্ট করার প্ল্যাটফর্ম</p>
            <input type="search" name="" id="" />
            <AllPost/>
        </div>
        
    );
};

export default Home;
