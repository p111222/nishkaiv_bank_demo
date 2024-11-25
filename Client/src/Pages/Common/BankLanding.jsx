import React from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PiggyBank from '../../assets/ceramic-piggy-bank-coins.jpg'
import { useNavigate } from 'react-router-dom';

const BankLanding = () => {
    const navigate = useNavigate();
    return (
        <>

            <div className="h-screen flex items-center justify-center bg-gradient-to-bl from-[#CC4A18] to-[#DE651B]">

                <button onClick={()=>{navigate('/login')}} className="absolute top-4 right-4 flex items-center gap-2 bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-2xl hover:bg-white hover:text-orange-600 transition">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Login</span>
                </button>   

                <div className='flex flex-col gap-2'>
                    <div className='flex text-sm font-bold text-white italic gap-x-1'>
                        <p>Bhandup LBS MARG</p>
                        <PlayArrowRoundedIcon />
                        <p>421201</p>
                    </div>
                    <div>
                        <p className='text-6xl font-semibold text-white'>Nishkaiv Bank</p>
                    </div>
                    <div>
                        <p className='text-xl font-bold text-white italic'>Visit the Bank, feel the innovative style of investing</p>
                    </div>
                    <div className='w-[33em] h-60 rounded-2xl mt-5 shadow-3xl bg-white'>
                        <div className='h-8 bg-orange-600 rounded-t-2xl'>
                            <div className='flex justify-between items-center'>
                                <p className='ms-3 mt-1 font-semibold text-white'>Nishkaiv Smart Card</p>
                                <p className='me-3 font-semibold text-white'>Smart Investing</p>
                            </div>
                        </div>
                        <div className='flex gap-2 mt-5 ps-4 pe-4'>
                            <div className='w-[50%] border-2 border-t-slate-300 border-r-slate-300 bg-slate-200'>
                                <div>
                                    <p className='text-lg font-semibold text-orange-600'>BHANDUP</p>
                                    <p className='text-lg font-semibold text-orange-600'>NISHKAIV BANK</p>
                                </div>
                                <div className='mt-7'>
                                    <div className='flex gap-9 ps-3 pe-3'>
                                        <div>
                                            <p className='text-xs fon'>1002029383332</p>
                                            <p className='text-xs'>2349323032232</p>
                                            <p className='text-xs'>5394858592025</p>
                                        </div>
                                        <div>
                                            <p className='text-xs'>3948394020390</p>
                                            <p className='text-xs'>3948394020394</p>
                                            <p className='text-xs'>3948394020394</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[50%]'>
                                <img src={PiggyBank} alt="" className='w-60 h-36' />
                            </div>
                        </div>
                        <div className='flex gap-5 ps-7 mt-2 font-semibold'>
                            <p>1234 5678 7890 1234 0987 6543</p>
                            <p className='font-bold text-orange-600'>NISHKAIV SMART CARD</p>
                        </div>
                    </div>
                    <div className='flex gap-14 ms-1 mt-10'>
                        <div className='text-[15px] font-semibold bg-orange-600 shadow-3xl hover:bg-white hover:text-orange-600 py-1 px-2 rounded-md'>
                            <p>Gold Loan</p>
                        </div>
                        <div className='text-[15px] font-semibold bg-orange-600 shadow-3xl hover:bg-white hover:text-orange-600 py-1 px-2 rounded-md'>
                            <p>House Loan</p>
                        </div>
                        <div className='text-[15px] font-semibold bg-orange-600 shadow-3xl hover:bg-white hover:text-orange-600 py-1 px-2 rounded-md'>
                            <p>Bonds</p>
                        </div>
                        <div className='text-[15px] font-semibold bg-orange-600 shadow-3xl hover:bg-white hover:text-orange-600 py-1 px-2 rounded-md'>
                            <p>Property Loan</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BankLanding