// AquariumSpeciesTabs.jsx
import React from "react";
import AquariumSpeciesTab from "./AquariumSpeciesTab";

export default function AquariumSpeciesTabs({
  speciesList,
  onRemove,
  pressure,
  temperature,
  plantLife
}) {
  return (
    <div
      className="mt-3 p-3 rounded"
      style={{
        backgroundColor: "rgba(3, 10, 40, 0.95)",
        maxHeight: 200,
        overflowY: "auto"
      }}
    >
      {speciesList.length === 0 && (
        <div className="text-muted small">
          No species in this aquarium yet. Add some from the species list!
        </div>
      )}
      {speciesList.map((sp) => (
        <AquariumSpeciesTab
          key={sp.id}
          species={sp}
          onRemove={onRemove}
          pressure={pressure}
          temperature={temperature}
          plantLife={plantLife}
        />
      ))}
    </div>
  );
}
