import {Exercise} from "../../App.tsx";

export type Workout = {
    id: string,
    name: string,
    workoutList: WorkoutListItem[]
}

export type WorkoutListItem= {
    exercise: Exercise,
    sets: number,
    reps: number,
    amount: number,
    unit: string
}


export default function WorkoutComponent(props: Workout) {

    return (
        <div>
            <h3>{props.name}</h3>
            <ul>
                {props.workoutList.map((workoutListItem, index) => {
                    return (
                        <li key={index}>
                            <p>{workoutListItem.exercise.name}</p>
                            <p>{workoutListItem.sets}</p>
                            <p>{workoutListItem.reps}</p>
                            <p>{workoutListItem.amount}</p>
                            <p>{workoutListItem.unit}</p>
                        </li>
                    )})
                }
            </ul>
        </div>
    )
}