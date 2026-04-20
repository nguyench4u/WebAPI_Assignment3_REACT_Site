import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Movie from './components/movie';
import Authentication from './components/authentication';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ element }) {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  return loggedIn ? element : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <div className="App">
      <HashRouter>
        <MovieHeader />
        <Routes>
          <Route path="/" element={<PrivateRoute element={<MovieList />} />} />
          <Route path="/movielist" element={<PrivateRoute element={<MovieList />} />} />
          <Route path="/movie/:movieId" element={<PrivateRoute element={<Movie />} />} />
<Route path="/signin" element={<Authentication />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
