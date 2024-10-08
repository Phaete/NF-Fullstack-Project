import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {Workout} from "../../components/workoutComponent/WorkoutComponent.tsx";
import WorkoutList from "../../components/workoutList/WorkoutList.tsx";
import axios from "axios";
import DetailedWorkoutCard from "../../components/detailedWorkoutCard/DetailedWorkoutCard.tsx";


export default function WorkoutPage() {

    const [workout, setWorkout] = useState<Workout>({id:"1", name:"empty workout", workoutList: []});
    const [workoutList, setWorkoutList] = useState<Workout[]>([]);

    useEffect(() => {
        axios.get("api/workouts")
            .then(response => setWorkoutList(response.data))
            .catch(err => console.error(err))
    }, []);


    return (
        <div>
            <Box>
                <WorkoutList workoutList={workoutList} setWorkout={setWorkout}/>
                <DetailedWorkoutCard workout={workout}/>
            </Box>
        </div>
    );
}

