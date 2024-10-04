import { Link, useParams } from "react-router-dom";
import { Exercise } from "../../App.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function CardComponent() {
    const params = useParams();
    const id = params.id;
    const [exercise, setExercise] = useState<Exercise>({
        id: "",
        name: "",
        type: "",
        muscle: "",
        instructions: "",
        equipment: "",
        difficulty: ""
    });

    useEffect(() => {
        axios.get<Exercise>("api/fitness/" + id)
            .then(response => setExercise(response.data));
    }, [id]);

    return (
        <StyledCardWrapper>
            <StyledCard>
                <StyledCardTitle>{exercise.name}</StyledCardTitle>
                <StyledCardDetail><strong>Type:</strong> {exercise.type}</StyledCardDetail>
                <StyledCardDetail><strong>Muscle:</strong> {exercise.muscle}</StyledCardDetail>
                <StyledCardDetail><strong>Instructions:</strong> {exercise.instructions}</StyledCardDetail>
                <StyledCardDetail><strong>Equipment:</strong> {exercise.equipment}</StyledCardDetail>
                <StyledCardDetail><strong>Difficulty:</strong> {exercise.difficulty}</StyledCardDetail>
            </StyledCard>
            <StyledLink to={"/mainpage"}>Zurück</StyledLink>
        </StyledCardWrapper>
    );
}

const StyledCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f7f9fc;
    padding: 20px;
    margin-top: 50px;
    margin-bottom: 50px;
`;

const StyledCard = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
`;

const StyledCardTitle = styled.h2`
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 10px;
    text-align: center;
`;

const StyledCardDetail = styled.p`
    font-size: 1.2rem;
    color: #34495e;
    margin: 5px 0;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #3498db;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #f0f0f0;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e0e0e0;
    }
`;
