import { ReactNode, createContext, useContext, useState } from 'react';
import { UserSignupData } from './UserSignupData';

type Step = 'lets-get-started' | 'about-yourself' | 'interests';

type Props = {
  children: ReactNode;
};

interface SignUpFormContext {
  step: Step;
  setStep: (newStep: Step) => void;
  signUpUser: UserSignupData;
  setSignupUser: (newUserSignUp: UserSignupData) => void;
}

export const SignUpContext = createContext<SignUpFormContext>({} as SignUpFormContext);

export const useSignUp = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }: Props) => {
  const [signUpUser, _setSignUpUser] = useState<UserSignupData>({} as UserSignupData);
  const [step, _setStep] = useState<Step>('lets-get-started');

  const setStep = (newStep: Step) => {
    _setStep(newStep);
  };

  const signupUser = (newUserSignUp: UserSignupData) => {
    _setSignUpUser({
      ...signUpUser,
      ...newUserSignUp,
    });
  };

  return (
    <SignUpContext.Provider value={{ signUpUser, setSignupUser: signupUser, step, setStep }}>
      {children}
    </SignUpContext.Provider>
  );
};
