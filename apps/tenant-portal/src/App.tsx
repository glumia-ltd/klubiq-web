import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Layout from './components/Layout'
import ExamplePage from './pages/ExamplePage'

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Tenant Portal Home</div>} />
          <Route path="/example" element={<ExamplePage />} />
          {/* Add more routes here */}
        </Routes>
      </Layout>
    </Box>
  )
}

export default App 