import { Link } from "react-router-dom";
import styled from "styled-components";

export default function HomePage() {
    return (
        <StyledContainer>
            <StyledHeadline>Willkommen zu deiner Fitness-App</StyledHeadline>
            <StyledLink to={"/mainpage"}>Übungen</StyledLink>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
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
