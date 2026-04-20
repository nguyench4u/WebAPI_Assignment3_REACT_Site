import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../actions/movieActions';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';

function Search() {
    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.movie.searchResults);
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.trim()) dispatch(searchMovies(term.trim()));
    };

    return (
        <div className="p-4">
            <Form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search by title or actor..."
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <Button type="submit">Search</Button>
            </Form>

            {searchResults.length === 0 && term && (
                <p className="text-muted">No results found.</p>
            )}

            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {searchResults.map((movie) => (
                    <Col key={movie._id}>
                        <Card as={Link} to={`/movie/${movie._id}`} className="h-100 text-decoration-none text-dark">
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
        </div>
    );
}

export default Search;
