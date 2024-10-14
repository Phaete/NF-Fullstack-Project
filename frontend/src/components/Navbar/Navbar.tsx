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
                <StyledText>Hello {props.username}</StyledText>
                {(!props.username || props.username === "anonymousUser") ? <StyledButton onClick={props.login}>Login</StyledButton> : <StyledButton onClick={props.logout}>Logout</StyledButton>}
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

const StyledButton = styled.button`
    background-color: transparent;
    color: white;
    border: 0.5px solid white;
    padding: 6px 15px;
    border-radius: 15px;
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    cursor: pointer;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
        background-color: #115293;
    }

    &:active {
        box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
        0px 8px 10px 1px rgba(0, 0, 0, 0.14),
        0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    &:disabled {
        background-color: #e0e0e0;
        color: #9e9e9e;
        cursor: not-allowed;
    }
`;

const StyledText = styled.p`
    color: #838383;
    font-size: 19px;
    margin-top: 7px;
`;