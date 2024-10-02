import axios from "axios";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Exercise} from "../App.tsx";

type MainPageProps = {
    exercises: Exercise[];
    fetchData: () => void;
    setUpdateExercise: (exercise: Exercise) => void;
    addExercise: Exercise;
    setAddExercise: (exercise: Exercise) => void;
    updateExercise: Exercise;
}

export default function MainPage({
                                     exercises,
                                     fetchData,
                                     setUpdateExercise,
                                     addExercise,
                                     setAddExercise,
                                     updateExercise
                                 }: MainPageProps) {

    function handleAddSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        axios.post("api/fitness", addExercise)
            .then(() => fetchData())
        setAddExercise({
            id: "",
            name: "",
            type: "",
            muscle: "",
            instructions: "",
            equipment: "",
            difficulty: ""
        })
    }

    function handleUpdateSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        axios.put("api/fitness/" + updateExercise.id, updateExercise)
            .then(() => fetchData())
        setUpdateExercise({
            id: "",
            name: "",
            type: "",
            muscle: "",
            instructions: "",
            equipment: "",
            difficulty: ""
        })
    }


    return (
        <StyledContainer>
            <div>
                <StyledDiv>
                {exercises.map(exercise => <StyledContainer2 key={exercise.id}>
                    <StyledLink to={"/" + exercise.id}>{exercise.name}</StyledLink>
                    <ButtonContainer>
                    <button type={"button"} onClick={() => axios.delete("api/fitness/" + exercise.id)
                        .then(() => fetchData())
                        .catch(err => console.error(err))}>Delete
                    </button>
                    <button type={"button"} onClick={() => setUpdateExercise(exercise)}>Update</button>
                    </ButtonContainer>
                    </StyledContainer2>)}

                </StyledDiv>
                <form onSubmit={handleAddSubmit}>
                    <input type="text" placeholder={"name"} value={addExercise.name}
                           onChange={(event) => setAddExercise({
                               ...addExercise,
                               name: event.target.value
                           })}/>
                    <input type="text" placeholder={"type"} value={addExercise.type}
                           onChange={(event) => setAddExercise({
                               ...addExercise,
                               type: event.target.value
                           })}/>
                    <button>Add</button>
                </form>

                <form onSubmit={handleUpdateSubmit}>
                    <input type="text" placeholder={"name"} value={updateExercise.name}
                           onChange={(event) => setUpdateExercise({
                               ...updateExercise,
                               name: event.target.value
                           })}/>
                    <input type="text" placeholder={"type"} value={updateExercise.type}
                           onChange={(event) => setUpdateExercise({
                               ...updateExercise,
                               type: event.target.value
                           })}/>
                    <button>Update</button>
                </form>
            </div>
            <Link to={"/"}>Zurück</Link>
        </StyledContainer>
    )
}

const StyledLink = styled(Link)`
    text-decoration: none;
    gap: 20px;
    color: #3498db;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 10px;
    border-radius: 5px;
    background-color: #f0f0f0;
    transition: background-color 0.3s ease;
    padding: 10px;
    
    &:hover {
        background-color: #909090;
    }
    
    
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 100vh;
    padding: 20px;
    background-color: #f7f9fc;
`

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    margin-bottom: 50px;
`

const ButtonContainer = styled.div`
margin: 20px 0px 20px 0px;
`

const StyledContainer2 = styled.div`
    display: flex;
    flex-direction: row;
`