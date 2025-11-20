import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Home() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    return <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-5 shadow-lg text-center" style={{ width: "40rem" }}>
            <h2 className="mb-5">DiverLens</h2>
            <p className="text-muted mb-4">Features:</p>
            <div className="d-flex gap-5 justify-content-center">
                <Button variant="primary" className="mb-3 fs-5" style={{ width: "15rem"}} onClick={() => navigate("/explore")}>
                    Explore
                </Button>

                <Button variant="primary" className="mb-3 fs-5" style={{ width: "15rem"}} onClick={() => navigate("/aquarium-builder")}>
                    Aquarium Builder
                </Button>
            </div>
            <div className="justify-content-center mt-5">
                <Button variant="secondary" className="mb-3 fs-6" style={{ width: "10rem" }} onClick={() => navigate("/about")}>
                    About Me
                </Button>
            </div>
        </Card>
    </Container>
}