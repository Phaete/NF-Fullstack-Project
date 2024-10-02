import {Link} from "react-router-dom";
import styled from "styled-components";

export default function HomePage(){
    return (
        <StyledContainer>
        <StyledHeadline>Willkommen zu deiner Fitness-App</StyledHeadline>
            <StyledLink to={"/mainpage"}>Übungen</StyledLink>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    margin-top: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledLink = styled(Link)`
text-decoration: none;
    color: black;
    font-size: 1.5rem;
`

const StyledHeadline = styled.h1`
font-size: 2.5rem;
    color: blue;
`