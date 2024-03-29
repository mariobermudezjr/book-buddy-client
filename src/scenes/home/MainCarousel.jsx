import { Box, Typography, IconButton, useMediaQuery } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { shades } from '../../theme'

// imports all image from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace('./', '')] = r(item)
    return acc
  }, {})

// create a list of landing page words that go with the image
const landingPageWords = [
  'Read What Matters',
  '2024 Spring Sale',
  'Expand Your Knowledge',
  'New Year | New Book',
  'Read Abundantly',
  'Manifest Imagination',
]

const heroTextureImports = importAll(require.context('../../assets', false, /\.(png|jpe?g|svg)$/))

const MainCarousel = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')

  const handleMove = () => {
    window.scrollTo({ top: 607, behavior: 'smooth' }) // here it goes
  }

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '0',
            color: 'white',
            padding: '5px',
            zIndex: '10',
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '0',
            color: 'white',
            padding: '5px',
            zIndex: '10',
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: '100%',
              height: '700px',
              objectFit: 'cover',
              backgroundAttachment: 'fixed',
            }}
          />
          <Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            top="46%"
            left={isNonMobile ? '10%' : '0'}
            right={isNonMobile ? undefined : '0'}
            margin={isNonMobile ? undefined : '0 auto'}
            maxWidth={isNonMobile ? undefined : '240px'}
          >
            <Typography color={shades.secondary[700]}>-- Collection</Typography>
            <Typography variant="h1">{landingPageWords[index]}</Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[700]}
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              variant="h4"
              onClick={handleMove}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  )
}

export default MainCarousel
