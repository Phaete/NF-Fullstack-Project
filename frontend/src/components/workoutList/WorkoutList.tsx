import {Workout} from "../workoutComponent/WorkoutComponent.tsx";

type WorkoutListProps = {
    workoutList: Workout[],
    setWorkout: (workout: Workout) => void
}

export default function WorkoutList(props : Readonly<WorkoutListProps>) {

    return (
        <div>
            <ul className={"no-dot"}>
                {props.workoutList.map((workoutComponent) => {
                    return (
                        <li key={workoutComponent.id}>
                            <button onClick={() => props.setWorkout(workoutComponent)}>
                                {workoutComponent.name}
                            </button>
                        </li>
                    )})
                }
            </ul>
        </div>
    );
}