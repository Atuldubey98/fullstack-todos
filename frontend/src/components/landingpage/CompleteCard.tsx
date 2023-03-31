import React from "react";
import { Col } from "react-bootstrap";
import { RiTodoLine } from "react-icons/ri";
function CompleteCard({ complete }: { complete: number }) {
  return (
    <Col
      style={{ minWidth: "10rem", minHeight: "8rem", borderRadius: 10 }}
      className="bg-success m-2 d-flex align-items-center justify-content-center flex-column"
    >
      <h1 className="text-light text-center">{complete}</h1>
      <h1 className="text-light text-center">
        <RiTodoLine /> Complete
      </h1>
    </Col>
  );
}

export default CompleteCard;
