import {Workout} from "../workoutComponent/WorkoutComponent.tsx";

export type AddWorkoutComponentProps = {
    setNewWorkout: (newWorkout: boolean) => void,
    fetchData:() => void,
    workout:Workout,
    setWorkout: (w:Workout) => void
}