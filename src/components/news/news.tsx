import React from "react";
import { Article } from "./newsSlice";
import { Col,Card } from "react-bootstrap";

export function News(article: Article) {
  return (
    <Col md={4} className="my-2">
      <Card className="card h-100">
        <Card.Img
          variant="top"
          src={article.urlToImage}
        />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
