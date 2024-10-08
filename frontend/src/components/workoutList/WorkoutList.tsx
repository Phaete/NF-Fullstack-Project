import {Workout} from "../workoutComponent/WorkoutComponent.tsx";

type WorkoutListProps = {
    workoutList: Workout[],
    setWorkout: (workout: Workout) => void
}

export default function WorkoutList(props : WorkoutListProps) {

    return (
        <div>
            <ul>
                {props.workoutList.map((workoutComponent, index) => {
                    return (
                        <li key={index}>
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