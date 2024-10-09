import GlobalStyles from "./GlobalStyles.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import { Route, Routes} from "react-router-dom";
import CardComponent from "./components/cardcomponent/CardComponent.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/footer/Footer.tsx";
import LandingPage from "./pages/landingPage/LandingPage.tsx";
import ExerciseBrowser from "./pages/exercise_browser/ExerciseBrowser.tsx";


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

    function login(){
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host+'/oauth2/authorization/github', '_self')
    }

    function fetchData() {
        axios.get("api/exercise")
            .then(response => setExercises(response.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchData()
    }, []);

        return (
            <>
                <GlobalStyles/>
                <Navbar login={login}/>
                <Routes>
                    <Route path={"/"} element={
                        <LandingPage />
                    }/>
                    <Route path={"/exercises"} element={
                        <ExerciseBrowser
                            exercises={exercises}
                            fetchData={fetchData}
                        />
                    }/>
                    <Route path={"/:id"} element={
                        <CardComponent/>
                    }/>
                </Routes>
                <Footer/>
            </>
        );
    }


