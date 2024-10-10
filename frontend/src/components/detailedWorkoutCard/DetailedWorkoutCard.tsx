import {Workout} from "../workoutComponent/WorkoutComponent.tsx";
import "./DetailedWorkoutCard.css/"

type DetailedWorkoutCardProps = {
    workout: Workout,
    clearSelection: () => void
}

export default function DetailedWorkoutCard(props: Readonly<DetailedWorkoutCardProps>) {
    return (
        <>
            <button className={"floating-button"} type={"button"} onClick={() => props.clearSelection()}>Clear Selection</button>
            <p>{props.workout.name}</p>
            <ul>
                {props.workout.workoutList.map((workout) => {
                    return (
                        <li key={workout.exercise.id}>
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