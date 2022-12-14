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
import { splitStr } from "../Helper/helperFunc";
const ViewPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevGenEvolutions, setPrevGenEvolutions] = useState([]);
  const [nextGenEvolutions, setNextGenEvolutions] = useState([]);

  const navigate = useNavigate();
  //get the id from the url
  const { id } = useParams();
  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
        );
        const result = await response.json();

        //gets that one specific pokemon based on the id
        const eve = result.pokemon.find(pokemon => pokemon.id === Number(id));

        //if that specific pokemon has a next evolution property, then we save that array to the state
        //eve.next_evolution --> is an array with objects. Each object has the pokemon name and its num.
        //we will find the entire object of all the next generation pokemon from the master list by matching it will num property
        //nextGenEvolutions will be the array that holds the entire object of each of the new evolution pokemon
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
        //same for prev_generation
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
                {/* if nextEvolution array exist, then map over the array and create links for each of next evolution pokemon */}
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
