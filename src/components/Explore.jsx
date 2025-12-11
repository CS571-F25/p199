import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import SpeciesList from "./SpeciesList.jsx";

export default function Explore() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [searchedName, setSearchedName] = useState('');
    const [searchedMajor, setSearchedMajor] = useState('');
    const [searchedInterest, setSearchedInterest] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const updating = {current: false};

        const handleScroll = (() => {
            if (!updating.current) {

                updating.current = true;

                const doc = document.documentElement;
                const scrollHeight = doc.scrollHeight - doc.clientHeight;
                const progress = 1-Math.min(window.scrollY/40000.0, 1);

                document.body.style.backgroundColor = `rgb(${30*progress}, ${110*progress}, ${180*progress})`;
                document.querySelector(".water-overlay").style.opacity = progress * 0.3;

                updating.current = false;
            }
        })

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    })

    return <div>
        <div className="water-overlay"/>
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