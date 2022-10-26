import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import {
  Container,
  InputGroup,
  Form,
  Button,
  ListGroup,
  Card,
  Col,
  Row
} from "react-bootstrap";
const Home = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const getPokemon = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
      );
      const result = await response.json();
      setList([...result.pokemon]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const goToRoute = pokemon => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  useEffect(() => {
    getPokemon();
  }, []);

  if (loading) {
    <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <div className="col">
          <InputGroup className="m-5" style={{ width: "35rem" }}>
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Button
            </Button>
          </InputGroup>
        </div>
        {list.map(pokemon => {
          return (
            <Row>
              <Col>
                <Card className="text-center my-3" style={{ width: "35rem" }}>
                  <Card.Body>
                    <Card.Title>{pokemon.name}</Card.Title>
                    <Card.Text>
                      <ListGroup>
                        <ListGroup.Item>{pokemon.num}</ListGroup.Item>
                        <ListGroup.Item>{pokemon.type}</ListGroup.Item>
                        <ListGroup.Item>{pokemon.weaknesses}</ListGroup.Item>
                      </ListGroup>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => goToRoute(pokemon)}
                    >
                      Go somewhere
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
};

export default Home;
