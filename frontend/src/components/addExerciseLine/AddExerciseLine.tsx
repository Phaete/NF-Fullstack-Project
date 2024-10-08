import "./AddExerciseLine.css"
import {Workout, WorkoutListItem} from "../workoutComponent/WorkoutComponent.tsx";
import {Exercise} from "../../App.tsx";
import {ChangeEvent} from "react";

type AddExerciseLineProps = {
    exercise: WorkoutListItem,
    workout: Workout,
    index: number,
    setWorkout: (w: Workout) => void,
    exerciseList: Exercise[]
}

export default function AddExerciseLine(props: AddExerciseLineProps) {

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
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
        <div className={"container"}>
            <select onChange={handleSelectChange} className={"container-item3"}>
                <option value={""}>Select an exercise</option>
                {props.exerciseList.map(exercise =>
                    <option value={exercise.name} key={exercise.id}>
                        {exercise.name}
                    </option>
                )}
            </select>
            <div className={"container-item1"}>
                <input placeholder={"Sets"} onChange={
                    (event:ChangeEvent<HTMLInputElement>) => {
                        props.setWorkout({
                            ...props.workout,
                            workoutList: props.workout.workoutList.map((item, i) =>
                                i === props.index ?
                                    {
                                        ...item,
                                        sets: +event.target.value||0
                                    }
                                    : item
                            )
                        })
                    }
                }/>
                <input placeholder={"Reps"} onChange={
                    (event:ChangeEvent<HTMLInputElement>) => {
                        props.setWorkout({
                            ...props.workout,
                            workoutList: props.workout.workoutList.map((item, i) =>
                                i === props.index ?
                                    {
                                        ...item,
                                        reps: +event.target.value||0
                                    }
                                    : item
                            )
                        })
                    }
                }/>
                <input placeholder={"Amount"} onChange={
                    (event:ChangeEvent<HTMLInputElement>) => {
                        props.setWorkout({
                            ...props.workout,
                            workoutList: props.workout.workoutList.map((item, i) =>
                                i === props.index ?
                                    {
                                        ...item,
                                        amount: +event.target.value||0
                                    }
                                    : item
                            )
                        })
                    }
                }/>
                <input placeholder={"Unit"} onChange={
                    (event:ChangeEvent<HTMLInputElement>) => {
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
            </div>
        </div>
    )
}