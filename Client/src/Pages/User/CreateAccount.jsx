import React, { useState } from 'react'
// import openBankAccount from '../../assets/open-bank-account.jpg'
import openBankAccount from '../../assets/bank-account.png'
import openBankAccount2 from '../../assets/open-bank-account2.jpg'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CreateAccountModal from '../../Components/CreateAccountModal';
import SubmitConfirm from '../../Components/SubmitConfirm';

const CreateAccount = () => {

  const [open, setOpen] = useState(false);
  const [accountDetails, setAccountDetails] = useState();
  const [submitConfirmOpen, setSubmitConfirmOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState(''); 

  const handleCreateAccount = () => {
    setOpen(true);
  }

  const handleOpenSavingsAccount = () => {
    setSelectedAccountType('Saving Account'); // Set the account type for savings
    setSubmitConfirmOpen(true); // Open the SubmitConfirm modal
  }

  const handleOpenFixedDepositAccount = () => {
    setSelectedAccountType('Fixed Deposit Account'); // Set the account type for fixed deposit
    setSubmitConfirmOpen(true); // Open the SubmitConfirm modal
  }

  const handleOpenRecurringDepositAccount = () => {
    setSelectedAccountType('Recurring Deposit Account'); // Set the account type for recurring deposit
    setSubmitConfirmOpen(true); // Open the SubmitConfirm modal
  }


  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-10 gap-y-5'>
        <div className=''>
          <h4 className="text-3xl text-black font-bold">Start Saving Today</h4>
        </div>
        <div className=''>
          <p className=''>Create savings, fixed deposit, and recurring deposit accounts with ease. Secure your financial future with us.</p>
        </div>
        <div>
          <div className='border-2 border-solid border-orange-500 text-black hover:bg-orange-500 hover:text-white rounded-lg py-1 px-2 transition'>
            <button onClick={handleCreateAccount} className='font-medium flex items-center gap-1'>Create Account</button>
          </div>
        </div>
      </div>
      <div className='mb-5'>
        <div className='flex justify-center w-full box-border mt-10 gap-16 ps-24 '>
          <div>
            <img src={openBankAccount} alt="" className='w-[500px] h-[370px]' />
          </div>
          <div className='flex flex-col gap-10'>
            <div className=''>
              <div>
                <h2 className='text-2xl text-black font-semibold'>Create Savings Account</h2>
                <p className='text-wrap'>Easily create a savings account to start saving for your future.</p>
              </div>
              <div className='w-fit border-2 border-solid border-orange-500 text-black hover:bg-orange-500 hover:text-white rounded-lg px-1 mt-1 transition'>
                <button className='font-normal' onClick={handleOpenSavingsAccount}>Open Savings Account</button>
              </div>
            </div>
            <div>
              <div>
                <h2 className='text-2xl text-black font-semibold'>Fixed Deposit Accounts</h2>
                <p className='text-wrap'>Explore fixed deposit options with competitive interest rates for secure savings.</p>
              </div>
              <div className='w-fit border-2 border-solid border-orange-500 text-black hover:bg-orange-500 hover:text-white rounded-lg px-1 mt-1 transition'>
                <button className='font-normal' onClick={handleOpenFixedDepositAccount}>Open Fixed Deposit Account</button>
              </div>
            </div>
            <div>
              <div>
                <h2 className='text-2xl text-black font-semibold'>Recurring Deposit Accounts</h2>
                <p className='w-[35em] text-wrap'>Set up recurring deposit accounts to regularly save and build your wealth over time.</p>
              </div>
              <div className='w-fit border-2 border-solid border-orange-500 text-black hover:bg-orange-500 hover:text-white rounded-lg px-1 mt-1 transition'>
                <button className='font-normal' onClick={handleOpenRecurringDepositAccount}>Open Recurring Deposit Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        open &&
        <CreateAccountModal
          open={open}
          setOpen={setOpen}
        />
      }

      {
        submitConfirmOpen &&
        <SubmitConfirm
          submitConfirmOpen={submitConfirmOpen}
          setSubmitConfirmOpen={setSubmitConfirmOpen}
          selectedAccountType={selectedAccountType} // Pass the selected account type here
        />
      }
    </div>
  )
}

export default CreateAccount