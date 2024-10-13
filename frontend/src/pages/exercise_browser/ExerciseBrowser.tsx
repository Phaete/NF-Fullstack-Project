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
import axios from "axios";

const emptyExercise: Exercise = {
    id: "",
    name: "",
    type: "",
    muscle: "",
    instructions: "",
    equipment: "",
    difficulty: ""
}

type SearchTerm = {
    name: string,
    type: string,
    muscle: string,
    equipment: string,
    difficulty: string,
    instructions: string
}

export default function ExerciseBrowser(props: Readonly<ExerciseBrowserProps>) {

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [dialogUpdateExercise, setDialogUpdateExercise] = useState(emptyExercise)
    const [searchTerm, setSearchTerm] = useState<SearchTerm>({
        name: "",
        type: "",
        muscle: "",
        equipment: "",
        difficulty: "",
        instructions: ""
    });

    function createSearchString(): string {
        const searchParams = new URLSearchParams();
        if (searchTerm.name) searchParams.append("name", searchTerm.name);
        if (searchTerm.type) searchParams.append("type", searchTerm.type);
        if (searchTerm.muscle) searchParams.append("muscle", searchTerm.muscle);
        if (searchTerm.equipment) searchParams.append("equipment", searchTerm.equipment);
        if (searchTerm.difficulty) searchParams.append("difficulty", searchTerm.difficulty);
        if (searchTerm.instructions) searchParams.append("instructions", searchTerm.instructions);
        return `?${searchParams.toString()}`
    }

    function filteredGetRequest() {
        axios.get("api/defaultExercises"+createSearchString())
            .then((response) => props.setDefaultExercises(response.data))
            .catch(() => setSearchTerm({name: "", type: "", muscle: "", equipment: "", difficulty: "", instructions: ""}))
    }

    function openEditDialog(exercise: Exercise) {
        setDialogUpdateExercise(exercise)
        setEditDialogOpen(true)
    }

    return (
        <>
            <RowContainer>
                <StyledContainer>
                    <h2>Default Exercises</h2>
                    <RowDiv>
                        <h3>Filter: </h3>
                        <input onChange={
                            (event) => {
                                setSearchTerm({
                                    ...searchTerm,
                                    name: event.target.value
                                })
                            }
                        } placeholder={"Name"}></input>
                        <select onChange={
                            (event) => {
                                setSearchTerm({
                                    ...searchTerm,
                                    type: event.target.value
                                })
                            }
                        }>
                            <option value="">No Type Filter</option>
                            <option value="cardio">Cardio</option>
                            <option value="olympic_weightlifting">Olympic Weightlifting</option>
                            <option value="plyometrics">Plyometrics</option>
                            <option value="powerlifting">Powerlifting</option>
                            <option value="strength">Strength</option>
                            <option value="stretching">Stretching</option>
                            <option value="strongman">Strongman</option>
                        </select>
                        <select onChange={
                            (event) => {
                                setSearchTerm({
                                    ...searchTerm,
                                    muscle: event.target.value
                                })
                            }
                        }>
                            <option value="">No Muscle Filter</option>
                            <option value="abdominals">Abdominals</option>
                            <option value="abductors">Abductors</option>
                            <option value="adductors">Adductors</option>
                            <option value="biceps">Biceps</option>
                            <option value="calves">Calves</option>
                            <option value="chest">Chest</option>
                            <option value="forearms">Forearms</option>
                            <option value="glutes">Glutes</option>
                            <option value="hamstrings">Hamstrings</option>
                            <option value="lats">Lats</option>
                            <option value="lower_back">Lower Back</option>
                            <option value="middle_back">Middle Back</option>
                            <option value="neck">Neck</option>
                            <option value="quadriceps">Quadriceps</option>
                            <option value="traps">Traps</option>
                            <option value="triceps">Triceps</option>
                        </select>
                        <input onChange={
                            (event) => {
                                setSearchTerm({
                                    ...searchTerm,
                                    equipment: event.target.value
                                })
                            }
                        } placeholder={"Equipment"}></input>
                        <select onChange={
                            (event) => {
                                setSearchTerm({
                                    ...searchTerm,
                                    difficulty: event.target.value
                                })
                            }
                        }>
                            <option value="">No Difficulty Filter</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="expert">Expert</option>
                        </select>
                        <input onChange={
                            (event) => {
                                setSearchTerm({
                                    ...searchTerm,
                                    instructions: event.target.value
                                })
                            }
                        } placeholder={"Instructions"}></input>
                        <button type={"button"} onClick={() => filteredGetRequest()}>Search</button>
                    </RowDiv>
                    {props.defaultExercises.length === 0 ?
                        <StyledWarning>No Exercises with the specified filters found</StyledWarning>
                        :
                        props.defaultExercises.map(exercise => (
                            <ListCard key={exercise.name} exercise={exercise} fetchData={props.fetchData}
                                      dialogUpdate={openEditDialog}/>
                        ))
                    }
                </StyledContainer>
                <StyledContainer>
                    <h2>Custom Exercises</h2>
                    <div>
                        <StyledDiv>
                            {props.exercises.map(exercise => (
                                <ListCard key={exercise.id} exercise={exercise} fetchData={props.fetchData}
                                          dialogUpdate={openEditDialog}/>
                            ))}
                        </StyledDiv>
                    </div>
                    <ExerciseDialog startingValue={emptyExercise} open={addDialogOpen} setOpen={setAddDialogOpen}
                                    fetchData={props.fetchData} dialogType={"ADD"}/>
                    <ExerciseDialog startingValue={dialogUpdateExercise} open={editDialogOpen} setOpen={setEditDialogOpen}
                                    fetchData={props.fetchData} dialogType={"UPDATE"}/>
                </StyledContainer>
            </RowContainer>
            <StyledLink to={"/dashboard"}>Zurück</StyledLink>

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

const StyledWarning = styled.div`
    flex: 1 1 auto;
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 80vh;
    padding: 10px;
    background-color: #f7f9fc;
    margin-bottom: 50px;
    overflow: auto;
`

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    min-height: 100vh;
    padding: 10px;
    background-color: #f7f9fc;
    margin-bottom: 20px;
`

const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
`

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 50px;
    overflow: auto;
    max-height: 800px;
`
