import {Workout} from "../workoutComponent/WorkoutComponent.tsx";
import "./DetailedWorkoutCard.css/"
import axios from "axios";
import styled from "styled-components";

type DetailedWorkoutCardProps = {
    workout: Workout,
    clearSelection: () => void,
    fetchData: () => void
}

export default function DetailedWorkoutCard(props: Readonly<DetailedWorkoutCardProps>) {

    function deleteWorkout() {
        axios.delete("/api/workouts/" + props.workout.id).then(() => {
                props.clearSelection()
                props.fetchData()
            }
        )
    }

    return (
        <>
            {props.workout.id !== "1" ? (
                <>
                    <ButtonContainer>
                    <OutlinedButton type="button" onClick={() => props.clearSelection()}>
                        Clear Selection
                    </OutlinedButton>

                        <OutlinedButton type="button" onClick={() => console.log("edit")}>
                            Edit Workout
                        </OutlinedButton>
                        <OutlinedButton type="button" onClick={() => deleteWorkout()}>
                            Delete Workout
                        </OutlinedButton>
                    </ButtonContainer>
                </>
            ) : null}
            <p>{props.workout.name}</p>
            <StyledList>
                {props.workout.workoutList.map((workout, index) => {
                    return (
                        <StyledListItem key={index}>
                            <p>Workout Name: {workout.exercise.name}</p>
                            <p>Reps x Sets: {workout.reps} x {workout.sets}</p>
                            <p>Intensity: {workout.amount} {workout.unit}</p>
                        </StyledListItem>
                    );
                })}
            </StyledList>
        </>
    )
}

const OutlinedButton = styled.button`
    background-color: transparent;
    color: #303030;
    padding: 5px 10px;
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

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  border: 1px solid #90caf9;
  border-radius: 8px;
  background-color: rgba(144, 202, 249, 0.05);
`;

const StyledListItem = styled.li`
    padding: 15px;
    margin: 5px 0;
    border-bottom: 1px solid #90caf9;
    transition: background-color 0.2s ease;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: rgba(144, 202, 249, 0.1);
    }

    p {
        margin: 5px 0;
        font-size: 16px;
        color: black;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
`;