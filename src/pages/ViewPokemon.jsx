import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Card,
  ListGroup,
  Container,
  Row,
  Col,
  Image,
  Button
} from "react-bootstrap";
import { splitStr, evolution } from "../Helper/helperFunc";
const ViewPokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [prevGenEvolutions, setPrevGenEvolutions] = useState([]);
  const [nextGenEvolutions, setNextGenEvolutions] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
        );
        const result = await response.json();
        setPokemonList(result.pokemon);
        const eve = result.pokemon.find(pokemon => pokemon.id === Number(id));

        if (eve.next_evolution) {
          setNextGenEvolutions(
            eve.next_evolution.map(evolution => {
              const nextGenObj = result.pokemon.find(
                pokemon => pokemon.num === evolution.num
              );
              return nextGenObj;
            })
          );
        }

        if (eve.prev_evolution) {
          setPrevGenEvolutions(
            eve.prev_evolution.map(evolution => {
              const prevGenObj = result.pokemon.find(
                pokemon => pokemon.num === evolution.num
              );
              return prevGenObj;
            })
          );
        }

        setPokemon(result.pokemon.find(pokemon => pokemon.id === Number(id)));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    getPokemon();
  }, [id]);

  const goHome = () => {
    navigate("/");
  };

  if (loading) {
    return <h1>Loading..</h1>;
  } else {
    return (
      <Container className="bg">
        <h1 className="headline text-center">{pokemon.name}</h1>
        <Row className="justify-content-md-evenly align-items-center">
          <Col>
            <Image
              className="fluid img"
              src={pokemon.img}
              style={{ width: "45rem" }}
            ></Image>
          </Col>
          <Col>
            <Card className="card" style={{ width: "30rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item className="text-center">
                  Name : {pokemon.name}
                </ListGroup.Item>
                <ListGroup.Item className="text-center">
                  Height: {pokemon.height}
                </ListGroup.Item>
                <ListGroup.Item className="text-center">
                  Weight: {pokemon.weight}
                </ListGroup.Item>
                <ListGroup.Item className="text-center">
                  Type : {splitStr(pokemon.type)}
                </ListGroup.Item>
                <ListGroup.Item className="text-center">
                  Weaknesses : {splitStr(pokemon.weaknesses)}
                </ListGroup.Item>
                {nextGenEvolutions && nextGenEvolutions.length > 0 && (
                  <ListGroup.Item className="text-center">
                    Next Generation:
                    {nextGenEvolutions.map(evolution => (
                      <Link to={`/pokemon/${evolution.id}`}>
                        {evolution.name}
                      </Link>
                    ))}
                  </ListGroup.Item>
                )}

                {prevGenEvolutions && prevGenEvolutions.length > 0 && (
                  <ListGroup.Item className="text-center">
                    Previous Generation:
                    {prevGenEvolutions.map(evolution => (
                      <Link to={`/pokemon/${evolution.id}`}>
                        {evolution.name}
                      </Link>
                    ))}
                  </ListGroup.Item>
                )}
                <ListGroup.Item className="text-center">
                  <Button variant="success" onClick={goHome}>
                    Go Home
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ViewPokemon;
