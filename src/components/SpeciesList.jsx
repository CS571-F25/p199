import React, { useMemo, useState, useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import speciesData from "../data/aquaticSpecies.json";
import SpeciesCard from "./SpeciesCard";
import useAquariumStorage from "../hooks/useAquariumStorage";

export default function SpeciesList() {

    const {
        aquariumSpecies,
        addSpecies,
        removeSpecies,
        isInAquarium
    } = useAquariumStorage();

    const [numDepthCells, setNumDepthCells] = useState(0);

    // one-time random offsets per species (stable across re-renders)
    const offsetLookup = useMemo(() => {
        const map = new Map();
        speciesData.forEach(sp => {
            map.set(sp.id, {
                offsetX: Math.random() * 80 - 40,
                offsetY: Math.random() * 30 - 15,
                rotate: Math.random() * 2.6 - 1.3
            });
        });
        return map;
    }, []);

    // one-time random justify per visual row (stable while component is mounted)
    const justifyLookup = useRef(new Map());

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

        const maxDepth = sorted[sorted.length - 1].avgDepthM;
        setNumDepthCells(Math.floor(maxDepth / 100) + 1);

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

    // use stable offsets instead of recomputing random each render
    const speciesWithOffsets = sortedAndFilteredSpecies.map((sp) => {
        const offsets = offsetLookup.get(sp.id) || {
            offsetX: 0,
            offsetY: 0,
            rotate: 0
        };
        return {
            ...sp,
            ...offsets
        };
    });

    // bin species into 100m bins
    function binSpeciesByDepth(allSpecies) {
        const bins = Array.from({ length: numDepthCells || 0 }, (_, i) => ({
            min: i * 100,
            max: (i + 1) * 100,
            species: []
        }));

        allSpecies.forEach(sp => {
            const idx = Math.floor(sp.avgDepthM / 100);
            if (idx >= 0 && idx < bins.length) {
                bins[idx].species.push(sp);
            }
        });

        return bins;
    }

    // helper: break a slice's species into visual rows of length 2–3 (DETERMINISTIC)
    function groupSliceIntoVisualRows(sliceSpecies) {
        const visualRows = [];
        const sorted = [...sliceSpecies].sort((a, b) => a.avgDepthM - b.avgDepthM);

        let index = 0;
        const n = sorted.length;

        while (index < n) {
            const remaining = n - index;
            let rowLength;

            if (remaining <= 3) {
                // final row: just take what’s left (1–3)
                rowLength = remaining;
            } else {
                // alternate between 2 and 3: 2,3,2,3,...
                rowLength = (visualRows.length % 2 === 0) ? 2 : 3;
            }

            visualRows.push(sorted.slice(index, index + rowLength));
            index += rowLength;
        }

        return visualRows;
    }

    // each bin → 10 fixed 10m slices; each slice → multiple visual rows
    function makeRowsForBin(speciesInBin) {
        const slices = Array.from({ length: 10 }, () => []);

        // assign species to 10m slices inside the 100m bin
        speciesInBin.forEach(sp => {
            const withinBin = sp.avgDepthM % 100;
            let sliceIdx = Math.floor(withinBin / 10);
            if (sliceIdx < 0) sliceIdx = 0;
            if (sliceIdx > 9) sliceIdx = 9;
            slices[sliceIdx].push(sp);
        });

        // for each 10m slice, break its species into visual rows
        const sliceRows = slices.map(sliceSpecies => groupSliceIntoVisualRows(sliceSpecies));

        return sliceRows;
    }

    const binsWithRows = binSpeciesByDepth(speciesWithOffsets).map(bin => ({
        ...bin,
        rows: makeRowsForBin(bin.species)
    }));

    const maxRows = Math.max(
        ...binsWithRows.map(bin => bin.rows.length || 0)
    );

    const justifyRandomOptions = [
        "justify-content-start",
        "justify-content-center",
        "justify-content-end",
        "justify-content-between",
        "justify-content-around",
        "justify-content-evenly"
    ];

    // helper to get a stable random justify for a given visual row
    function getJustifyForRow(visualRow) {
        const rowKey = visualRow.map(sp => sp.id).join("-");
        const map = justifyLookup.current;

        if (!map.has(rowKey)) {
            const idx = Math.floor(Math.random() * justifyRandomOptions.length);
            map.set(rowKey, idx);
        }

        const storedIdx = map.get(rowKey);
        return justifyRandomOptions[storedIdx];
    }

    return (
        <Container className="my-4">
            <h1 className="mb-3 fw-bold" style={{ color: "rgb(0, 0, 0)" }}>
                Marine Species
            </h1>

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

            <Col>
                {binsWithRows.map((bin, binIdx) => (
                    <div key={binIdx} className="mb-3">
                        {/* 100m bin label */}
                        <div className="fw-bold small mb-4">
                            {bin.min}–{bin.max} m
                        </div>

                        {/* 10 slices of 10m inside this 100m bin */}
                        {bin.rows.map((sliceRows, sliceIdx) => {
                            const sliceMin = bin.min + sliceIdx * 10;
                            const sliceMax = sliceMin + 10;

                            return (
                                <div
                                    key={sliceIdx}
                                    style={{
                                        width: "90vw",
                                        minHeight: "400px",
                                        marginBottom: "0.5rem"
                                    }}
                                >
                                    {sliceRows.map((visualRow, visualIdx) => {
                                        if (visualRow.length === 0) return null;

                                        const justifyVar = getJustifyForRow(visualRow);

                                        return (
                                            <Row
                                                key={visualIdx}
                                                className={`g-2 mb-4 ${justifyVar}`}
                                            >
                                                {visualRow.map(sp => (
                                                    <Col key={sp.id} xs={4}>
                                                        {sp && (
                                                            <SpeciesCard
                                                                species={sp}
                                                                isInAquarium={isInAquarium(sp.id)}
                                                                onToggleInAquarium={(fish) => {
                                                                    if (isInAquarium(fish.id)) {
                                                                        removeSpecies(fish);
                                                                    } else {
                                                                        addSpecies(fish);
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                    </Col>
                                                ))}
                                            </Row>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </Col>
        </Container>
    );
}
