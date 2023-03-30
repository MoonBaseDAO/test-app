import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import { useNear } from 'src/hooks/use-near';
import { useWalletSelector } from '@/contexts/wallet-selector-context';

export const AccountPopover = (props) => {
  const { modal, accountId } = useWalletSelector();
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  const handleConnectNear = () => {
    modal.show();
  }

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );
  
  const handleConnectWebAuth = () => {
  // Use Web3Auth to authenticate the user
  web3Auth
    .login()
    .then(() => {
      setIsLoggedIn(true);
    })
    .catch((error) => {
      console.error("Error logging in with Web3Auth:", error);
    });
}

  
  const handle = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Awesome User
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleConnectNear}>
          {accountId ? accountId : 'Ⓝ Connect'}
        </MenuItem>
        <MenuItem onClick={handleConnectWebAuth}>
          Connect with Web3Auth
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
