import React from "react";
import { Row } from "react-bootstrap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function CustomLoading(message: string) {
  return (
    <Row>
      <AiOutlineLoading3Quarters />
      <p>Loading {message}</p>
    </Row>
  );
}
