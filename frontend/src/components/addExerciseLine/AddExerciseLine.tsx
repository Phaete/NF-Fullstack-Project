import "./AddExerciseLine.css"
import {Workout, WorkoutListItem} from "../workoutComponent/WorkoutComponent.tsx";
import {Exercise} from "../../App.tsx";
import {ChangeEvent} from "react";
import styled from "styled-components";

type AddExerciseLineProps = {
    exercise: WorkoutListItem,
    workout: Workout,
    index: number,
    setWorkout: (w: Workout) => void,
    exerciseList: Exercise[]
}

export default function AddExerciseLine(props: Readonly<AddExerciseLineProps>) {

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        console.log(props.index)
        props.setWorkout({
            ...props.workout,
            workoutList: props.workout.workoutList.map((item, i) =>
                i === props.index ?
                    {
                        ...item,
                        exercise: props.exerciseList.find((exercise) => exercise.name === event.target.value) || item.exercise
                    }
                    : item
            )
        })
    }


    return (
        <Container>
            <Select onChange={handleSelectChange}>
                <option value={""}>Select an exercise</option>
                {props.exerciseList.map(exercise =>
                    <option value={exercise.name} key={exercise.id}>
                        {exercise.name}
                    </option>
                )}
            </Select>
            <InputContainer>
                <StyledInput placeholder={"Sets"} onChange={
                    (event: ChangeEvent<HTMLInputElement>) => {
                        props.setWorkout({
                            ...props.workout,
                            workoutList: props.workout.workoutList.map((item, i) =>
                                i === props.index ?
                                    {
                                        ...item,
                                        sets: +event.target.value || 0
                                    }
                                    : item
                            )
                        })
                    }
                }/>
                <StyledInput placeholder={"Reps"} onChange={
                    (event: ChangeEvent<HTMLInputElement>) => {
                        props.setWorkout({
                            ...props.workout,
                            workoutList: props.workout.workoutList.map((item, i) =>
                                i === props.index ?
                                    {
                                        ...item,
                                        reps: +event.target.value || 0
                                    }
                                    : item
                            )
                        })
                    }
                }/>
                <StyledInput placeholder={"Amount"} onChange={
                    (event: ChangeEvent<HTMLInputElement>) => {
                        props.setWorkout({
                            ...props.workout,
                            workoutList: props.workout.workoutList.map((item, i) =>
                                i === props.index ?
                                    {
                                        ...item,
                                        amount: +event.target.value || 0
                                    }
                                    : item
                            )
                        })
                    }
                }/>
                <StyledInput placeholder={"Unit"} onChange={
                    (event: ChangeEvent<HTMLInputElement>) => {
                        props.setWorkout({
                            ...props.workout,
                            workoutList: props.workout.workoutList.map((item, i) =>
                                i === props.index ?
                                    {
                                        ...item,
                                        unit: event.target.value
                                    }
                                    : item
                            )
                        })
                    }
                }/>
            </InputContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #90caf9;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const Select = styled.select`
    padding: 5px;
    border: 1px solid #90caf9;
    border-radius: 4px;
    font-size: 16px;
    color: #303030;
`;

const InputContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const StyledInput = styled.input`
    padding: 5px;
    border: 1px solid #90caf9;
    border-radius: 4px;
    font-size: 16px;
    color: #303030;
    width: 80px;
`;