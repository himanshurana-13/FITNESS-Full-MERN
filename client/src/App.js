import { ThemeProvider, styled } from "styled-components"
import {lightTheme} from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";


const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
background: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text_primary};
overflow-x: hidden;
overflow-y: hidden;
transition: all 0.2s ease;
`;



function App() {
  // const [user, setUser] = useState(true);
  return (
  <ThemeProvider theme={lightTheme}>
  <BrowserRouter>
  <Container>
    <Navbar />
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/workouts" exact element={<Workouts />} /> 
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/> 
    </Routes>
  </Container>
  </BrowserRouter>
  </ThemeProvider>
);

}

export default App;
