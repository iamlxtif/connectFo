import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './fonts/fonts.css';
import './App.css';
import Home from './components/Home'
import Game from './components/Game'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/human" element={<Game />}/>
          <Route path="/bots" element={<Game />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
