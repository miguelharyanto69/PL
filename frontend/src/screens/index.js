import Login from "./auth/Login";
import Register from "./auth/Register";
import Homepage from "./home/Homepage";
import Profile from "./home/Profile";
import Movies from "./home/Movies";
import Movie from "./home/Movie";
import Community from "./home/Community";
import Chat from "./home/Chat";
import HomeAdmin from "./admin/HomeAdmin";
import Create from "./admin/Create";
import News from "./home/News";
import Checkout from "./tickets/Checkout";
import Update from "./admin/Update";
import DetailNews from "./home/DetailNews";
import PickSeats from "./tickets/PickSeats";
import MovieTicketOrder from "./tickets/MovieTicketOrder";
import UserTickets from "./tickets/UserTickets";

//nesting main
import Auth from "./auth/Main";
import MainHome from "./home/MainHome";
import MainAdmin from "./admin/MainAdmin";
import MainTickets from "./tickets/MainTickets";

export {
    MainTickets,
    Login,
    Register,
    Homepage,
    Auth,
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
    PickSeats,
    MovieTicketOrder,
    Checkout,
    UserTickets
};