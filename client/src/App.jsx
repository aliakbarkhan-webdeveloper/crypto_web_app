import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./assets/components/Home/Home.jsx";
import Footer from "./assets/components/Footer/Footer.jsx";
import Navbar from "./assets/components/navbar/Navbar.jsx";
import Protected from "./assets/components/Protected/Protected.jsx";
import Coins from "./assets/components/coins/Coins.jsx"
function App() {
  let isAuth=false;


  return (
    <div className='container'>
      <BrowserRouter>
        <div className='layout'>
          <Navbar />
          <Routes>
            <Route
              path='/'
              exact
              element={
                <div className='main'>
                  <Home />
                </div>
              }
            />
            <Route
              path='/home'
              exact
              element={
                <div className='main'>
                  <Home />
                </div>
              }
            />
             <Route
              path='/coins'
              exact
              element={
                <div className='main'>
                  <Coins />
                </div>
              }
            />
              <Route
              path='/bolgs'
              exact
              element={
              
                <Protected />
                
               
              }
            />
             <Route
              path='/writebolg'
              exact
              element={
               
                   <Protected isAuth={isAuth}>
                <div className='main'>
                 Submit
                </div>
                  </Protected>
                
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
