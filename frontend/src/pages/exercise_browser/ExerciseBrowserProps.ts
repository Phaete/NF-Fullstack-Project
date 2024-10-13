import {Exercise} from "../../App.tsx";

export type ExerciseBrowserProps = {
    defaultExercises: Exercise[];
    setDefaultExercises: (Exercises: Exercise[]) => void;
    exercises: Exercise[];
    fetchData: () => void;
}