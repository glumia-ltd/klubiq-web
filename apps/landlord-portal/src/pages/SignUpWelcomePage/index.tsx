import WelcomePageLayout from '../../Layouts/WelcomePageLayout';
import { useNavigate } from 'react-router-dom';

const SignUpWelcomePage = () => {
  const navigate = useNavigate();

  const handleLandLordClick = () => {
    navigate('/signup/createaccount');
  };

  return (
    <WelcomePageLayout
      mainText='Create your Klubiq account'
      subText='I am a'
      handleLandLordClick={handleLandLordClick}
      leftAlignTexts
    />
  );
};

export default SignUpWelcomePage;
