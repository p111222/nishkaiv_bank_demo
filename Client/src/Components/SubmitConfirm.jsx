import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PageTitle from './PageTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { axiosPrivate } from '../Axios';
import { AuthContext } from '../Context/AuthContext';
import AccountDetails from './AccountDetails';
import ToastComponent from './ToastComponent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: 24,
    p: 3,
};

const titleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>

);

const SubmitConfirm = ({ submitConfirmOpen, setSubmitConfirmOpen, setOpen, selectedAccountType }) => {

    const { user } = useContext(AuthContext);
    const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);
    const [accountDetailsResponse, setAccountDetailsResponse] = useState();
    const handleSubmitConfirmOpen = () => { setSubmitConfirmOpen(true); }
    const handleSubmitConfirmClose = () => { setSubmitConfirmOpen(false); setOpen(false); }
    const [toastOpen, setToastOpen] = useState({ open: false, msg: '' }); // Toast state

    console.log("User from app response:", user.username + selectedAccountType);

    const handleConfirmAccount = () => {
        axiosPrivate.post('http://43.204.108.73:8349/api/create-account', {
            mobileNumber: user.username,
            accountType: selectedAccountType
        })
            .then((res) => {
                console.log("response:" + JSON.stringify(res.data));
                setAccountDetailsResponse(JSON.stringify(res.data));
                setAccountDetailsOpen(true);

                setToastOpen({
                    open: true,
                    msg: `${selectedAccountType} account successfully created!`, // Customize message based on account type
                });
            })
            .catch((error) => {
                console.error("Error creating account:", error);
            });
    }

    const handleCancelAccount = () => {
        setSubmitConfirmOpen(false)
    }

    return (
        <div>
            <Button onClick={handleSubmitConfirmOpen}>Open modal</Button>
            <Modal
                open={submitConfirmOpen}
                onClose={handleSubmitConfirmClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex justify-between items-center'>
                        <PageTitle titleText={'Confirm Submission'} titleIcon={titleIcon} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={handleCancelAccount} className="size-6 mb-2 hover:cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>
                    <hr className=' border-gray-300 border-t-2' />
                    <div className='mt-2'>
                        <p>Do you wish to open {selectedAccountType}?</p>
                    </div>

                    <div className='flex justify-end gap-2'>
                        <div className='w-fit border-2 border-solid border-orange-500 text-black hover:bg-orange-500 hover:text-white rounded-lg py-1 px-2 mt-3'>
                            <button className='font-medium' onClick={handleConfirmAccount}>Yes</button>
                        </div>
                        <div className='w-fit border-2 border-solid border-red-500 text-black hover:bg-red-500 hover:text-white rounded-lg py-1 px-2 mt-3'>
                            <button className='font-medium' onClick={handleCancelAccount}>No</button>
                        </div>
                    </div>

                </Box>
            </Modal>

            {accountDetailsOpen &&
                <AccountDetails
                    accountDetailsOpen={accountDetailsOpen}
                    setAccountDetailsOpen={setAccountDetailsOpen}
                    accountDetailsResponse={accountDetailsResponse}
                    setAccountDetailsResponse={setAccountDetailsResponse}
                    setSubmitConfirmOpen={setSubmitConfirmOpen}
                />
            }
            {toastOpen &&
                <ToastComponent toastOpen={toastOpen} />
            }
        </div >

    );
}

export default SubmitConfirm