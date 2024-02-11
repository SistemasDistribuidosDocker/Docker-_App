import {  Tabs } from "@mui/material";
import { Link } from "react-router-dom";

function Menu() {

    return (
        <div className={"Menu"}>
            <div className={"Logo"}>
                <img src={"logo512.png"} alt={""} />
                <div className={"Title"}>
                    Distributed Services
                </div>
            </div>
            <Tabs>
                <Link to={'/register'}>Register</Link>
            </Tabs>
        </div>
    );
}

export default Menu;
