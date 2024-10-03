import GlobalStyles from "./GlobalStyles.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import { Route, Routes} from "react-router-dom";
import CardComponent from "./components/cardcomponent/CardComponent.tsx";
import MainPage from "./pages/MainPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/footer/Footer.tsx";


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





        return (
            <>
                <GlobalStyles/>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={
                        <HomePage />
                    }/>
                    <Route path={"/mainpage"} element={
                        <MainPage
                        exercises={exercises}
                        fetchData={fetchData}
                        setUpdateExercise={setUpdateExercise}
                        addExercise={addExercise}
                        setAddExercise={setAddExercise}
                        updateExercise={updateExercise}
                        />
                    }>
                    </Route>
                    <Route path={"/:id"} element={
                        <CardComponent/>
                    }></Route>
                </Routes>
                <Footer/>
            </>
        );
    }


