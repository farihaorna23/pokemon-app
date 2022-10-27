import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup, Container, Row, Col, Image } from "react-bootstrap";

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
        //console.log(result.pokemon.find(pokemon => pokemon.id === Number(id)));
        setPokemon(result.pokemon.find(pokemon => pokemon.id === Number(id)));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    getPokemon();
  }, [id]);

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
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewPokemon;
