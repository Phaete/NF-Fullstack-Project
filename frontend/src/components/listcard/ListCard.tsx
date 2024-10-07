import {Exercise} from "../../App.tsx";
import {Box, Button, Card, Collapse, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import styled from "styled-components";

type ListCardProps = {
    exercise: Exercise
    fetchData:() => void
    dialogUpdate: (e:Exercise) => void
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
                <Typography variant="h5"><strong>{props.exercise.name}</strong></Typography>
                <Button
                    aria-expanded={expanded}
                    aria-label="show more"
                    onClick={toggleExpanded}
                    variant="contained"
                    sx={{
                        backgroundColor: '#3498db',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#2980b9',
                        },
                    }}

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
                            sx={{
                                backgroundColor: '#3498db',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#2980b9',
                                },
                            }}
                            onClick={
                        () => axios.delete("api/fitness/" + props.exercise.id)
                        .then(() => props.fetchData())
                        .catch(err => console.error(err))}
                    >
                        Delete
                    </Button>
                    <Button variant="contained"
                            sx={{
                                backgroundColor: '#3498db',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#2980b9',
                                },
                            }}

                            onClick={() =>
                            {props.dialogUpdate(props.exercise)}}>
                        Edit
                    </Button>
                </Box>
                <StyledSingleCard>
                <Typography sx={{marginBottom: '16px'}}><strong>Difficulty:</strong> {props.exercise.difficulty}
                </Typography>
                <Typography sx={{marginBottom: '16px'}}><strong>Equipment:</strong> {props.exercise.equipment}
                </Typography>
                <Typography sx={{marginBottom: '16px'}}><strong>Type:</strong> {props.exercise.type}</Typography>
                <Typography sx={{marginBottom: '16px'}}><strong>Muscle:</strong> {props.exercise.muscle}</Typography>
                <Typography sx={{marginBottom: '16px'}}><strong>Description:</strong><br/>{props.exercise.instructions}
                </Typography>
                </StyledSingleCard>
            </Collapse>
        </Card>
    );
}

const StyledSingleCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    padding: 5px 50px 15px 50px;
`;