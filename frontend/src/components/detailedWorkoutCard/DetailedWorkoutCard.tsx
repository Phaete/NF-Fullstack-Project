import {Workout} from "../workoutComponent/WorkoutComponent.tsx";
import "./DetailedWorkoutCard.css/"
import axios from "axios";

type DetailedWorkoutCardProps = {
    workout: Workout,
    clearSelection: () => void,
    fetchData: () => void
}

export default function DetailedWorkoutCard(props: Readonly<DetailedWorkoutCardProps>) {

    function deleteWorkout() {
        axios.delete("/api/workouts/"+props.workout.id).then(() => {
            props.clearSelection()
            props.fetchData()
        }
        )
    }

    return (
        <>
            {props.workout.id !== "1" ?
                <>
                    <button className={"floating-button-tr"} type={"button"} onClick={() => props.clearSelection()}>
                        Clear Selection
                    </button>
                    <div className={"button-container"}>
                        <button className={"floating-button-br"} type={"button"} onClick={() => console.log("edit")}>
                            Edit Workout
                        </button>
                        <button className={"floating-button-br"} type={"button"} onClick={() => deleteWorkout()}>
                            Delete Workout
                        </button>
                    </div>
                </>
            : null}
            <p>{props.workout.name}</p>
            <ul>
                {props.workout.workoutList.map((workout, index) => {
                        return (
                            <li key={index}>
                                <p>Workout Name: {workout.exercise.name}</p>
                                <p>Reps x Sets: {workout.reps} x {workout.sets}</p>
                                <p>Intensity: {workout.amount} {workout.unit}</p>
                            </li>
                        )
                    }
                )}
            </ul>
        </>
    )
}