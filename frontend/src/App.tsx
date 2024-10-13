import GlobalStyles from "./GlobalStyles.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import { Route, Routes} from "react-router-dom";
import CardComponent from "./components/cardcomponent/CardComponent.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/footer/Footer.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import ExerciseBrowser from "./pages/exercise_browser/ExerciseBrowser.tsx";
import WorkoutPage from "./pages/workoutPage/WorkoutPage.tsx";
import LandingPage from "./pages/landingPage/LandingPage.tsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.tsx";


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
    const [defaultExercises, setDefaultExercises] = useState<Exercise[]>([])
    const [username, setUsername] = useState<string>("")

    function login(){
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host+'/oauth2/authorization/github', '_self')
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host+'/api/auth/logout', '_self')
    }

    function fetchData() {
        axios.get("api/exercise")
            .then(response => setExercises(response.data))
            .catch(err => console.error(err))
    }

    function fetchAPIData() {
        axios.get("api/defaultExercises")
            .then(response => setDefaultExercises(response.data))
            .catch(err => console.error(err))
    }

    function getMe() {
        axios.get("api/auth/me")
            .then(r => setUsername(r.data))
            .catch(() => setUsername(""))
    }

    useEffect(() => {
        fetchAPIData()
        fetchData()
        getMe()
    }, []);

        return (
            <>
                <GlobalStyles/>
                <Navbar login={login} logout={logout} username={username}/>
                <Routes>
                    <Route path={"/"} element={
                        <LandingPage />
                    } />
                    <Route element={<ProtectedRoute username={username}/>}>
                        <Route path={"/dashboard"} element={
                            <Dashboard />
                        }/>
                        <Route path={"/exercises"} element={
                            <ExerciseBrowser
                                defaultExercises={defaultExercises}
                                setDefaultExercises={setDefaultExercises}
                                exercises={exercises}
                                fetchData={fetchData}
                            />
                        }/>
                        <Route path={"/:id"} element={
                            <CardComponent/>
                        }/>
                        <Route path={"/workouts"} element={
                            <WorkoutPage/>
                        }/>
                    </Route>
                </Routes>
                <Footer/>
            </>
        );
    }


