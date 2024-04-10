import { ThemeContextProvider } from './context/ThemeContext/ThemeContext';

import { RouterProvider } from 'react-router-dom';
import { router } from './router/RouterPaths';

function App() {
  return (
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  );
}

export default App;
