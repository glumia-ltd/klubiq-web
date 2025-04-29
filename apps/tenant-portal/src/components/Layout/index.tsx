import { ReactNode } from 'react'
import { Box, Container } from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default Layout 