import {useEffect, useState} from "react";
import {Workout, WorkoutListItem} from "../../components/workoutComponent/WorkoutComponent.tsx";
import WorkoutList from "../../components/workoutList/WorkoutList.tsx";
import axios from "axios";
import DetailedWorkoutCard from "../../components/detailedWorkoutCard/DetailedWorkoutCard.tsx";
import "./WorkoutPage.css/"
import AddWorkoutComponent from "../../components/addWorkoutComponent/AddWorkoutComponent.tsx";

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

export default function WorkoutPage() {

    const [detailViewWorkout, setDetailViewWorkout] = useState<Workout>({id:"1", name:"Please select a workout!", workoutList: []});
    const [addWorkout,setAddWorkout] = useState<Workout>({id:"", name:"", workoutList:[dummyWorkoutItem()]})
    const [workoutList, setWorkoutList] = useState<Workout[]>([]);
    const [newWorkout, setNewWorkout] = useState<boolean>(false)

    function clearSelection():void {
        setDetailViewWorkout({id:"1", name:"Please select a workout!", workoutList: []})
    }

    function fetchData() {
        axios.get<Workout[]>("api/workouts")
            .then(response => {
                setWorkoutList(response.data)
                if(detailViewWorkout.id!=="1") {
                    setDetailViewWorkout(response.data.find(w => w.id===detailViewWorkout.id)||{id:"1", name:"Please select a workout!", workoutList: []})
                }
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {

    }, [workoutList]);

    function editWorkout(w:Workout):void {
        setNewWorkout(true)
        setAddWorkout(w)
    }



    return (
        <div className={"centered flex flex-row align-center m-20"}>
            <div className={"h-80 flex-2 bordered"}>
            {newWorkout ? (
                <AddWorkoutComponent setNewWorkout={setNewWorkout} fetchData={fetchData} workout={addWorkout} setWorkout={setAddWorkout}/>
            ) : (
                <>
                    <div>
                        <WorkoutList workoutList={workoutList} setWorkout={setDetailViewWorkout}/>
                    </div>
                    <button className={"float-br mr-10"} onClick={() => setNewWorkout(true)}>Add Workout</button>
                </>
            )}
            </div>

            <div className={"h-80 m-20 flex-1 bordered"}>
                <div className={"m-20"}>
                    <DetailedWorkoutCard workout={detailViewWorkout} clearSelection={clearSelection} fetchData={fetchData} editCallback={editWorkout}/>
                </div>
            </div>
        </div>
    );
}

