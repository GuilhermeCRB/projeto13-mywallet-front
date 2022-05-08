import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserConntext from "./contexts/UserContext";
import InputTypeConntext from "./contexts/InputTypeContext";

import SignInScreen from "./components/SignInScreen";
import SignUpScreen from "./components/SignUpScreen";
import WalletScreen from "./components/WalletScreen";
import AddInputScreen from "./components/AddInputScreen";


export default function App() {
  const [user, setUser] = useState();
  const [inputType, setInputType] = useState();

  return (
    <UserConntext.Provider value={{ user, setUser }}>
    <InputTypeConntext.Provider value={{ inputType, setInputType }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/wallet" element={<WalletScreen />} />
            <Route path="/add-input" element={<AddInputScreen />} />
          </Routes>
        </BrowserRouter>
    </InputTypeConntext.Provider>
    </UserConntext.Provider>
  );
}
