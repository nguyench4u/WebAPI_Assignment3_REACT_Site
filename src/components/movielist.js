import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setMovie, searchMovies } from "../actions/movieActions";
import { Link } from 'react-router-dom';
import { Image, Nav, Carousel, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.movies);
    const searchResults = useSelector(state => state.movie.searchResults);
    const [term, setTerm] = useState('');
    const [searched, setSearched] = useState(false);

    const memoizedMovies = useMemo(() => movies, [movies]);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const handleSelect = (selectedIndex) => {
        dispatch(setMovie(memoizedMovies[selectedIndex]));
    };

    const handleClick = (movie) => {
        dispatch(setMovie(movie));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (term.trim()) {
            dispatch(searchMovies(term.trim()));
            setSearched(true);
        }
    };

    const handleClear = () => {
        setTerm('');
        setSearched(false);
    };

    if (!memoizedMovies) {
        return <div>Loading....</div>;
    }

    return (
        <div>
            <Form onSubmit={handleSearch} className="d-flex gap-2 p-3 bg-dark">
                <Form.Control
                    type="text"
                    placeholder="Search by title or actor..."
                    value={term}
                    onChange={(e) => { setTerm(e.target.value); if (!e.target.value) handleClear(); }}
                />
                <Button type="submit" variant="primary">Search</Button>
                {searched && <Button variant="outline-light" onClick={handleClear}>Clear</Button>}
            </Form>

            {searched ? (
                <div className="p-3">
                    {searchResults.length === 0 ? (
                        <p className="text-muted">No results found.</p>
                    ) : (
                        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                            {searchResults.map((movie) => (
                                <Col key={movie._id}>
                                    <Card as={Link} to={`/movie/${movie._id}`} onClick={() => handleClick(movie)} className="h-100 text-decoration-none text-dark">
                                        <Card.Img variant="top" src={movie.imageUrl} style={{ objectFit: 'cover', height: '200px' }} />
                                        <Card.Body>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text className="text-muted">{movie.genre}</Card.Text>
                                            <small><BsStarFill /> {movie.avgRating}</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            ) : (
                <Carousel onSelect={handleSelect} className="bg-dark text-light p-4 rounded">
                    {memoizedMovies.map((movie) => (
                        <Carousel.Item key={movie._id}>
                            <Nav.Link as={Link} to={`/movie/${movie._id}`} onClick={() => handleClick(movie)}>
                                <Image className="image" src={movie.imageUrl} thumbnail />
                            </Nav.Link>
                            <Carousel.Caption>
                                <h3>{movie.title}</h3>
                                <BsStarFill /> {movie.avgRating} &nbsp;&nbsp; {movie.releaseDate}
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    );
}

export default MovieList;