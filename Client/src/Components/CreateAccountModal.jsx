import React, { useState } from 'react'
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

const titleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
  </svg>


);

const CreateAccountModal = ({ open, setOpen }) => {
  const [submitConfirmOpen, setSubmitConfirmOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateAccount = () => {
    setSubmitConfirmOpen(true);
  }

  const handleAccountTypeChange = (event) => {
    setSelectedAccountType(event.target.value);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex justify-between items-center'>
            <PageTitle titleText={'Create Account'} titleIcon={titleIcon} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={handleClose} className="size-6 mb-2 hover:cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <hr className=' border-gray-300 border-t-2' />
          <div className='mt-2'>
            <FormControl>
              {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedAccountType} onChange={handleAccountTypeChange}
              >
                <div className='flex flex-col'>
                  <FormControlLabel value="Current Account" control={<Radio />} label="Current Account" />
                  <FormControlLabel value="Saving Account" control={<Radio />} label="Saving Account" />
                  <FormControlLabel value="Fixed Deposit Account" control={<Radio />} label="Fixed Deposit Account" />
                  <FormControlLabel value="Recurring Deposit Account" control={<Radio />} label="Recurring Deposit Account" />
                </div>
              </RadioGroup>
            </FormControl>
          </div>
          <div className='flex justify-center'>
            {selectedAccountType ?
              <div className='w-fit border-2 border-solid border-orange-500 text-black hover:bg-orange-500 hover:text-white rounded-lg py-1 px-2 mt-3'>
                <button className='font-medium' onClick={handleCreateAccount}>Create Account</button>
              </div>
              :
              <div className='w-fit border-2 border-solid border-slate-300 text-black hover:bg-slate-300 hover:cursor-not-allowed hover:text-black rounded-lg py-1 px-2 mt-3'>
                <button className='font-medium hover:cursor-not-allowed'>Create Account</button>
              </div>
            }
          </div>

        </Box>
      </Modal>
      {submitConfirmOpen &&
        <SubmitConfirm
          submitConfirmOpen={submitConfirmOpen}
          setSubmitConfirmOpen={setSubmitConfirmOpen}
          setOpen={setOpen}
          selectedAccountType={selectedAccountType}
        />
      }
    </div >

  );
}

export default CreateAccountModal