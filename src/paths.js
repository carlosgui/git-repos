import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Repositories from "./pages/Repositories";

export default function Paths() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/repositories/:repo" Component={Repositories} />
      </Routes>
    </BrowserRouter>
  );
}
