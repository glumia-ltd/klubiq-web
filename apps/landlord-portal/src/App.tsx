import { ThemeContextProvider } from './context/ThemeContext/ThemeContext';
import { Welcome } from './components/Welcome';

function App() {
  return (
    <ThemeContextProvider>
      <Welcome />
    </ThemeContextProvider>
  );
}

export default App;
