import { useState } from "react";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TokenInfo from "./pages/TokenInfo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/token/:tokenAddress" element={<TokenInfo />} />

          <Route path="*" element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
