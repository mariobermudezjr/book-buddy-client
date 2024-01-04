import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material'
import Book from '../../components/Book'
import { setBook } from '../../state'

const ShoppingList = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('all')
  const books = useSelector((state) => state.cart.books)
  const isNonMobile = useMediaQuery('min-width:600px')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  async function getBooks() {
    const books = await fetch('http://localhost:1337/api/books?populate=image', { method: 'GET' })

    const booksJson = await books.json()
    dispatch(setBook(booksJson.data))
  }

  useEffect(() => {
    getBooks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const nonFiction = books.filter((book) => book.attributes.genre === 'non-fiction')
  const psychologyBooks = books.filter((book) => book.attributes.genre === 'psychology')
  const biographyBooks = books.filter((book) => book.attributes.genre === 'biography')

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured Books
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centeredTabIndicatorProps={{ sx: { display: isNonMobile ? 'block' : 'none' } }}
        sx={{
          m: '25px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NON-FICTION" value="non-fiction" />
        <Tab label="PSYCHOLOGY" value="psychology" />
        <Tab label="BIOGRAPHY" value="biography" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === 'all' &&
          books.map((book) => <Book book={book} key={`${book.bookName}-${book.id}`} />)}
        {value === 'non-fiction' &&
          nonFiction.map((book) => <Book book={book} key={`${book.bookName}-${book.id}`} />)}
        {value === 'psychology' &&
          psychologyBooks.map((book) => <Book book={book} key={`${book.bookName}-${book.id}`} />)}
        {value === 'biography' &&
          biographyBooks.map((book) => <Book book={book} key={`${book.bookName}-${book.id}`} />)}
      </Box>
    </Box>
  )
}

export default ShoppingList
