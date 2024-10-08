import {Exercise} from "../../App.tsx";

export type ExerciseBrowserProps = {
    exercises: Exercise[];
    fetchData: () => void;
}