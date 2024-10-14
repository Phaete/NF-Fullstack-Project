import "./AddWorkoutComponent.css/"
import {AddWorkoutComponentProps} from "./AddWorkoutComponentProps.ts"
import {ChangeEvent, useEffect, useState} from "react";
import {WorkoutListItem} from "../workoutComponent/WorkoutComponent.tsx";
import AddExerciseLine from "../addExerciseLine/AddExerciseLine.tsx";
import {Exercise} from "../../App.tsx";
import axios from "axios";
import styled from "styled-components";


export default function AddWorkoutComponent(props: Readonly<AddWorkoutComponentProps>) {

    const dummyWorkoutItem:() => WorkoutListItem = ():WorkoutListItem => { return {
        exercise: {
            id:"",
            name:"",
            type:"",
            muscle:"",
            instructions:"",
            equipment:"",
            difficulty:"",
        },
        sets: 0,
        reps: 0,
        amount: 0,
        unit: "",
        uniqueId: crypto.randomUUID()
    }}

    const[exerciseList,setExerciseList] = useState<Exercise[]>([])

    useEffect(() => {
        getAllCustomExercises()
        getAllDefaultExercises()
    }, []);

    function getAllCustomExercises() {
        axios.get<Exercise[]>("/api/exercise")
            .then(response => setExerciseList(response.data))
            .catch(err => console.log(err))
    }

    function getAllDefaultExercises() {
        axios.get<Exercise[]>("/api/defaultExercises")
            .then(response => {
                setExerciseList(prevList => mergeUniqueExercises(prevList, response.data));
            })
            .catch(err => console.log(err));
    }

    function mergeUniqueExercises(list1: Exercise[], list2: Exercise[]): Exercise[] {
        const allExercises = [...list1, ...list2];
        return Array.from(new Set(allExercises.map(ex => ex.name)))
            .map(name => allExercises.find(ex => ex.name === name)!);
    }

    function resetForm() {
        props.setWorkout({id:"", name:"", workoutList:[dummyWorkoutItem()]})
    }

    function handleSubmit(){
        if(props.workout.id!==""){
            axios.put("/api/workouts/"+props.workout.id, props.workout)
                .then(() => {
                    props.setNewWorkout(false)
                    resetForm()
                    props.fetchData()
                })
                .catch(err => console.error(err))
        } else {
            axios.post("/api/workouts", props.workout)
                .then(() => {
                    props.setNewWorkout(false)
                    resetForm()
                    props.fetchData()
                })
                .catch(err => console.error(err))
        }
    }


    return (
        <FormContainer>
            <form>
                <p>Workout Name</p>
                <InputField value={props.workout.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        props.setWorkout({
                            ...props.workout,
                            name: event.target.value,
                        });
                    }}
                />
                <p>Exercises</p>
                <div style={{overflow: "auto",
                    maxHeight: "450px"}}>
                {props.workout.workoutList.map((exercise, index) => (
                    <ExerciseContainer key={exercise.uniqueId}>
                        <AddExerciseLine
                            exercise={exercise}
                            index={index}
                            workout={props.workout}
                            setWorkout={props.setWorkout}
                            exerciseList={exerciseList}
                        />
                        <RemoveButton
                            type="button"
                            onClick={() => {
                                props.setWorkout({
                                    ...props.workout,
                                    workoutList: props.workout.workoutList.filter((_, i) => i !== index),
                                });
                            }}
                        >
                            Remove
                        </RemoveButton>
                    </ExerciseContainer>
                ))}
                </div>
            </form>
            <ButtonContainer>
            <Button
                type="button"
                onClick={() => {
                    props.setNewWorkout(false);
                    resetForm();
                }}
            >
                Cancel
            </Button>
                <Button type="button" onClick={handleSubmit}>
                    Save
                </Button>
            <Button
                type="button"
                onClick={() => {
                    props.setWorkout({
                        ...props.workout,
                        workoutList: props.workout.workoutList.concat(dummyWorkoutItem)
                    });
                }}
            >
                Add new exercise
            </Button>
            </ButtonContainer>
        </FormContainer>
    )
}



const FormContainer = styled.div`
    width: 90%;
    max-width: 600px;
    margin: 20px auto;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
`;

const InputField = styled.input`
    width: 90%;
    padding: 12px;
    margin: 12px 0;
    border: 1px solid #90caf9;
    border-radius: 8px;
    font-size: 16px;
    color: #303030;

    &:focus {
        outline: none;
        border-color: #42a5f5;
        box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
    }
`;

const Button = styled.button`
    background-color: transparent;
    color: #303030;
    padding: 10px 20px;
    border: 2px solid #bcdaf5;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(144, 202, 249, 0.1);
    }

    &:active {
        background-color: rgba(144, 202, 249, 0.2);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const RemoveButton = styled(Button)`
    background-color: transparent;
    color: #303030;
    border: 1px solid #d32f2f;

    &:hover {
        background-color: #d32f2f;
        color: #ffffff;
    }
`;

const ExerciseContainer = styled.div`
    margin: 10px 0;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;