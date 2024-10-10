import bodybuilder from "../../assets/Bodybuilder Kopie.png";
import "./LandingPage.css";

export default function LandingPage() {
    return (
        <div className={"centered"}>
            <h1 className={"title"}>Welcome to FitnessApp</h1>
            <img className={"bodybuilderImage"} src={bodybuilder} alt={"Bodybuilder"}/>
        </div>
    )
}