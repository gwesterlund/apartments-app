import { Row, Col, Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";

const Features = ({ propertyData, updatePropertyData, navigation }) => {
  const router = useRouter();

  const validate = () => {
    return propertyData?.displayName && propertyData?.address?.street;
  };

  return (
    <>
      <Row>
        <Col>
          <div className="page-header">
            <h1>Enter Details</h1>
            {/* <p>Fill out this form and click next.</p> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <div className="panel">
            <div className="section-header">
              <div className="title">General Information</div>
            </div>
            <div className="section">
              <Form>
                <Form.Group as={Row} controlId="firstName">
                  <Form.Label column sm="4">
                    Dispaly Name
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={propertyData.displayName}
                      onChange={(e) => {
                        updatePropertyData("displayName", e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </div>
            <div className="section-header">
              <div className="title">Address</div>
            </div>
            <div className="section">
              <Form>
                <Form.Group as={Row} controlId="gender">
                  <Form.Label column sm="4">
                    Street
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      value={propertyData.address.street}
                      onChange={(e) =>
                        updatePropertyData("address.street", e.target.value)
                      }
                      placeholder="Enter Street Address"
                    />
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <div
            className="d-flex flex-row justify-content-between"
            style={{ marginBottom: "30px" }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                router.push("/");
              }}
            >
              Back to Properties
            </Button>
            <Button
              variant="primary"
              onClick={navigation.next}
              disabled={!validate()}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Features;
