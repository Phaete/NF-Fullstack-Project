import {useEffect, useState} from "react";
import {Workout} from "../../components/workoutComponent/WorkoutComponent.tsx";
import WorkoutList from "../../components/workoutList/WorkoutList.tsx";
import axios from "axios";
import DetailedWorkoutCard from "../../components/detailedWorkoutCard/DetailedWorkoutCard.tsx";
import "./WorkoutPage.css/"
import AddWorkoutComponent from "../../components/addWorkoutComponent/AddWorkoutComponent.tsx";

export default function WorkoutPage() {

    const [workout, setWorkout] = useState<Workout>({id:"1", name:"Please select a workout!", workoutList: []});
    const [workoutList, setWorkoutList] = useState<Workout[]>([]);
    const [newWorkout, setNewWorkout] = useState<boolean>(false)

    function clearSelection():void {
        setWorkout({id:"1", name:"Please select a workout!", workoutList: []})
    }

    function fetchData() {
        axios.get("api/workouts")
            .then(response => setWorkoutList(response.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchData()
    }, []);


    return (
        <div className={"centered flex flex-row align-center m-20"}>
            <div className={"h-80 flex-2 bordered"}>
            {newWorkout ? (
                <AddWorkoutComponent setNewWorkout={setNewWorkout} fetchData={fetchData}/>
            ) : (
                <>
                    <div>
                        <WorkoutList workoutList={workoutList} setWorkout={setWorkout}/>
                    </div>
                    <button className={"float-br mr-10"} onClick={() => setNewWorkout(true)}>Add Workout</button>
                </>
            )}
            </div>

            <div className={"h-80 m-20 flex-1 bordered"}>
                <div className={"m-20"}>
                    <DetailedWorkoutCard workout={workout} clearSelection={clearSelection}/>
                </div>
            </div>
        </div>
    );
}

