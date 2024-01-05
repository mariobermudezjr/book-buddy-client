import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { shades } from '../../theme'

function Footer() {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'))

  const {
    palette: { neutral },
  } = useTheme()
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography variant="h4" fontWeight="bold" mb="30px" color={shades.secondary[500]}>
            BOOK BUDDY
          </Typography>
          {isDesktop ? (
            <div
              style={{
                textAlign: 'justify',
              }}
            >
              Book Buddy is a conceptual online bookstore, designed as a portfolio project to
              exhibit top-notch web development capabilities. This virtual emporium boasts an
              extensive collection of literary works, spanning various genres to satisfy the avid
              reader. With a user-friendly interface and streamlined search functionality, it
              ensures that book lovers can effortlessly find their next great read at a fair price.
              Book Buddy is not a commercial entity but a testament to creative and technical
              proficiency, crafted to demonstrate the potential of innovative web solutions in
              creating engaging and efficient digital experiences.
            </div>
          ) : (
            <div>
              Book Buddy is a conceptual online bookstore, designed as a portfolio project to
              exhibit top-notch web development capabilities.
            </div>
          )}
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px" sx={{ ':hover': { cursor: 'pointer' } }}>
            Careers
          </Typography>
          <Typography mb="30px" sx={{ ':hover': { cursor: 'pointer' } }}>
            Our Stores
          </Typography>
          <Typography mb="30px" sx={{ ':hover': { cursor: 'pointer' } }}>
            Terms & Conditions
          </Typography>
          <Typography mb="30px" sx={{ ':hover': { cursor: 'pointer' } }}>
            Privacy Policy
          </Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px" sx={{ ':hover': { cursor: 'pointer' } }}>
            Help Center
          </Typography>
          <Typography mb="30px" sx={{ ':hover': { cursor: 'pointer' } }}>
            Track Your Order
          </Typography>
          <Typography mb="30px" sx={{ ':hover': { cursor: 'pointer' } }}>
            Corporate & Bulk Purchasing
          </Typography>
          <Typography mb="30px" sx={{ ':hover': { cursor: 'pointer' } }}>
            Returns & Refunds
          </Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            sx={{ ':hover': { cursor: 'pointer' } }}
          >
            Contact Us
          </Typography>
          <Typography mb="30px">Address: Los Angeles, California, USA</Typography>
          <Typography mb="30px" sx={{ wordWrap: 'break-word' }}>
            Email: mario.bermudez.jr@gmail.com
          </Typography>
          <Typography mb="30px">Phone: (562) 000-0000</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
