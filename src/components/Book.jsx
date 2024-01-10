import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { shades } from '../theme'
import { addToCart, setIsCartOpen } from '../state'
import { useNavigate } from 'react-router-dom'

const Book = ({ book, width }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const {
    palette: { neutral },
  } = useTheme()

  const { genre, price, bookName, author, image } = book.attributes
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
    <Box
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      width={width}
      sx={{ padding: '2em', boxShadow: 3, borderRadius: '6px' }}
    >
      <Box position="relative">
        <img
          alt={book.bookName}
          width="250px"
          height="350px"
          src={`http://localhost:1337${url}`}
          onClick={() => navigate(`/book/${book.id}`)}
          style={{ cursor: 'pointer' }}
        />
        <Box
          display={isHovered ? 'block' : 'none'}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 10%"
        ></Box>
      </Box>

      {/* Title, Author, Price */}
      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {genre.replace(/([A-Z])/g, '$1').replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography fontWeight="bold">{bookName}</Typography>
        <Typography style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          {author}
        </Typography>
        <Typography fontWeight="bold">${price.toFixed(2)}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" marginTop="0.5em">
        {/* Amount */}
        <Box
          display="flex"
          alignItems="center"
          backgroundColor={shades.neutral[100]}
          borderRadius="3px"
          mr="2em"
        >
          <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
            <RemoveIcon
              sx={{
                ':hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          </IconButton>
          <Typography color={shades.primary[300]}>{count}</Typography>
          <IconButton onClick={() => setCount(Math.max(count + 1))}>
            <AddIcon
              sx={{
                ':hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          </IconButton>
        </Box>
        {/* Add to Cart Button */}
        <Button
          onClick={() => {
            dispatch(addToCart({ book: { ...book, count } }))
            // dispatch(setIsCartOpen({}))
          }}
          sx={{
            backgroundColor: shades.primary[300],
            color: 'white',
            ':hover': {
              backgroundColor: shades.primary[400],
              transform: 'scale(1.03)',
            },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  )
}

export default Book
