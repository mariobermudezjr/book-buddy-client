import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styled from '@emotion/styled'
import { shades } from '../../theme'
import { decreaseCount, increaseCount, removeFromCart, setIsCartOpen } from '../../state'
import { useNavigate } from 'react-router-dom'

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CartMenu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)

  const totalPrice = cart.reduce((total, book) => {
    return total + book.count * book.attributes.price
  }, 0)

  return (
    <Box // Overlay
      display={isCartOpen ? 'block' : 'none'}
      backgroundColor="rgba(0,0,0 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box // Modal
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/*Header*/}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* Cart List */}
          <Box>
            {cart.map((book) => (
              <Box key={`${book.attributes.bookName}-${book.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={book?.bookName}
                      width="123px"
                      hieght="164px"
                      src={`http://localhost:1337${book?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    {/* Item Name */}
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">{book.attributes.bookName}</Typography>
                      <IconButton onClick={() => dispatch(removeFromCart({ id: book.id }))}>
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{book.attributes.shortSummary}</Typography>

                    {/* Amount */}
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`q.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton onClick={() => dispatch(decreaseCount({ id: book.id }))}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{book.count}</Typography>
                        <IconButton onClick={() => dispatch(increaseCount({ id: book.id }))}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                      {/* Price */}
                      <Typography fontWeight="bold">${book.attributes.price.toFixed(2)}</Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>
          {/* Actions */}
          <Box m="20 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice.toFixed(2)}</Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: 'white',
                borderRadius: 0,
                minWidth: '100%',
                padding: '20px 40px',
                m: '20px 0',
              }}
              onClick={() => {
                navigate('/checkout')
                dispatch(setIsCartOpen({}))
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CartMenu
