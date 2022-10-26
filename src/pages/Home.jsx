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
  Col
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
      <div className="d-sm-flex justify-content-center align-items-center flex-direction-column">
        <InputGroup className="mb-3" style={{ width: "25rem" }}>
          <Form.Control
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Button
          </Button>
        </InputGroup>
        {list.map(pokemon => {
          return (
            <div>
              <Card className="text-center my-3" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{pokemon.name}</Card.Title>
                  <Card.Text>
                    <ListGroup>
                      <ListGroup.Item>{pokemon.num}</ListGroup.Item>
                      <ListGroup.Item>{pokemon.type}</ListGroup.Item>
                      <ListGroup.Item>{pokemon.weaknesses}</ListGroup.Item>
                    </ListGroup>
                  </Card.Text>
                  <Button variant="primary" onClick={() => goToRoute(pokemon)}>
                    Go somewhere
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Home;

{
  /* <ListGroup>
          {list.map(pokemon => {
            return (
              <div>
                <ListGroup.Item className="text-center list">
                  {pokemon.name}
                </ListGroup.Item>
                <ListGroup.Item className="text-center list">
                  {pokemon.num}
                </ListGroup.Item>
                <ListGroup.Item className="text-center list">
                  {pokemon.type}
                </ListGroup.Item>
                <ListGroup.Item className="text-center list">
                  {pokemon.weaknesses}
                </ListGroup.Item>
              </div>
            );
          })}
        </ListGroup> */
}
