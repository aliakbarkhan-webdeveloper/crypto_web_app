import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css"
import Home from "./assets/components/Home/Home.jsx";
import Footer from "./assets/components/Footer/Footer.jsx";
import Navbar from "./assets/components/navbar/Navbar.jsx";

function App() {
 
  return(
  <div className="container">
<BrowserRouter>

<div className="layout">
  <Navbar/>
<Routes>
  <Route path="/" exact element={<div className="main"><Home/></div>}/>
  <Route path="/home" exact element={<div className="main"><Home/></div>}/>
</Routes>
  <Footer/>
</div>

</BrowserRouter>


  </div>)
  }

export default App;
