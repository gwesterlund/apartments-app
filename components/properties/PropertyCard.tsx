import { Col, Card } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property }) {
  return (
    <Col>
      <Link href={`/properties/${property.id}`}>
        <Card className="search-card border border-0 shadow rounded h-100 gap-0">
          <div className="ratio ratio-16x9">
            <Image
              className="d-block w-100 card-img-top"
              src="/apartment-slide-1.jpg"
              alt="First slide"
              fill
            />
          </div>
          <Card.Body>
            <div>
              <span className="fw-bold">
                ${property.price}/{property.rentalTime}
              </span>
            </div>
            <div className="small">
              <div className="fw-bold text-truncate">
                {property.displayName}
              </div>
              <span className="fw-bold">{property.beds}</span>
              <span className="fw-light"> bds</span>
              {" | "}
              <span className="fw-bold">{property.baths}</span>
              <span className="fw-light"> ba</span>
              {" | "}
              <span className="fw-bold">{property.squareFeet}</span>
              <span className="fw-light"> sqft</span>
              <div className="fw-light text-truncate">
                {property.complexName}
              </div>
              <div className="fw-light text-truncate">
                {property.address.street}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
