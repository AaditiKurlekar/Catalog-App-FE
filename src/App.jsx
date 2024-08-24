import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css'
import Product from './pages/Product';
import Admin from './pages/Admin';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Product} />
          <Route path="/admin" Component={Admin} />
        </Routes>
      </Router>

    </>
  );
}

export default App
