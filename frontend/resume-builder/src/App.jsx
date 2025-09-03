import UserContext from "./context/useContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import Dashboard from "./Home/Dashboard";
import EditResume from "./ResumeUpdate/EditResume";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Auth/Signup";


function App() {
  return (
    <UserContext>
      <div >
        <Router>
          <Routes>
            <Route  path="/" element= {<LandingPage />} />
            <Route path="/signup" element= {<Signup/>} />
            <Route path="/login" element= {<Login/>} />
            <Route path="/dashboard" element= {<Dashboard/>} />
            <Route path="/resume/:resumeId" element= {<EditResume/>} />


            {/* Add other routes as needed */}
          </Routes>
        </Router>
      </div>
      <Toaster
      toastOptions={
        {
          className : "",
          style : {
            fontSize: "13px"
          },
        }
      }/>
      
    </UserContext>
  );
}

export default App;