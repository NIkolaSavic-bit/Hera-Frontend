import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/Prijava" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
