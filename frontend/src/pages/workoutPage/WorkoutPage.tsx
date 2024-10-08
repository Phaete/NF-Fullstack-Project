import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {Workout} from "../../components/workoutComponent/WorkoutComponent.tsx";
import WorkoutList from "../../components/workoutList/WorkoutList.tsx";
import axios from "axios";


export default function WorkoutPage() {

    const [workout, setWorkout] = useState<Workout>();
    const [workoutList, setWorkoutList] = useState<Workout[]>([]);

    useEffect(() => {
        axios.get("api/workout")
            .then(response => setWorkoutList(response.data))
            .catch(err => console.error(err))
    }, []);


    return (
        <div>
            <Box>
                <WorkoutList workoutList={workoutList} setWorkout={setWorkout}/>
            </Box>
        </div>
    );
}

