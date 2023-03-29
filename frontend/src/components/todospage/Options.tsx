import { Button, Container } from "react-bootstrap";

function Options({ toggleShowAdd }: { toggleShowAdd: () => void }) {
  return (
    <Container className="d-flex align-items-center justify-content-center mt-3">
      <Button
        onClick={toggleShowAdd}
        className="d-flex align-items-center"
        variant="success"
      >
        <span className="material-symbols-outlined">add</span>
        <span>Add Item</span>
      </Button>
    </Container>
  );
}

export default Options;
