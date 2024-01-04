import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { shades } from '../theme'
import { addToCart } from '../state'
import { useNavigate } from 'react-router-dom'

const Book = ({ book, width }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const {
    palette: { neutral },
  } = useTheme()

  const { genre, price, bookName, image } = book.attributes
  const {
    data: {
      attributes: {
        formats: {
          small: { url },
        },
      },
    },
  } = image

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={book.bookName}
          width="300px"
          height="400px"
          src={`http://localhost:1337${url}`}
          onClick={() => navigate(`/book/${book.id}`)}
          style={{ cursor: 'pointer' }}
        />
        <Box
          display={isHovered ? 'blocked' : 'none'}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            {/* Amount */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(Math.max(count + 1))}>
                <AddIcon />
              </IconButton>
            </Box>
            {/* Button */}
            <Button
              onClick={() => {
                dispatch(addToCart({ book: { ...book, count } }))
              }}
              sx={{ backgroundColor: shades.primary[300], color: 'white' }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Few Items */}
      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {genre.replace(/([A-Z])/g, '$1').replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{bookName}</Typography>
        <Typography fontWeight="bold">{price}</Typography>
      </Box>
    </Box>
  )
}

export default Book
