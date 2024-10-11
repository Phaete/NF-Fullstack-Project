import {Workout} from "../workoutComponent/WorkoutComponent.tsx";
import "./DetailedWorkoutCard.css/"

type DetailedWorkoutCardProps = {
    workout: Workout,
    clearSelection: () => void
}

export default function DetailedWorkoutCard(props: Readonly<DetailedWorkoutCardProps>) {


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
                        <button className={"floating-button-br"} type={"button"} onClick={() => console.log("delete")}>
                            Delete Workout
                        </button>
                    </div>
                </>
            : null}
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