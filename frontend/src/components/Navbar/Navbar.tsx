import styled from "styled-components";
import {Link} from "react-router-dom";

type NavbarProps = {
    login: () => void
}

export default function Navbar(props: Readonly<NavbarProps>){


    return (
        <StyledNavbar>
            <StyledLogo>FitnessApp</StyledLogo>
            <StyledNavItems>
                <StyledNavItem to={"/"}>Home</StyledNavItem>
                <StyledNavItem to={"/exercises"}>Exercises</StyledNavItem>
                <StyledNavItem to={"/workout"}>Workouts</StyledNavItem>
                <button onClick={props.login}>Login</button>
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
    font-size: 1.2rem;
    font-weight: 500;
    padding: 8px 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #34495e;
        border-radius: 5px;
    }
`;