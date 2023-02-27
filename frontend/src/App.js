import { Routes,Route } from 'react-router-dom';
import { 
  Login ,
  Register,
  Auth
} from "./screens";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth/>}>
        <Route path="/" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    </Routes>
  );
}

export default App;
