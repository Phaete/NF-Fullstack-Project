import {Exercise} from "../../App.tsx";
import {FormEvent, useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle, MenuItem, Select, TextField} from "@mui/material";
import axios from "axios";


type ExerciseDialogProps = {
    startingValue: Exercise,
    open: boolean,
    setOpen: (value: boolean) => void,
    fetchData: () => void,
    dialogType: "ADD" | "UPDATE"
}

export default function ExerciseDialog(props: ExerciseDialogProps) {

    const [exercise, setExercise] = useState<Exercise>(props.startingValue)


    const handleClose = () => {
        props.setOpen(false);
    };

    useEffect(() => {
        setExercise(props.startingValue)
    }, [props.open]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(props.dialogType==="ADD"){
            axios.post("/api/fitness",exercise)
                .then(props.fetchData)
                .catch(err => console.error(err))
        } else if(props.dialogType==="UPDATE"){
            axios.put("/api/fitness/"+props.startingValue.id,exercise)
                .then(props.fetchData)
                .catch(err => console.error(err))
        }
        handleClose()
    }

    return (
        <Dialog open={props.open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
        >
            <DialogTitle>
                {props.dialogType === "ADD" ? "Add a new exercise" : "Update an existing exercise"}
            </DialogTitle>
            <TextField
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={props.dialogType==="ADD"?"":props.startingValue.name}
                onChange={(event) => setExercise({
                        ...exercise,
                        name: event.target.value
                    }
                )}
            />
            <Select variant="filled"
                    labelId="type"
                    id="type"
                    label="Type"
                    onChange={(event) => setExercise({
                        ...exercise,
                        type: event.target.value
                    })}
                    defaultValue={props.dialogType==="ADD"?"":props.startingValue.type}
            >
                <MenuItem value={"cardio"}>Cardio</MenuItem>
                <MenuItem value={"olympic_weightlifting"}>Olympic Weightlifting</MenuItem>
                <MenuItem value={"plyometrics"}>Plyometrics</MenuItem>
                <MenuItem value={"powerlifting"}>Powerlifting</MenuItem>
                <MenuItem value={"stretching"}>Streching</MenuItem>
                <MenuItem value={"strongman"}>Strongman</MenuItem>
            </Select>

            <Select variant="filled"
                    labelId="muscle"
                    id="muscle"
                    label="Muscle"
                    onChange={(event) => setExercise({
                        ...exercise,
                        muscle: event.target.value
                    })}
                    defaultValue={props.dialogType==="ADD"?"":props.startingValue.muscle}
            >
                <MenuItem value={"abdominals"}>Abdominals</MenuItem>
                <MenuItem value={"abductors"}>Abductors</MenuItem>
                <MenuItem value={"adductors"}>Adductors</MenuItem>
                <MenuItem value={"biceps"}>Biceps</MenuItem>
                <MenuItem value={"calves"}>Calves</MenuItem>
                <MenuItem value={"chest"}>Chest</MenuItem>
                <MenuItem value={"forearms"}>Forearms</MenuItem>
                <MenuItem value={"glutes"}>Glutes</MenuItem>
                <MenuItem value={"hamstrings"}>Hamstrings</MenuItem>
                <MenuItem value={"lats"}>Lats</MenuItem>
                <MenuItem value={"lower_back"}>Lower Back</MenuItem>
                <MenuItem value={"middle_back"}>Middle Back</MenuItem>
                <MenuItem value={"neck"}>Neck</MenuItem>
                <MenuItem value={"quadriceps"}>Quadriceps</MenuItem>
                <MenuItem value={"traps"}>Traps</MenuItem>
                <MenuItem value={"triceps"}>Triceps</MenuItem>
            </Select>
            <TextField
                required
                margin="dense"
                id="equipment"
                name="equipment"
                label="Equipment"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={props.dialogType==="ADD"?"":props.startingValue.equipment}
                onChange={(event) => setExercise({
                        ...exercise,
                        equipment: event.target.value
                    }
                )}
            />
            <Select variant="filled"
                    labelId="difficulty"
                    id="difficulty"
                    label="Difficulty"
                    onChange={(event) => setExercise({
                        ...exercise,
                        difficulty: event.target.value
                    })}
                    defaultValue={props.dialogType==="ADD"?"":props.startingValue.difficulty}
            >
                <MenuItem value={"beginner"}>Beginner</MenuItem>
                <MenuItem value={"intermediate"}>Intermediate</MenuItem>
                <MenuItem value={"expert"}>Expert</MenuItem>
            </Select>
            <TextField
                required
                margin="dense"
                id="instructions"
                name="instructions"
                label="Instructions"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={props.dialogType==="ADD"?"":props.startingValue.instructions}
                onChange={(event) => setExercise({
                        ...exercise,
                        instructions: event.target.value
                    }
                )}
            />
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">{props.dialogType === "ADD" ? "Add exercise" : "Update exercise"}</Button>
            </DialogActions>
        </Dialog>
    )
}