import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { styled, alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

const MenuComponent = ({ anchorEl, setAnchorEl, menuOpen, onMenuSelect }) => {

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (item) => {
    onMenuSelect(item); // Notify parent of the selection
  };

  return (
    <div>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
      >
        <div className='hover:bg-slate-200'>
          <MenuItem onClick={() => handleMenuClick('Current Account')} disableRipple>
            {/* <EditIcon /> */}
            <div >
              Current Account
            </div>
          </MenuItem>
        </div>
        <div className='hover:bg-slate-200'>
          <MenuItem onClick={() => handleMenuClick('Saving Account')} disableRipple>
            {/* <FileCopyIcon /> */}
            Saving Account
          </MenuItem>
        </div>
        <div className='hover:bg-slate-200'>
          <MenuItem onClick={() => handleMenuClick('Fixed Deposit Account')} disableRipple>
            {/* <FileCopyIcon /> */}
            Fixed Deposit Account
          </MenuItem>
        </div>
        <div className='hover:bg-slate-200'>
          <MenuItem onClick={() => handleMenuClick('Recurring Deposit Account')} disableRipple>
            {/* <FileCopyIcon /> */}
            Recurring Deposit Account
          </MenuItem>
        </div>
      </StyledMenu>
    </div>
  )
}

export default MenuComponent