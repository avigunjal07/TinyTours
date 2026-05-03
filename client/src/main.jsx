import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import Contact from "./views/Contact.jsx";
import Dashboard from "./views/Dashboard.jsx";
import EditTour from "./views/EditTour.jsx";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Tours from "./views/Tours.jsx";
import NewTour from "./views/NewTour.jsx";
import ReceivedContact from "./views/ReceivedContact.jsx"; 



const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/new" element={<NewTour />} />
      <Route path="/tours/edit" element={<EditTour />} />
      <Route path="/contact" element={<Contact />} />
       <Route path="/recieved-contact" element={<ReceivedContact />} />
      
    
    </Routes>
  </BrowserRouter>,
);