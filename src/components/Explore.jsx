import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState } from "react";
import SpeciesList from "./SpeciesList.jsx";

export default function Explore() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [searchedName, setSearchedName] = useState('');
    const [searchedMajor, setSearchedMajor] = useState('');
    const [searchedInterest, setSearchedInterest] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [page, setPage] = useState(1);


    return <div>
        <div className="d-flex justify-content-start">
            <Button variant="secondary" className="mt-3 justify-content-start" onClick={() => navigate("/")}>
                Back to Home
            </Button>
        </div>
        <Container className="d-flex justify-content-center align-items-center vh-500">
            <SpeciesList/>
        </Container>
    </div>
}