// AquariumBuilder.jsx
import { useNavigate } from "react-router";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import React, { useState, useMemo } from "react";
import AquariumView from "./AquariumView";
import AquariumSidebar from "./AquariumSidebar";
import AquariumSpeciesTabs from "./AquariumSpeciesTabs";
import useAquariumStorage from "../hooks/useAquariumStorage";

// same formula as in AquariumSpeciesTab, but extracted so we can reuse for longevity
function computeSurvival(species, pressure, temperature, plantLife) {
  // Map species temperature preference to 0–100
  const tempTargets = {
    "polar": 10,
    "cold-temperate": 25,
    "temperate": 50,
    "warm-temperate": 75,
    "tropical": 90
  };
  const tempTarget = tempTargets[species.temperature] ?? 50;
  const tempScore = 100 - Math.min(100, Math.abs(temperature - tempTarget));


    const maxDepth = 2000;
    const pressureDiff = pressure - (species.avgDepthM/maxDepth)*100

    let pressureMult = 0

    if (pressureDiff < -50) {
        pressureMult = 0.7;
    } else if (pressureDiff < -25) {
        pressureMult = 0.8;
    } else if (pressureDiff < -10) {
        pressureMult = 0.9;
    } else if (pressureDiff < 10) {
        pressureMult = 1.0;
    } else if (pressureDiff < 25) {
        pressureMult = 0.7;
    } else if (pressureDiff < 50) {
        pressureMult = 0.2
    } else {
        pressureMult = 0;
    }

    const pressureScoreMult = (1.0 - Math.abs(pressureDiff/100.0)) * pressureMult;


  let plantTarget = 50;
  const envStr = (species.environment ?? "").toLowerCase();
  if (envStr.includes("reef") || envStr.includes("seagrass")) {
    plantTarget = 80;
  } else if (envStr.includes("pelagic")) {
    plantTarget = 40;
  }
  if (tempTarget <= 25) {
    plantTarget -= 20;
  } else if (tempTarget >= 90) {
    plantTarget += 20;
  }

  const plantScore = 100 - Math.min(100, Math.abs(plantLife - plantTarget));

  const raw = pressureScoreMult * ((0.6 * tempScore) + (0.4 * plantScore));

  return Math.round(Math.max(0, Math.min(100, raw)));
}

export default function AquariumBuilder() {
  const navigate = useNavigate();

  const [pressure, setPressure] = useState(50);
  const [temperature, setTemperature] = useState(50);
  const [plantLife, setPlantLife] = useState(50);

  const { aquariumSpecies, removeSpecies } = useAquariumStorage();


const longevity = useMemo(() => {
    if (!aquariumSpecies.length) return 0;

    const totalSurvival = aquariumSpecies.reduce(
        (sum, sp) => sum + computeSurvival(sp, pressure, temperature, plantLife), 0
    );

    const avg = totalSurvival / aquariumSpecies.length;

    return Math.round(avg);
}, [aquariumSpecies, pressure, temperature, plantLife]);

  return (
    <div>
      <div className="d-flex justify-content-start">
        <Button
          variant="secondary"
          className="mt-3 justify-content-start"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
      <Container className="my-5">
        <Card
          className="h-100 shadow-sm p-4"
          style={{ backgroundColor: "rgba(0, 6, 30, 0.98)", color: "white" }}
        >
          <h1 className="mb-4 text-center">Aquarium Builder</h1>

          <Row className="g-4">
            {/* Left: aquarium view + tabs */}
            <Col xs={12} lg={8} className="d-flex flex-column gap-3">
                <AquariumView plantLife={plantLife} pressure={pressure}>
                    {/* species images would go here but that would take a while 
                    to find a transparent image for every one so yeah */}
                </AquariumView>


              <AquariumSpeciesTabs
                speciesList={aquariumSpecies}
                onRemove={removeSpecies}
                pressure={pressure}
                temperature={temperature}
                plantLife={plantLife}
              />
            </Col>

            {/* Right: sidebar */}
            <Col xs={12} lg={4}>
              <AquariumSidebar
                longevity={longevity}
                pressure={pressure}
                temperature={temperature}
                plantLife={plantLife}
                onPressureChange={setPressure}
                onTemperatureChange={setTemperature}
                onPlantLifeChange={setPlantLife}
              />
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}