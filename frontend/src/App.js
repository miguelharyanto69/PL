import { Routes,Route } from 'react-router-dom';
import { 
  Login ,
  Register,
  Auth,
  Homepage,
  Profile,
  Movies,
  Movie,
  Community,
  Chat,
  MainHome,
  MainAdmin,
  HomeAdmin,
  Create,
  News,
  Update,
  DetailNews,
  PickSeats
} from "./screens";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainHome/>}>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/movies" element={<Movies/>}/>
      <Route path="/community" element={<Community/>}/>
      <Route path="/movie/:id" element={<Movie/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/news" element={<News/>}/>
      <Route path="/detail/spotlight/:id" element={<DetailNews/>}/>
      <Route path="/detail/news/:id" element={<DetailNews/>}/> 
      <Route path="/pickseats" element={<PickSeats/>}/>

      </Route>
      <Route path="/admin" element={<MainAdmin/>}>
        <Route index element={<HomeAdmin/>}/>
        <Route path="create" element={<Create/>}/>
        <Route path="update/news/:id" element={<Update/>}/>
        <Route path="update/spotlight/:id" element={<Update/>}/>

      </Route>
      <Route path="/auth" element={<Auth/>}>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    </Routes>
  );
}

export default App;
