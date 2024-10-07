import styled from "styled-components";
import {Link} from "react-router-dom";
import {Exercise} from "../App.tsx";
import ListCard from "../components/listcard/ListCard.tsx";
import {Button} from "@mui/material";
import ExerciseDialog from "../components/exerciseDialog/ExerciseDialog.tsx";
import {useState} from "react";

type MainPageProps = {
    exercises: Exercise[];
    fetchData: () => void;
}

const emptyExercise:Exercise = {
    id: "",
    name: "",
    type: "",
    muscle: "",
    instructions: "",
    equipment: "",
    difficulty: ""
}

export default function MainPage({
                                     exercises,
                                     fetchData,
                                 }: MainPageProps) {

    const [addDialogOpen,setAddDialogOpen] = useState(false);
    const [editDialogOpen,setEditDialogOpen] = useState(false);
    const [dialogUpdateExercise,setDialogUpdateExercise] = useState(emptyExercise)


    function openEditDialog(exercise:Exercise){
        setDialogUpdateExercise(exercise)
        setEditDialogOpen(true)
    }


    return (
        <StyledContainer>
            <div>
                <Button onClick={() => setAddDialogOpen(true)}>Test Add</Button>
                <StyledDiv>
                    {exercises.map(exercise => (
                        <ListCard key={exercise.id}  exercise={exercise} fetchData={fetchData} dialogUpdate={openEditDialog}/>
                    ))}
                </StyledDiv>
            </div>
            <StyledLink to={"/"}>Zurück</StyledLink>
            <ExerciseDialog startingValue={emptyExercise} open={addDialogOpen} setOpen={setAddDialogOpen} fetchData={fetchData} dialogType={"ADD"}/>
            <ExerciseDialog startingValue={dialogUpdateExercise} open={editDialogOpen} setOpen={setEditDialogOpen} fetchData={fetchData} dialogType={"UPDATE"}/>
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
    max-height: 800px;
`
