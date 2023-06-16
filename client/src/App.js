import './App.css';
import Navbar from "./components/Navbar"
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import BookingScreen from './screens/BookingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/home" Component={HomeScreen} />
          <Route path='/book/:roomId/:fromDate/:toDate' Component={BookingScreen} exact/>
          <Route path='/register' Component={RegisterScreen} exact/>
          <Route path='/login' Component={LoginScreen} exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;