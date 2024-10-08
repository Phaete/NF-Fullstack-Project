import {Workout} from "../workoutComponent/WorkoutComponent.tsx";

type DetailedWorkoutCardProps = {
    workout: Workout
}

export default function DetailedWorkoutCard(props: DetailedWorkoutCardProps) {
    return (
        <>
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