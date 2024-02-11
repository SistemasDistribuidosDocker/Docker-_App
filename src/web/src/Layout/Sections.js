import TopTeams from "../Menus/TopTeams";
import { Register } from "../Menus/register";



const Sections = [

    {
        id: "top-teams",
        label: "Top Teams",
        to: "/",
        content: <TopTeams/>
    },
    // register
    {
        id: "register",
        label: "Register",
        to: "/register",
        content: <Register/>
    },
    // login
    {
        id: "register",
        label: "Register",
        to: "/register",
        content: <Register/>
    },
];

export default Sections;