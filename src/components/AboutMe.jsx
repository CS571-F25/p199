import { useNavigate } from "react-router";
import { Container, Card, Button } from "react-bootstrap";

export default function AboutMe() {

    const navigate = useNavigate();

    return <div>
        <div className="d-flex justify-content-start">
            <Button variant="secondary" className="mt-3 justify-content-start" onClick={() => navigate("/")}>
                Back to Home
            </Button>
        </div>
        <Container className="my-5">
            <Card className="h-100 shadow-sm" style={{ backgroundColor: "rgba(0, 6, 30, 0.98)", color: "white" }}>
                <h3 className="mb-4 text-center">About Me</h3>

                <p className="text-center">
                    I'm Will Macaulay, a computer science and data science student at UW Madison. 
                    I'm currently a sophomore and am planning on graduating in May 2028. Growing up on the 
                    West coast of the US, I've always between interested in the ocean and aquatic life, and 
                    I tend to visit aquariums often. This web app is intended to pique the interest of those
                    who would like to explore the depths of the ocean and see how well different species could
                    coexist in an aquarium.
                </p>
            </Card>
        </Container>
    </div>
}