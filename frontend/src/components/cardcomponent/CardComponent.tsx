import {useParams} from "react-router-dom";
import {Exercise} from "../../App.tsx";
import {useEffect, useState} from "react";
import axios from "axios";


export default function CardComponent() {
    const params = useParams()
    const id = params.id
    const [exercise,setExercise] = useState<Exercise>({
        id: "",
        name: "",
        type: "",
        muscle: "",
        instructions: "",
        equipment: "",
        difficulty: ""
    })

    useEffect(() => {
        axios.get<Exercise>("api/fitness/"+id)
            .then(response => setExercise(response.data))
    }, []);

    return (
        <div>
            <p>{exercise.name}</p>
            <p>{exercise.type}</p>
            <p>{exercise.muscle}</p>
            <p>{exercise.instructions}</p>
            <p>{exercise.equipment}</p>
            <p>{exercise.difficulty}</p>
        </div>
    );
}
