import React, { useMemo, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import speciesData from "../data/aquaticSpecies.json";
import SpeciesCard from "./SpeciesCard";

export default function SpeciesList() {

    // inputs
    const [searchName, setSearchName] = useState("");
    const [searchSciName, setSearchSciName] = useState("");
    const [searchTemp, setSearchTemp] = useState("");

    // normalizing input
    function normalize(str) {
        return (str ?? "").trim().toLowerCase();
    }

    // sorting and filtering
    const sortedAndFilteredSpecies = useMemo(() => {
        const nameTerm = normalize(searchName);
        const sciTerm = normalize(searchSciName);
        const tempTerm = normalize(searchTemp);

        const sorted = [...speciesData].sort((a, b) => a.avgDepthM - b.avgDepthM);

        return sorted.filter(sp => {
            const commonName = sp.commonName.toLowerCase();
            const scientificName = sp.scientificName.toLowerCase();
            const temperature = (sp.temperature ?? "").toLowerCase();

            const nameOK = !nameTerm || commonName.includes(nameTerm);
            const sciOK = !sciTerm || scientificName.includes(sciTerm);
            const tempOK = !tempTerm || temperature.includes(tempTerm);

            return nameOK && sciOK && tempOK;
        });
    }, [searchName, searchSciName, searchTemp]);

    return (
        <Container className="my-4">
            <h1 className="mb-3">Marine Species</h1>
            <p className="text-muted">
                Just ordered by depth for now, will have them spaced and distanced appropriately later
            </p>

            <Form className="mb-4">
                <Row className="g-2">
                    <Col xs={12} md={4}>
                        <Form.Control
                            type="text"
                            placeholder="Filter by common name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Control
                            type="text"
                            placeholder="Filter by scientific name"
                            value={searchSciName}
                            onChange={(e) => setSearchSciName(e.target.value)}
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Control
                            type="text"
                            placeholder="Filter by temperature (tropical, temperate, etc.)"
                            value={searchTemp}
                            onChange={(e) => setSearchTemp(e.target.value)}
                        />
                    </Col>
                </Row>
            </Form>


            <Row xs={1} md={2} lg={3} className="g-3">
                {sortedAndFilteredSpecies.map((sp) => (
                    <Col key={sp.id}>
                        <SpeciesCard species={sp}/>
                    </Col>
                ))}
                {sortedAndFilteredSpecies.length === 0 && (
                    <Col>
                        <p className="mt-3">
                            No species match your filters.
                        </p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}