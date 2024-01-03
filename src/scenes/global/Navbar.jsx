import { useDispatch, useSelector } from 'react-redux'
import { Badge, Box, IconButton } from '@mui/material'
import { PersonOutline, SearchOutlined } from '@mui/icons-material'

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import { useNavigate } from 'react-router-dom'
import { shades } from '../../theme'
import { setIsCartOpen } from '../../state'

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
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate('/')}
          sx={{ '&:hover': { cursor: 'pointer' } }}
          color={shades.secondary[500]}
        >
          BOOK BUDDY
        </Box>
        <Box display="flex" justifycontent="space-between" columnGap="20px" zIndex="2">
          <IconButton>
            <SearchOutlined sx={{ color: 'black' }} />
          </IconButton>
          <IconButton>
            <PersonOutline sx={{ color: 'black' }} />
          </IconButton>
          <Badge
            badgeContnent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px',
              },
            }}
          >
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <ShoppingBagOutlinedIcon sx={{ color: 'black' }} />
            </IconButton>
          </Badge>
          <IconButton>
            <MenuOutlinedIcon sx={{ color: 'black' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
