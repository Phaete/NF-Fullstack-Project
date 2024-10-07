import axios from "axios";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Exercise} from "../App.tsx";
import ListCard from "../components/listcard/ListCard.tsx";
import {Box} from "@mui/material";

type MainPageProps = {
    exercises: Exercise[];
    fetchData: () => void;
    setUpdateExercise: (exercise: Exercise) => void;
    addExercise: Exercise;
    setAddExercise: (exercise: Exercise) => void;
    updateExercise: Exercise;
}

export default function MainPage({
                                     exercises,
                                     fetchData,
                                     setUpdateExercise,
                                     addExercise,
                                     setAddExercise,
                                     updateExercise
                                 }: MainPageProps) {

    function handleAddSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        axios.post("api/fitness", addExercise)
            .then(() => fetchData())
        setAddExercise({
            id: "",
            name: "",
            type: "",
            muscle: "",
            instructions: "",
            equipment: "",
            difficulty: ""
        })
    }

    function handleUpdateSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        axios.put("api/fitness/" + updateExercise.id, updateExercise)
            .then(() => fetchData())
        setUpdateExercise({
            id: "",
            name: "",
            type: "",
            muscle: "",
            instructions: "",
            equipment: "",
            difficulty: ""
        })
    }


    return (
        <StyledContainer>
            <div>
                <StyledDiv>
                    {exercises.map(exercise => (
                        <ListCard key={exercise.id}  exercise={exercise} setUpdateExercise={setUpdateExercise} fetchData={fetchData}/>
                    ))}
                </StyledDiv>

                <Box sx={{
                    display:'flex',
                    flexDirection:'row'
                }}>
                <StyledForm onSubmit={handleAddSubmit}>
                    <StyledInput
                        type="text"
                        placeholder="name"
                        value={addExercise.name}
                        onChange={(event) => setAddExercise({
                            ...addExercise,
                            name: event.target.value
                        })}
                    />
                    <StyledInput
                        type="text"
                        placeholder="type"
                        value={addExercise.type}
                        onChange={(event) => setAddExercise({
                            ...addExercise,
                            type: event.target.value
                        })}
                    />
                    <StyledButton type="submit">Add</StyledButton>
                </StyledForm>

                <StyledForm onSubmit={handleUpdateSubmit}>
                    <StyledInput
                        type="text"
                        placeholder="name"
                        value={updateExercise.name}
                        onChange={(event) => setUpdateExercise({
                            ...updateExercise,
                            name: event.target.value
                        })}
                    />
                    <StyledInput
                        type="text"
                        placeholder="type"
                        value={updateExercise.type}
                        onChange={(event) => setUpdateExercise({
                            ...updateExercise,
                            type: event.target.value
                        })}
                    />
                    <StyledButton type="submit">Update</StyledButton>
                </StyledForm>
                </Box>
            </div>
            <StyledLink to={"/"}>Zurück</StyledLink>
        </StyledContainer>
    )

}

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #3498db;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 10px;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #f0f0f0;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e0e0e0;
    }
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 100vh;
    padding: 10px;
    background-color: #f7f9fc;
    margin-bottom: 20px;
`

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 50px;
    overflow: auto;
    max-height: 500px;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
    margin:10px;
`

const StyledInput = styled.input`
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 95%;

    &:focus {
        outline: none;
        border-color: #3498db;
    }
`

const StyledButton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #3498db;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2980b9;
    }
`

