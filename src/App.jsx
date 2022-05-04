import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SignInScreen from "./components/SignInScreen";
import SignUpScreen from "./components/SignUpScreen";
import Walletcreen from "./components/WalletScreen";
import AddEntryScreen from "./components/AddEntryScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/wallet" element={<Walletcreen />} />
        <Route path="/add-entry" element={<AddEntryScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
