import { ThemeContextProvider } from './context/ThemeContext/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { router } from './router/RouterPaths';

const App = () => {
  return (
    // <ThemeContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    // </ThemeContextProvider>
    // <Box sx={{ display: 'flex' }}>
    //   <Layout>
    //     <Routes>
    //       <Route path="/" element={<div>Tenant Portal Home</div>} />
    //       <Route path="/example" element={<ExamplePage />} />
    //       {/* Add more routes here */}
    //     </Routes>
    //   </Layout>
    // </Box>
  )
}

export default App 