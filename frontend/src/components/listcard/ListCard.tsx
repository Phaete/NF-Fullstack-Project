import {Exercise} from "../../App.tsx";
import {Box, Button, Card, Collapse, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";

type ListCardProps = {
    exercise: Exercise
    fetchData:() => void
    setUpdateExercise: (e:Exercise) => void
}

export default function ListCard(props: ListCardProps) {
    const [expanded, setExpanded] = useState(false);

    function toggleExpanded() {
        setExpanded(!expanded);
    }

    return (
        <Card
            sx={{
                overflow: 'visible',
                width:800
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                }}
            >
                <Typography variant="h6">{props.exercise.name}</Typography>
                <Button
                    aria-expanded={expanded}
                    aria-label="show more"
                    onClick={toggleExpanded}
                    variant="contained"
                >
                    {expanded ? 'Collapse' : 'Expand'}
                </Button>
            </Box>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box sx={{
                    display:'flex',
                    justifyContent:'flex-end',
                    gap:0.5
                }}>
                    <Button variant="contained"
                            onClick={
                        () => axios.delete("api/fitness/" + props.exercise.id)
                        .then(() => props.fetchData())
                        .catch(err => console.error(err))}
                    >
                        Delete
                    </Button>
                    <Button variant="contained" onClick={() => props.setUpdateExercise(props.exercise)}>
                        Edit
                    </Button>
                </Box>
                <Typography>{props.exercise.difficulty}</Typography>
                <Typography>{props.exercise.equipment}</Typography>
                <Typography>{props.exercise.type}</Typography>
                <Typography>{props.exercise.muscle}</Typography>
                <Typography>{props.exercise.instructions}</Typography>
            </Collapse>
        </Card>
    );
}