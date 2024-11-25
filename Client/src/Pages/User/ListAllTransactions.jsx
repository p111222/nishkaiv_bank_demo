import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../Components/PageTitle'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const titleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
    <path fill-rule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
  </svg>
);

const ListAllTransactions = () => {

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the accounts when the component mounts
    const fetchAccounts = async () => {
      try {
        const response = await axios.post('http://43.204.108.73:8349/api/list-account', {
          mobileNumber: user.username,
          // mobileNumber: '3333333333',
        });
        // Use JSON.stringify to store the response data as a string
        console.log("list accounts:-" + JSON.stringify(response.data.accounts));

        // Store the stringified accounts in state
        setAccounts(JSON.stringify(response.data.accounts)); // Store as string
      } catch (err) {
        setError('Failed to fetch accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mt-5 ms-6 me-6">
          <div>
            <PageTitle titleText={'List-All Accounts'} titleIcon={titleIcon} />
          </div>
        </div>
        <hr className="border-gray-300 border-t-2 ms-4 me-4 mt-2" />
        <div className="mt-5 ms-6 me-6">
          {loading && <p>Loading accounts...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && accounts.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Account Number</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Account Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Mobile Number</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>PAN Card</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Aadhar Card</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* We need to parse the JSON string to use it */}
                  {JSON.parse(accounts).map((account) => (
                    <TableRow key={account.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgb(255, 194, 179)", // Change background color on hover
                          color: "rgb(255, 255, 255)",             // Change text color on hover
                        },
                      }}
                    >
                      <TableCell>{account.customerName}</TableCell>
                      <TableCell>{account.accountNumber}</TableCell>
                      <TableCell>{account.accountType}</TableCell>
                      <TableCell>{account.mobileNumber}</TableCell>
                      <TableCell>{account.panCard}</TableCell>
                      <TableCell>{account.aadharCard}</TableCell>
                      <TableCell>{account.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListAllTransactions;
