import Nav from "./navbar";
import Login from "./login";
import Sign from "./signup"
import Section from "./section";
import axios from "axios";
import { useEffect } from "react";

import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

function Home() {

  return (
    <>
    <Section/>
    </>
  )
}

function App() {
 useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
  return (
    <BrowserRouter>

      <Nav />

      <Routes>

        <Route path="/" element={<Home />} />
<Route path="/section" element={<Section />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;