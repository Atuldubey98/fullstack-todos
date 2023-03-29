import { createContext, useState } from "react";

export const UIContext = createContext({
  loginModal: false,
  signUpModal: false,
  toggleLoginModal: function () {},
  toggleSignUpModal: function () {},
});

export default function UIContextProvider({ children }: any) {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [signUpModal, setSignUpModal] = useState<boolean>(false);
 
  function toggleLoginModal() {
    setLoginModal(!loginModal);
  }
 
  
  function toggleSignUpModal() {
    setSignUpModal(!signUpModal);
  }
  return (
    <UIContext.Provider
      value={{
        
        toggleLoginModal,
        toggleSignUpModal,
        loginModal,
        signUpModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
