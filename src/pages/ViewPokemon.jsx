import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup, Container, Row, Col, Image } from "react-bootstrap";
import { splitStr } from "../Helper/helperFunc";
const ViewPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //id is a string. Convert it.
  const { id } = useParams();

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
        );
        const result = await response.json();
        setPokemon(result.pokemon.find(pokemon => pokemon.id === Number(id)));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    getPokemon();
  }, [id]);

  if (loading) {
    return <h1>Loading..</h1>;
  } else {
    return (
      <Container className="bg">
        <Row className="justify-content-md-evenly align-items-center">
          <Col>
            <Image
              className="fluid img"
              src={pokemon.img}
              style={{ width: "45rem" }}
            ></Image>
          </Col>
          <Col>
            <Card style={{ width: "30rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item className="text-center">
                  {" "}
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
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ViewPokemon;

{
  /*  */
}
