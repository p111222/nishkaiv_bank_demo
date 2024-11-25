import React, { useCallback, useContext, useEffect, useState } from 'react'
import PageTitle from '../../Components/PageTitle';
import Button from '@mui/material/Button';
import MenuComponent from '../../Components/MenuComponent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DateRangePickerComponent from '../../Components/DateRangePickerComponent';
import { axiosPrivate } from '../../Axios';
import { AuthContext } from '../../Context/AuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const titleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>

);

// const transactionsMockData = [
//   {
//     mobile_no: '3333333333',
//     account_no: 'ACC8940693310',
//     txn_date: '2024-10-03',
//     value_date: '2024-10-03',
//     description: 'INR 267.13 credited to YES BANK Ac 3088648322 on 16Nov24 11:44. UPI:T896559/From:Heather Martin@ybl. Bal INR 3711.13.',
//     ref_id: 'T714660',
//     credit: 267.13,
//     debit: 0.0,
//     closing_balance: 3711.13,
//   },
//   {
//     mobile_no: '3333333333',
//     account_no: 'ACC8940693310',
//     txn_date: '2024-08-25',
//     value_date: '2024-08-25',
//     description: 'INR 388.71 credited to YES BANK Ac 9037717264 on 16Nov24 11:44. UPI:T461164/From:Terry Fisher@ybl. Bal INR 4099.84.',
//     ref_id: 'T613396',
//     credit: 388.71,
//     debit: 0.0,
//     closing_balance: 4099.84,
//   },
//   {
//     mobile_no: '3333333333',
//     account_no: 'ACC8940693310',
//     txn_date: '2024-09-24',
//     value_date: '2024-09-24',
//     description: 'INR 2165.54 debited from HDFC BANK Ac 5828857491 on 16Nov24 11:44. UPI:T595799/To:Christopher Knox@ybl. Bal INR 1934.30.',
//     ref_id: 'T708477',
//     credit: 0.0,
//     debit: 2165.54,
//     closing_balance: 1934.3,
//   },
// ];


const FetchTransactons = () => {

  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [accountNumber, setAccountNumber] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Account Types');
  // const [transactions, setTransactions] = useState(transactionsMockData);

  const handleMenuSelect = async (item) => {
    setSelectedMenuItem(item);
    setAnchorEl(null);

  };

  useEffect(() => {
    const fetchAccountNumber = async () => {
      try {
        console.log("accountType" + selectedMenuItem);

        const response = await axios.post('http://43.204.108.73:8349/api/get-account-number', {
          mobileNumber: user.username,
          accountType: selectedMenuItem,
        });
        console.log("fetchTrans" + JSON.stringify(response.data));

        setAccountNumber(response.data.accountNumber);
      } catch (err) {
        setError('Failed to fetch account number. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchAccountNumber();
  }, [selectedMenuItem]);

  console.log(selectedMenuItem);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleDateRangeChange = (range) => {
  //   setSelectedDateRange(range);
  //   console.log('Selected Date Range:', range);
  // };

  const handleDateRangeChange = async (range) => {
    setSelectedDateRange(range);
    console.log('Selected Date Range:', range);

    if (range) {
      const { startDate, endDate } = range;
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];

      setLoading(true);
      setError('');
      try {
        const response = await axios.post('http://43.204.108.73:8349/api/fetch-records', {
          mobileNumber: user.username,
          accountNumber: accountNumber,
          fromDate: formattedStartDate,
          toDate: formattedEndDate,
        });
        console.log("fetchTran" + JSON.stringify(response.data));

        if (response.data && response.data.Statement) {
          setTransactions(response.data.Statement);
        } else {
          setTransactions([]); // Set to empty array if data is not as expected
        }
      } catch (err) {
        setError('Failed to fetch transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleDateRangePicker = () => {
    setShowDateRangePicker((prev) => !prev);
  };

  const formatDateRange = (range) => {
    if (!range) return 'Select a Date Range';
    const { startDate, endDate } = range;
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  return (
    <div>
      <div className='flex justify-between items-center mt-5 ms-6 me-6'>
        <div>
          <PageTitle titleText={'Fetch Transactions'} titleIcon={titleIcon} />
        </div>
        <div className="flex gap-3">
          <div className="border-2 border-solid border-orange-500 text-black hover:bg-orange-500 hover:text-white rounded-lg py-1 px-2">
            <button
              id="demo-customized-button"
              aria-controls={menuOpen ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleClick}
              className="font-medium flex items-center gap-1"
            >
              {selectedMenuItem}
              <KeyboardArrowDownIcon />
            </button>
          </div>

          <div className="border-2 border-solid border-orange-500 text-black hover:bg-orange-500 hover:text-white rounded-lg py-1 px-2">
            <button
              onClick={toggleDateRangePicker}
              className="font-medium flex items-center gap-1"
            >
              {formatDateRange(selectedDateRange)}
            </button>
          </div>

        </div>


      </div>
      <hr className=' border-gray-300 border-t-2 ms-4 me-4 mt-2' />

      {showDateRangePicker && (
        <div className='flex justify-end me-4'>
          <DateRangePickerComponent
            onDateRangeChange={handleDateRangeChange}
            onClose={() => setShowDateRangePicker(false)}
          />
        </div>
      )}

      {menuOpen &&
        <MenuComponent
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          menuOpen={menuOpen}
          onMenuSelect={handleMenuSelect}

        />
      }

      <div className="mt-5 ms-6 me-6">
        {loading && <p>Loading transactions...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && transactions.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Transaction Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Credit</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Debit</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Closing Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgb(255, 194, 179)", // Change background color on hover
                        color: "rgb(255, 255, 255)",             // Change text color on hover
                      },
                    }}
                  >
                    <TableCell className="hover-effect">{transaction.txnDate}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.credit}</TableCell>
                    <TableCell>{transaction.debit}</TableCell>
                    <TableCell>{transaction.closingBalance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

    </div>
  )
}

export default FetchTransactons