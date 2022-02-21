import Home from './components/layout/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header'
import Result from './components/layout/ResultSearch';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path='/result/:pokemon' element={<Result />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
