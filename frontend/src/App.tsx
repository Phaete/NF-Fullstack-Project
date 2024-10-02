import GlobalStyles from "./GlobalStyles.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, Routes} from "react-router-dom";
import CardComponent from "./components/cardcomponent/CardComponent.tsx";
import styled from "styled-components";


export type Exercise = {
    id:string,
    name:string,
    type:string,
    muscle:string,
    instructions:string,
    equipment:string,
    difficulty:string,
}

export default function App() {


    const [exercises, setExercises] = useState<Exercise[]>([])
    const [addExercise, setAddExercise] = useState<Exercise>({
        id: "",
        name: "",
        type: "",
        muscle: "",
        instructions: "",
        equipment: "",
        difficulty: ""
    })
    const [updateExercise, setUpdateExercise] = useState<Exercise>({
        id: "",
        name: "",
        type: "",
        muscle: "",
        instructions: "",
        equipment: "",
        difficulty: ""
    })


    function fetchData() {
        axios.get("api/fitness")
            .then(response => setExercises(response.data))
            .catch(err => console.error(err))
    }


    useEffect(() => {
        fetchData()
    }, []);

    function handleAddSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        axios.post("api/fitness", addExercise)
            .then(() => fetchData())
        setAddExercise({
            id: "",
            name: "",
            type: "",
            muscle: "",
            instructions: "",
            equipment: "",
            difficulty: ""
        })}

        function handleUpdateSubmit(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault()

            axios.put("api/fitness/" + updateExercise.id, updateExercise)
                .then(() => fetchData())
            setUpdateExercise({
                id: "",
                name: "",
                type: "",
                muscle: "",
                instructions: "",
                equipment: "",
                difficulty: ""
            })
        }

        return (
            <>
                <GlobalStyles/>
                <Routes>
                    <Route path={"/"} element={
                        <div>
                            {exercises.map(exercise => <div key={exercise.id}>
                                <StyledLink to={"/"+exercise.id}>{exercise.name}</StyledLink>
                                <button type={"button"} onClick={() => axios.delete("api/fitness/"+exercise.id)
                                    .then(()=> fetchData())
                                    .catch(err => console.error(err))}>Delete</button>
                                <button type={"button"} onClick={()=> setUpdateExercise(exercise)}>Update</button>
                            </div>)}
                            <form onSubmit={handleAddSubmit}>
                                <input type="text" placeholder={"name"} value={addExercise.name}
                                       onChange={(event) => setAddExercise({
                                           ...addExercise,
                                           name: event.target.value
                                       })}/>
                                <input type="text" placeholder={"type"} value={addExercise.type}
                                       onChange={(event) => setAddExercise({
                                           ...addExercise,
                                           type: event.target.value
                                       })}/>
                                <button>Add</button>
                            </form>

                            <form onSubmit={handleUpdateSubmit}>
                                <input type="text" placeholder={"name"} value={updateExercise.name}
                                       onChange={(event) => setUpdateExercise({
                                           ...updateExercise,
                                           name: event.target.value
                                       })}/>
                                <input type="text" placeholder={"type"} value={updateExercise.type}
                                       onChange={(event) => setUpdateExercise({
                                           ...updateExercise,
                                           type: event.target.value
                                       })}/>
                                <button>Update</button>
                            </form>
                        </div>
                    }>
                    </Route>
                    <Route path={"/:id"} element={
                        <CardComponent/>
                    }></Route>
                </Routes>
            </>
        );
    }
const StyledLink=styled(Link)`
text-decoration:none;
gap:20px;
color:black;
margin:20px;
`

