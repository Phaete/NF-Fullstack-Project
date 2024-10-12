import {Workout} from "../workoutComponent/WorkoutComponent.tsx";
import styled from "styled-components";

type WorkoutListProps = {
    workoutList: Workout[],
    setWorkout: (workout: Workout) => void
}

export default function WorkoutList(props : Readonly<WorkoutListProps>) {

    return (
        <div>
            <h1>Personal Workouts</h1>
            <StyledList >
                {props.workoutList.map((workoutComponent) => {
                    return (
                        <StyledListItem key={workoutComponent.id}>
                            <Button onClick={() => props.setWorkout(workoutComponent)}>
                                {workoutComponent.name}
                            </Button>
                        </StyledListItem>
                    )})
                }
            </StyledList>
        </div>
    );
}

const Button = styled.button`
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