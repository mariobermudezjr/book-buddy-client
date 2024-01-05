import { Box, Button, IconButton, Typography } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarIcon from '@mui/icons-material/Star'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Book from '../../components/Book'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { shades } from '../../theme'
import { addToCart } from '../../state'
import { useDispatch } from 'react-redux'

const BookDetails = () => {
  const dispatch = useDispatch()
  const { bookId } = useParams()
  const [value, setValue] = useState('longSummary')
  const [count, setCount] = useState(1)
  const [book, setBook] = useState(null)
  const [books, setBooks] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  async function getBook() {
    const book = await fetch(`http://localhost:1337/api/books/${bookId}?populate=image`, {
      method: 'GET',
    })
    const bookJson = await book.json()
    setBook(bookJson.data)
  }

  async function getBooks() {
    const books = await fetch(`http://localhost:1337/api/books?populate=image`, {
      method: 'GET',
    })
    const booksJson = await books.json()
    setBooks(booksJson.data)
  }

  useEffect(() => {
    getBook()
    getBooks()
  }, [bookId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Return star value based on rating
  function StarRating(rating) {
    // Round the rating to the nearest half
    const roundedRating = Math.floor(rating)

    // Calculate full, half, and empty stars
    const fullStars = Math.floor(Number(roundedRating))
    const halfStars = rating % 1 >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStars

    return (
      <div>
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} />
        ))}
        {[...Array(halfStars)].map((_, i) => (
          <StarHalfIcon key={`half-${i}`} />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <StarBorderIcon key={`empty-${i}`} />
        ))}
      </div>
    )
  }

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mt="40px">
          <img
            alt={book?.bookName}
            width="75%"
            height="75%"
            src={`http://localhost:1337${book?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Book</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{book?.attributes?.bookName}</Typography>
            <Typography variant="h5">{book?.attributes?.author}</Typography>
            <Typography>${book?.attributes?.price.toFixed(2)}</Typography>
            <Typography sx={{ mt: '20px', textAlign: 'justify' }}>
              {book?.attributes?.longSummary}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: '0 5px' }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: '#222222',
                color: 'white',
                borderRadius: 0,
                minWidth: '150px',
                padding: '10px 40px',
              }}
              onClick={() => dispatch(addToCart({ book: { ...book, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: '5px' }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>GENRES: {book?.attributes?.genre}</Typography>
            {book?.attributes?.starRating && (
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column',
                  alignItems: 'start',
                  justifyContent: 'start',
                }}
              >
                <Box>{book?.attributes?.starRating} stars </Box>
                <Box display="flex">{StarRating(book?.attributes?.starRating)}</Box>
              </div>
            )}
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="SHORT SUMMARY" value="shortSummary" />
          <Tab label="LONG SUMMARY" value="longSummary" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === 'shortSummary' && (
          <div style={{ textAlign: 'justify' }}>{book?.attributes?.shortSummary}</div>
        )}
        {value === 'longSummary' && (
          <div style={{ textAlign: 'justify' }}>{book?.attributes?.longSummary}</div>
        )}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {books.slice(0, 4).map((book, i) => (
            <Book key={`${book.bookName}-${i}`} book={book} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default BookDetails
