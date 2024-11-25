import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Auth/Login';

const LandingPage = () => {

    const navigate = useNavigate();
    // console.log("prince");
    
    return (
        <div className="bg-gray-100 h-screen flex items-center">
            <div className="container mx-auto">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-semibold  rounded-md mb-6">Welcome to Nishkaiv Bank</h1>

                    <div className="flex space-x-4">
                        <button
                            onClick={() => {
                                navigate('/banklanding')
                            }}
                            className="border-2 border-solid border-orange-500 hover:bg-orange-600 font-semibold hover:text-white text-orange-500 px-6 py-3 rounded-lg">
                            Login
                        </button>
                        {/* <button
                            onClick={() => {
                                navigate('/register')
                            }}
                            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
                            Register
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
