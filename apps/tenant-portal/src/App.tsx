import { ThemeContextProvider } from './context/ThemeContext/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { router } from './router/RouterPaths';
import { AuthProvider } from './context/AuthContext/AuthProvider';
const App = () => {
  return (
    <ThemeContextProvider>
      <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
      </AuthProvider>
    </ThemeContextProvider>
  )
}

export default App;
