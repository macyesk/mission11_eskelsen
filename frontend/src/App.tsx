import './App.css';
import BookList from './components/BookList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books" element={<BookList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
