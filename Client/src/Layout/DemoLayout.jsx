import React from 'react';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { makeRequest } from '../Axios';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';

const DemoLayout = () => {

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const handleLogout = () => {
        axiosPrivate.post('/auth/logout')
            .then((res) => {
                console.log("Logged Out");
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className='bg-orange-500 w-full shadow-xl fixed py-4 px-12'>
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-5'>
                        <div className='flex items-center gap-1'>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                            </svg>
                            <span className='text-xl font-bold'>Nishkaiv Bank</span>

                        </div>

                        <NavLink
                            className={({ isActive }) =>
                                `${isActive
                                    ? "bg-white text-orange-600  rounded-md trnas"
                                    : "py-1 px-2"
                                }`
                            }
                            to="/user/create-account"
                        >
                            <div className="flex items-center gap-x-1 cursor-pointer">
                                <p className="text-[16px] font-semibold hover:bg-white hover:text-orange-600 py-1 px-2 rounded-md">/create-account </p>
                            </div>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                `${isActive
                                    ? "bg-white text-orange-600 rounded-md"
                                    : "py-1 px-2"
                                }`
                            }
                            to="/user/fetch-transactions"
                        >
                            <div className="flex items-center gap-x-1 cursor-pointer">
                                <p className="text-[16px] font-semibold hover:bg-white hover:text-orange-600 py-1 px-2 rounded-md">/fetch-transactions</p>
                            </div>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                `${isActive
                                    ? "bg-white text-orange-600 rounded-md"
                                    : "py-1 px-2"
                                }`
                            }
                            to="/user/list-all-accounts"
                        >
                            <div className="flex items-center gap-x-1 cursor-pointer">
                                <p className="text-[16px] font-semibold hover:bg-white hover:text-orange-600 py-1 px-2 rounded-md">/list-all-accounts</p>
                            </div>
                        </NavLink>

                    </div>

                    <div className='cursor-pointer flex items-center text-[16px] font-semibold hover:bg-white hover:text-orange-600 py-1 px-2 rounded-md gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        <span onClick={handleLogout}>Logout</span>
                    </div>
                </div>
            </div>
            <main className='bg-[#e9ecf2] pt-20' style={{ minHeight: '100vh' }}>
                <Outlet />
            </main>
        </div >
    )
}

export default DemoLayout