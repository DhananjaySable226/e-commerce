import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './common/Carousel';

export default function Landing() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/products');
    };

    return (
        <div>
            <div className="main-container">
                <Carousel />
            </div>
            <div className="text-center mt-10">
                <button
                    style={{ backgroundColor: 'red', }}
                    className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white !bg-red-700 !hover:bg-red-800"
                    onClick={handleGetStarted}
                >
                    Get Started
                </button>
            </div>
        </div>
    )
}