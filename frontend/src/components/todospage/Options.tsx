import { memo, useState } from "react";
import { Button, Container, Form, Row, Col, Stack } from "react-bootstrap";
import { AiFillPlusSquare } from "react-icons/ai";
import useDate from "../../utils/useDate";

function Options({
  toggleShowAdd,
  onChangeFilter,
}: {
  toggleShowAdd: () => void;
  onChangeFilter: (params: any, name: string) => void;
}) {
  const { getPreviousOrNextDate } = useDate();
  const [createdAt, setCreatedAt] = useState({
    gte: new Date().toISOString().substring(0, 10),
    lte: getPreviousOrNextDate(new Date(Date.now()), 1),
  });
  const onChangeDate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.valueAsDate) {
      const lte = getPreviousOrNextDate(e.currentTarget.valueAsDate, +1);
      const gte = e.currentTarget.valueAsDate.toISOString().substring(0, 10);
      setCreatedAt({ gte, lte });
      onChangeFilter({ lte, gte }, e.currentTarget.name);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center flex-column mt-3">
      <Button
        style={{ maxWidth: "20rem", marginBottom: "0.5rem" }}
        onClick={toggleShowAdd}
        variant="success"
      >
        <AiFillPlusSquare /> Add
      </Button>
      <Row xs={1}>
        <Col>
          <Form.Group>
            <Form.Label>Date : </Form.Label>
            <Form.Control
              type="date"
              name="createdAt"
              id="createdAt"
              value={createdAt.gte}
              onChange={onChangeDate}
            />
          </Form.Group>
        </Col>
        
      </Row>
    </Container>
  );
}

export default memo(Options);
