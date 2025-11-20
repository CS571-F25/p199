import React from "react";
import { Card, Badge } from "react-bootstrap";

// difference bg colors for different temperatures
const temperatureVariant = (temp) => {
  switch (temp) {
    case "polar":
      return "white";
    case "cold-temperate":
      return "lightBlue";
    case "temperate":
      return "blue";
    case "warm-temperate":
      return "yellow";
    case "tropical":
      return "orange";
    default:
      return "white";
  }
};

export default function SpeciesCard({ species }) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body style= {{ backgroundColor: temperatureVariant(species.temperature) }}>
                <div className="d-flex justify-content-between align-items-start">
                <div>
                    <Card.Title className="mb-1">
                    {species.commonName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2">
                    <em>{species.scientificName}</em>
                    </Card.Subtitle>
                </div>
                <Badge pill bg="info">
                    {species.temperature}
                </Badge>
                </div>

                <hr/>

                <div className="small">
                <div>
                    <strong>Group:</strong> {species.group}
                </div>
                <div>
                    <strong>Environment:</strong> {species.environment}
                </div>
                <div className="mt-1">
                    <strong>Depth:</strong>{" "}
                    {species.minDepthM}–{species.maxDepthM} m{" "}
                    <span>
                        (avg {species.avgDepthM} m)
                    </span>
                </div>
                </div>
            </Card.Body>
        </Card>
    );
}