import React from "react";
import { Card, Badge, Button, ProgressBar } from "react-bootstrap";

// difference bg colors for different temperatures
const temperatureVariant = (temp) => {
  switch (temp) {
    case "polar":
      return "rgba(102, 0, 255, 1)";
    case "cold-temperate":
      return "rgba(82, 79, 255, 1)";
    case "temperate":
      return "rgba(49, 152, 255, 1)";
    case "warm-temperate":
      return "rgba(97, 197, 255, 1)";
    case "tropical":
      return "rgba(65, 255, 223, 1)";
    default:
      return "white";
  }
};

export default function SpeciesCard({
  species,
  isInAquarium = false,
  onToggleInAquarium
}) {
  const handleToggle = (e) => {
    e.stopPropagation();
    if (onToggleInAquarium) {
      onToggleInAquarium(species);
    }
  };

  return (
    <Card
      className="shadow-sm"
      style={{
        width: "300px",
        backgroundColor: "rgba(29, 39, 121, 1)",
        padding: 5,
        transform: `translate(${species.offsetX}px, ${species.offsetY}px) rotate(${species.rotate}deg)`
      }}
    >
      <Card.Body style={{ backgroundColor: temperatureVariant(species.temperature) }}>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="mb-1 fw-bold">
              {species.commonName}
            </Card.Title>
            <Card.Subtitle className="mb-2">
              <em>{species.scientificName}</em>
            </Card.Subtitle>
          </div>
          <div className="d-flex flex-column align-items-end gap-2">
            <Badge pill bg="info">
              {species.temperature}
            </Badge>
            {onToggleInAquarium && (
              <Button
                variant={isInAquarium ? "danger" : "success"}
                size="sm"
                onClick={handleToggle}
              >
                {isInAquarium ? "Remove" : "Add"}
              </Button>
            )}
          </div>
        </div>

        <hr />

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
            <span>(avg {species.avgDepthM} m)</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}