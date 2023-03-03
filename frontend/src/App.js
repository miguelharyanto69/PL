import { Routes,Route } from 'react-router-dom';
import { 
  Login ,
  Register,
  Auth,
  Homepage,
  Profile,
  Movies,
  Movie,
  Community
} from "./screens";

function App() {
  return (
    <Routes>
      <Route index element={<Homepage/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/movies" element={<Movies/>}/>
      <Route path="/community" element={<Community/>}/>
      <Route path="/movie/:id" element={<Movie/>}/>
      <Route path="/auth" element={<Auth/>}>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    </Routes>
  );
}

export default App;
