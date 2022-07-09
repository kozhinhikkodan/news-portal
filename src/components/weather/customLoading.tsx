import React from "react";
import { Container, Row, Alert, Col } from "react-bootstrap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function CustomLoading(value: string) {
  return (
    <Row>
      <AiOutlineLoading3Quarters />
      <p>Loading {value}</p>
    </Row>
  );
}
