import React from 'react';
import { Link } from 'react-router';

const Home = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return (
        <p>Hello world</p>
    );
};

export default Home;