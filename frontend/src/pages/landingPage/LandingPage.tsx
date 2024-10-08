import "./LandingPage.css/"
import {Link} from "react-router-dom";
import styled from "styled-components";

export default function LandingPage() {
    return (
        <StyledContainer>
            <StyledHeadline>
                This is a beautiful headline for the Fitness Tracker App
            </StyledHeadline>
            <div className={"centered direction-col-row-row flex-2"}>
                <div className={"centered direction-col"}>
                    <StyledLink to={"/exercises"}>
                        <button className={"m-10"} type={"button"}>
                            <img className={"scaled-img"} src={"src/assets/arm-muscle.png"} alt={"Exercise Browser"}/>
                        </button>
                    </StyledLink>
                    <p>
                        Exercise Browser
                    </p>
                </div>
                <div className={"centered direction-col"}>
                    <StyledLink to={"/workouts"}>
                        <button className={"m-10"}>
                            <img className={"scaled-img"} src={"src/assets/workout.png"} alt={"Workout Manager"}/>
                        </button>
                    </StyledLink>

                    <p>
                        Workout Manager
                    </p>
                </div>
            </div>
        </StyledContainer>
    )
}


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background-color: #f7f9fc;
    padding: 20px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #3498db;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #f0f0f0;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e0e0e0;
    }
`

const StyledHeadline = styled.h1`
    font-size: 3rem;
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: center;
`
