import { createContext, useState } from "react";

export const UIContext = createContext({
  loginModal: false,
  signUpModal: false,
  isThemeDark: false,
  toggleTheme: function () {},
  toggleLoginModal: function () {},
  toggleSignUpModal: function () {},
});

export default function UIContextProvider({ children }: any) {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [signUpModal, setSignUpModal] = useState<boolean>(false);
  const [isThemeDark, setIsThemeDark] = useState<boolean>(true);
  function toggleLoginModal() {
    setLoginModal(!loginModal);
  }
  function toggleTheme() {
    setIsThemeDark(!isThemeDark);
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
        toggleTheme,
        isThemeDark,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
