import styled from "styled-components";
import {Link} from "react-router-dom";

type NavbarProps = {
    login: () => void
    logout: () => void
    username: string
}

export default function Navbar(props: Readonly<NavbarProps>){


    return (
        <StyledNavbar>
            <StyledLogo>FitnessApp</StyledLogo>
            <StyledNavItems>
                <StyledNavItem to={"/dashboard"}>Home</StyledNavItem>
                <StyledNavItem to={"/exercises"}>Exercises</StyledNavItem>
                <StyledNavItem to={"/workouts"}>Workouts</StyledNavItem>
                <p style={{ color: "white", fontSize: "19px", marginTop: "7px" }}>Hello {props.username}</p>
                {(!props.username || props.username === "anonymousUser") ? <StyledButton onClick={props.login}>Login</StyledButton> : <button onClick={props.logout}>Logout</button>}
            </StyledNavItems>
        </StyledNavbar>
    )
}

const StyledNavbar = styled.nav`
    background-color: #2c3e50;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledLogo = styled.h1`
    font-size: 1.5rem;
    color: white;
    margin: 0;
    font-weight: bold;
`;

const StyledNavItems = styled.div`
    display: flex;
    gap: 20px;
`;

const StyledButton = styled.button`
    color: black;
    margin: 10px;
    transition: background-color 0.3s ease;
    `;

const StyledNavItem = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 4px 2px;
    transition: background-color 0.3s ease;

    @media (min-width: 650px) {
        font-size: 1.2rem;
        padding: 8px 16px;
    }

    &:hover {
        background-color: #34495e;
        border-radius: 5px;
    }
`;