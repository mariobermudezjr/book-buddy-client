import { useDispatch, useSelector } from 'react-redux'
import { Badge, Box, IconButton, Typography } from '@mui/material'
import { PersonOutline, SearchOutlined } from '@mui/icons-material'

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import { useNavigate } from 'react-router-dom'
import { shades } from '../../theme'
import { setIsCartOpen } from '../../state'
import logo from '../../assets/logo/light-logo.png'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="10%"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="90%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            '&:hover': { cursor: 'pointer' },
          }}
          color={shades.secondary[500]}
        >
          <img
            alt={'book-buddy-logo'}
            width="40px"
            height="40px"
            src={logo}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <Typography variant="h4" ml={2} fontWeight={'bold'}>
            {' '}
            BOOK BUDDY
          </Typography>
        </Box>
        <Box display="flex" justifycontent="space-between" columnGap="20px" zIndex="2">
          <IconButton>
            <SearchOutlined sx={{ fontSize: '1.3em', color: 'black' }} />
          </IconButton>
          <IconButton>
            <PersonOutline sx={{ fontSize: '1.3em', color: 'black' }} />
          </IconButton>
          <Badge
            // Warning was being thrown. Action: Comment out. TODO: Find way to enter badge content
            badgeContent={cart.length}
            color="#1A76D2"
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 8,
                top: 8,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                fontSize: '1em',
              },
            }}
          >
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <ShoppingBagOutlinedIcon sx={{ fontSize: '1.3em', color: 'black' }} />
            </IconButton>
          </Badge>
          <IconButton>
            <MenuOutlinedIcon sx={{ fontSize: '1.3em', color: 'black' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
