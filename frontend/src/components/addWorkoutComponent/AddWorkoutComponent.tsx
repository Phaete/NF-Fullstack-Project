import "./AddWorkoutComponent.css/"
import {AddWorkoutComponentProps} from "./AddWorkoutComponentProps.ts"
import {ChangeEvent, useEffect, useState} from "react";
import {WorkoutListItem} from "../workoutComponent/WorkoutComponent.tsx";
import AddExerciseLine from "../addExerciseLine/AddExerciseLine.tsx";
import {Exercise} from "../../App.tsx";
import axios from "axios";


export default function AddWorkoutComponent(props: Readonly<AddWorkoutComponentProps>) {

    const dummyWorkoutItem:() => WorkoutListItem = ():WorkoutListItem => { return {
        exercise: {
            id:"",
            name:"",
            type:"",
            muscle:"",
            instructions:"",
            equipment:"",
            difficulty:"",
        },
        sets: 0,
        reps: 0,
        amount: 0,
        unit: " ",
        uniqueId: crypto.randomUUID()
    }}

    const[exerciseList,setExerciseList] = useState<Exercise[]>([])

    useEffect(() => {
        getAllCustomExercises()
        getAllDefaultExercises()
    }, []);

    function getAllCustomExercises() {
        axios.get<Exercise[]>("/api/exercise")
            .then(response => setExerciseList(response.data))
            .catch(err => console.log(err))
    }

    function getAllDefaultExercises() {
        axios.get<Exercise[]>("/api/defaultExercises")
            .then(response => setExerciseList(exerciseList.concat(response.data)))
            .catch(err => console.log(err))
    }

    function resetForm() {
        props.setWorkout({id:"", name:"", workoutList:[dummyWorkoutItem()]})
    }

    function handleSubmit(){
        if(props.workout.id!==""){
            axios.put("/api/workouts/"+props.workout.id, props.workout)
                .then(() => {
                    props.setNewWorkout(false)
                    resetForm()
                    props.fetchData()
                })
                .catch(err => console.error(err))
        } else {
            axios.post("/api/workouts", props.workout)
                .then(() => {
                    props.setNewWorkout(false)
                    resetForm()
                    props.fetchData()
                })
                .catch(err => console.error(err))
        }
    }

    

    return (
        <>
            <form className={"flex flex-col m-10"}>
                <p>Workout Name</p>
                <input value={props.workout.name} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    props.setWorkout({
                            ...props.workout,
                            name: event.target.value
                        }
                    );
                }}/>
                <p className={"mt-10"}>Exercises</p>
                {props.workout.workoutList.map((exercise, index) =>
                    <div key={exercise.uniqueId}>
                        <div className={"flex flex-row w-100"}>
                            <div className={"flex-1"}>
                                <AddExerciseLine exercise={exercise} index={index} workout={props.workout} setWorkout={props.setWorkout}
                                                 exerciseList={exerciseList}/>
                            </div>
                            <button type={"button"} className={"delete-button"} onClick={
                                () => {
                                    props.setWorkout({
                                        ...props.workout,
                                        workoutList: props.workout.workoutList.filter((_, i) => i !== index)
                                    })
                                }
                            }>Remove
                            </button>
                        </div>
                    </div>
                )}
                <button type={"button"} onClick={handleSubmit}>Save</button>
            </form>
            <button type={"button"} onClick={() => {
                props.setNewWorkout(false)
                resetForm()
            }}>Cancel
            </button>
            <button type={"button"} onClick={() => {
                props.setWorkout({
                    ...props.workout,
                    workoutList: props.workout.workoutList.concat(dummyWorkoutItem())
                })
            }}>Add new exercise
            </button>
        </>
    )
}