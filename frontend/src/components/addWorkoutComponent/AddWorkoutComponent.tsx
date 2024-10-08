import "./AddWorkoutComponent.css/"
import {AddWorkoutComponentProps} from "./AddWorkoutComponentProps.ts"
import {ChangeEvent, useState} from "react";
import {Workout} from "../workoutComponent/WorkoutComponent.tsx";

export default function AddWorkoutComponent(props: Readonly<AddWorkoutComponentProps>) {

    const[workout, setWorkout] = useState<Workout>({id:"", name:"", workoutList:[]})

    function resetForm() {
        setWorkout({id:"", name:"", workoutList:[]})
    }

    return (
        <>
            <form className={"flex flex-col m-10"}>
                <p>Workout Name</p>
                <input onChange={(event : ChangeEvent<HTMLInputElement>) => {
                    setWorkout({
                            ...workout,
                            name: event.target.value
                        }
                    );
                    console.log(workout)
                }}/>
                <p className={"mt-10"}>Exercises</p>
            </form>
            <button type={"button"} onClick={() => {
                props.setNewWorkout(false)
                resetForm()
            }}>Cancel</button>
        </>
    )
}