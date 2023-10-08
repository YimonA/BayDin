import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Choose from "../components/Choose";
import Result from "../components/Result";

const Path = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/result" element={<Result />} />
        {/* <Route path={"/*"} element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Path;
