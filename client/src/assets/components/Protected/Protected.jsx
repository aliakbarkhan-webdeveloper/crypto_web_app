
import { Navigate } from "react-router-dom"
import Blog from "../Blogs/Blog.jsx"
function Protected() {
  const isAuth=true
    if(isAuth) {
        return <Blog />
    }else{
        return <Navigate to="/login"/>
    }
  
}

export default Protected