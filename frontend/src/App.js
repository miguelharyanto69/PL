import { Routes,Route } from 'react-router-dom';
import { 
  Login ,
  Register,
  Auth,
  Homepage
} from "./screens";

function App() {
  return (
    <Routes>
      <Route index element={<Homepage/>}/>
      <Route path="/auth" element={<Auth/>}>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    </Routes>
  );
}

export default App;
