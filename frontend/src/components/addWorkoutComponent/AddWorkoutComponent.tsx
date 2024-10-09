import "./AddWorkoutComponent.css/"
import {AddWorkoutComponentProps} from "./AddWorkoutComponentProps.ts"
import {ChangeEvent, useEffect, useState} from "react";
import {Workout, WorkoutListItem} from "../workoutComponent/WorkoutComponent.tsx";
import AddExerciseLine from "../addExerciseLine/AddExerciseLine.tsx";
import {Exercise} from "../../App.tsx";
import axios from "axios";


export default function AddWorkoutComponent(props: Readonly<AddWorkoutComponentProps>) {

    const dummyWorkoutItem:WorkoutListItem = {
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
        unit: " "
    }

    const[workout, setWorkout] = useState<Workout>({id:"", name:"", workoutList:[dummyWorkoutItem]})
    const [exerciseList,setExerciseList] = useState<Exercise[]>([])

    useEffect(() => {
        axios.get<Exercise[]>("/api/exercise")
            .then(response => setExerciseList(response.data))
            .catch(err => console.log(err))
    }, []);

    function resetForm() {
        setWorkout({id:"", name:"", workoutList:[dummyWorkoutItem]})
    }

    function handleSubmit(){
        axios.post("/api/workouts",workout)
            .then(() => {
                props.setNewWorkout(false)
                resetForm()
                props.fetchData()
            })
            .catch(err => console.error(err))

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
                {workout.workoutList.map((exercise,index) =>
                    <AddExerciseLine  exercise={exercise} index={index} workout={workout} setWorkout={setWorkout} exerciseList={exerciseList} key={index}/>)}
                <button type={"button"} onClick={handleSubmit}>Save</button>
            </form>
            <button type={"button"} onClick={() => {
                props.setNewWorkout(false)
                resetForm()
            }}>Cancel</button>
        </>
    )
}