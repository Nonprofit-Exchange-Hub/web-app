import { SignUpProvider } from '../components/Users/Auth/SignUpCitizen/Provider';
import SignUpCitizenV2 from '../components/Users/Auth/SignUpCitizen/SignUpCitizenV2';

function SignUpCitizenViewV2() {
  return (
    <SignUpProvider>
      <SignUpCitizenV2 />
    </SignUpProvider>
  );
}

export default SignUpCitizenViewV2;
