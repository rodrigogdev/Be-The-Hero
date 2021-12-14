import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Logon from "./pages/logon";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Newincident from "./pages/newincident";

export default function Routess() {
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Logon />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/incidents/new" element={<Newincident />} />
    </Routes>
  </BrowserRouter>
);
}