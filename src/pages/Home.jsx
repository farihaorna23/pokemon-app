import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { splitStr, getSelectOptions } from "../Helper/helperFunc";
import FormSelect from "../components/FormSelect";
import "./Home.css";
import {
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
  const [pokemon, setPokemon] = useState("");
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

  const type = getSelectOptions(list, "type");
  const weaknesses = getSelectOptions(list, "weaknesses");
  if (loading) {
    <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <div className="col">
          <InputGroup className="m-5" style={{ width: "35rem" }}>
            <Form.Control
              placeholder="Pokemon's name"
              aria-label="Pokemon's name"
              aria-describedby="basic-addon2"
              value={pokemon}
              onChange={e => {
                setPokemon(e.target.value);
              }}
            />
            <Button variant="outline-secondary" id="button-addon2">
              Button
            </Button>
          </InputGroup>
        </div>
        <FormSelect type={type} weaknesses={weaknesses}></FormSelect>
        {list.map(pokemon => {
          return (
            <Row key={pokemon.name + pokemon.id}>
              <Col>
                <Card className="text-center my-3" style={{ width: "35rem" }}>
                  <Card.Body>
                    <Card.Title>{pokemon.name}</Card.Title>
                    <Card.Text>
                      <ListGroup>
                        <ListGroup.Item>{pokemon.num}</ListGroup.Item>
                        <ListGroup.Item>
                          {splitStr(pokemon.type)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          {splitStr(pokemon.weaknesses)}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => goToRoute(pokemon)}
                    >
                      More Information
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
