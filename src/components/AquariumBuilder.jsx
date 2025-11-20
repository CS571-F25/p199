import { useNavigate } from "react-router";
import { Container, Card, Button } from "react-bootstrap";

export default function AquariumBuilder() {

    const navigate = useNavigate();

    return <div>
        <div className="d-flex justify-content-start">
            <Button variant="secondary" className="mt-3 justify-content-start" onClick={() => navigate("/")}>
                Back to Home
            </Button>
        </div>
        <Container className="my-5">
            <Card className="h-100 shadow-sm">
                <h1 className="mb-4 text-center">Aquarium Builder</h1>

                <p className="text-center">
                    Haven't finished this part yet
                </p>
            </Card>
        </Container>
    </div>
}