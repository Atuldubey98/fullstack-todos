import { Col } from "react-bootstrap";
import { MdIncompleteCircle } from "react-icons/md";

function NotCompleteCard({ notComplete }: { notComplete: number }) {
  return (
    <Col
      style={{ minWidth: "10rem", minHeight: "8rem", borderRadius: 10 }}
      className="bg-warning m-2 d-flex align-items-center justify-content-center flex-column"
    >
      <h1 className="text-light text-center">{notComplete}</h1>
      <h1 className="text-light text-center">
        <MdIncompleteCircle /> Not Complete
      </h1>
    </Col>
  );
}

export default NotCompleteCard;
