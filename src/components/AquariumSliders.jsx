import React from "react";
import { Form } from "react-bootstrap";

export default function AquariumSliders({
    pressure,
    temperature,
    plantLife,
    onPressureChange,
    onTemperatureChange,
    onPlantLifeChange
}) {
    return (
        <div className="d-flex flex-column gap-4">
        <Form.Group>
            <Form.Label className="text-light">
            Pressure: <strong>{pressure}</strong>
            </Form.Label>
            <Form.Range
            min={0}
            max={100}
            value={pressure}
            onChange={(e) => onPressureChange(Number(e.target.value))}
            />
        </Form.Group>

        <Form.Group>
            <Form.Label className="text-light">
            Temperature: <strong>{temperature}</strong>
            </Form.Label>
            <Form.Range
            min={0}
            max={100}
            value={temperature}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            />
        </Form.Group>

        <Form.Group>
            <Form.Label className="text-light">
            Plant Life: <strong>{plantLife}</strong>
            </Form.Label>
            <Form.Range
            min={0}
            max={100}
            value={plantLife}
            onChange={(e) => onPlantLifeChange(Number(e.target.value))}
            />
        </Form.Group>
        </div>
    );
}