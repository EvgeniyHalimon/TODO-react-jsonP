import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navigation from './components/Navigaton';
import Welcome from './components/Welcome';


function App() {
  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
