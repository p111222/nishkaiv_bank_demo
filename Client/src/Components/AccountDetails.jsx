import React from 'react'
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
import SubmitConfirm from './SubmitConfirm';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fontWeight } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',

    '&::-webkit-scrollbar': {
        width: '8px', // Set the width of the scrollbar
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Thumb color
        borderRadius: '10px', // Round the thumb
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Track color
    },
};

const tableStyle = {
    maxHeight: '300px', // Set max height for table content area
    overflowY: 'auto',  // Enable scrolling inside the table container if necessary
};

const titleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>

);

const AccountDetails = ({ accountDetailsOpen, setAccountDetailsOpen, accountDetailsResponse, setAccountDetailsResponse, setSubmitConfirmOpen }) => {

    const handleAccountDetailsOpen = () => { setAccountDetailsOpen(true); }
    const handleAccountDetailsClose = () => { setAccountDetailsOpen(false); setSubmitConfirmOpen(false);}

    console.log("accres:" + accountDetailsResponse);

    return (
        <div>
            <Button onClick={handleAccountDetailsOpen}>Open modal</Button>
            <Modal
                open={accountDetailsOpen}
                onClose={handleAccountDetailsClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex justify-between items-center'>
                        <PageTitle titleText={'Account Details'} titleIcon={titleIcon} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={handleAccountDetailsClose} className="size-6 mb-2 hover:cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <hr className=' border-gray-300 border-t-2' />

                    <div className="mt-3">
                        <TableContainer component={Paper} >
                            <Table aria-label="account details table">
                                {/* <TableHead>
                                    <TableRow>
                                        <TableCell>Field Name</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead> */}
                                <TableBody>
                                    {Array.isArray(JSON.parse(accountDetailsResponse)) ? (
                                        JSON.parse(accountDetailsResponse).map((account, index) => (
                                            <React.Fragment key={index}>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', width: '200px', whiteSpace: 'nowrap' }}>Customer Id</TableCell>
                                                    <TableCell>{account.customerId}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', width: '200px', whiteSpace: 'nowrap' }}>Customer Name</TableCell>
                                                    <TableCell>{account.customerName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', width: '200px', whiteSpace: 'nowrap' }}>Pan Card</TableCell>
                                                    <TableCell>{account.panCard}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', width: '200px', whiteSpace: 'nowrap' }}>Aadhar Card</TableCell>
                                                    <TableCell>{account.aadharCard}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', width: '200px', whiteSpace: 'nowrap' }}>Address</TableCell>
                                                    <TableCell>{account.address}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', width: '200px', whiteSpace: 'nowrap' }}>Mobile Number</TableCell>
                                                    <TableCell>{account.mobileNumber}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', width: '200px', whiteSpace: 'nowrap' }}>Account Type</TableCell>
                                                    <TableCell>{account.accountType}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', width: '200px', whiteSpace: 'nowrap' }}>Account Number</TableCell>
                                                    <TableCell>{account.accountNumber}</TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={2}>No account details available.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className='flex justify-center mt-1'>

                        <div className='w-fit border-2 border-solid border-orange-500 text-black hover:bg-orange-500 hover:text-white rounded-lg py-1 px-2 mt-3'>
                            <button className='font-medium' onClick={handleAccountDetailsClose}>Close</button>
                        </div>

                    </div>

                </Box>
            </Modal>
        </div>
    )
}

export default AccountDetails