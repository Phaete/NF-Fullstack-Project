import "./ExerciseBrowser.css/"
import {ExerciseBrowserProps} from "./ExerciseBrowserProps.ts"
import styled from "styled-components";
import {Link} from "react-router-dom";
import ListCard from "../../components/listcard/ListCard.tsx";
import ExerciseDialog from "../../components/exerciseDialog/ExerciseDialog.tsx";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import {Exercise} from "../../App.tsx";

const emptyExercise: Exercise = {
    id: "",
    name: "",
    type: "",
    muscle: "",
    instructions: "",
    equipment: "",
    difficulty: ""
}

export default function ExerciseBrowser(props: Readonly<ExerciseBrowserProps>) {

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [dialogUpdateExercise, setDialogUpdateExercise] = useState(emptyExercise)


    function openEditDialog(exercise: Exercise) {
        setDialogUpdateExercise(exercise)
        setEditDialogOpen(true)
    }


    return (
        <>
            <StyledContainer>
                <div>
                    <StyledDiv>
                        {props.exercises.map(exercise => (
                            <ListCard key={exercise.id} exercise={exercise} fetchData={props.fetchData}
                                      dialogUpdate={openEditDialog}/>
                        ))}
                    </StyledDiv>
                </div>
                <StyledLink to={"/dashboard"}>Zurück</StyledLink>
                <ExerciseDialog startingValue={emptyExercise} open={addDialogOpen} setOpen={setAddDialogOpen}
                                fetchData={props.fetchData} dialogType={"ADD"}/>
                <ExerciseDialog startingValue={dialogUpdateExercise} open={editDialogOpen} setOpen={setEditDialogOpen}
                                fetchData={props.fetchData} dialogType={"UPDATE"}/>
            </StyledContainer>
            <Fab sx={{
                position: "fixed",
                bottom: 70,
                right: 50
            }} onClick={() =>setAddDialogOpen(true)}> <AddIcon/></Fab>
        </>
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
    margin-bottom: 50px;
`

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 10px;
    overflow: auto;
    max-height: 800px;
`
