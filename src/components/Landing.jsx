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
            <div className="text-center mt-10 ">
                <div className="flex items-center h-screen text-center">
                    <button
                        style={{ width: '130px', height: '40px', border: 'none', textAlign:'center', borderRadius:'10px', marginLeft:"45%", hover:"#357ab8"}}
                        className="bg-red-700 hover:bg-red-800 text-white text-lg font-semibold rounded"
                        onClick={handleGetStarted}
                    >
                        Get Started
                    </button>
                </div>

            </div>
        </div>
    )
}