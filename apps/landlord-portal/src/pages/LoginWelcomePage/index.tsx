import WelcomePageLayout from '../../Layouts/WelcomePageLayout';
import { useNavigate } from 'react-router-dom';

const LoginWelcomePage = () => {
  const navigate = useNavigate();

  const handleLandLordClick = () => {
    navigate('/login', { replace: true });
  };

  return (
    <WelcomePageLayout
      mainText='Welcome!'
      subText='Where would you like to log in today?'
      handleLandLordClick={handleLandLordClick}
    />
  );
};

export default LoginWelcomePage;
