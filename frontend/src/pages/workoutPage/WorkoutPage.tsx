import {useEffect, useState} from "react";
import {Workout} from "../../components/workoutComponent/WorkoutComponent.tsx";
import WorkoutList from "../../components/workoutList/WorkoutList.tsx";
import axios from "axios";
import DetailedWorkoutCard from "../../components/detailedWorkoutCard/DetailedWorkoutCard.tsx";
import "./WorkoutPage.css/"
import AddWorkoutComponent from "../../components/addWorkoutComponent/AddWorkoutComponent.tsx";
import styled from "styled-components";

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

    useEffect(() => {

    }, [workoutList]);


    return (
        <>
            <WorkoutContainer>
                <WorkoutBox>
                    {newWorkout ? (
                        <AddWorkoutComponent setNewWorkout={setNewWorkout} fetchData={fetchData} />
                    ) : (
                        <>
                            <WorkoutList workoutList={workoutList} setWorkout={setWorkout} />
                            <Button  onClick={() => setNewWorkout(true)}>
                                Add Workout
                            </Button>
                        </>
                    )}
                </WorkoutBox>

                <WorkoutBox>
                    <DetailedWorkoutCard workout={workout} clearSelection={clearSelection} fetchData={fetchData} />
                </WorkoutBox>
            </WorkoutContainer>
        </>
    );
}

const WorkoutBox = styled.div`
    width: 50%;
    height: 80vh;
    background-color: white;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: inline-block;
    vertical-align: top;
`;

const WorkoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
    background-color: transparent;
    color: #303030;
    padding: 5px 10px;
    border: 2px solid #bcdaf5;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(144, 202, 249, 0.1);
    }

    &:active {
        background-color: rgba(144, 202, 249, 0.2);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }
`;
