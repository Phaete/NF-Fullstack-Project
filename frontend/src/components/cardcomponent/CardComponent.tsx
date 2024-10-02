import {Link, useParams} from "react-router-dom";
import {Exercise} from "../../App.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";


export default function CardComponent() {
    const params = useParams()
    const id = params.id
    const [exercise, setExercise] = useState<Exercise>({
        id: "",
        name: "",
        type: "",
        muscle: "",
        instructions: "",
        equipment: "",
        difficulty: ""
    })

    useEffect(() => {
        axios.get<Exercise>("api/fitness/" + id)
            .then(response => setExercise(response.data))
    }, []);

    return (
        <>
            <StyledContainer>
                <p>{exercise.name}</p>
                <p>{exercise.type}</p>
                <p>{exercise.muscle}</p>
                <p>{exercise.instructions}</p>
                <p>{exercise.equipment}</p>
                <p>{exercise.difficulty}</p>
            </StyledContainer>
            <Link to={"/mainpage"}>Zurück</Link>
        </>
    );
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
