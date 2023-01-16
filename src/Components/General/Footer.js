import React from "react";
import { Card } from "@mui/material";
function Footer(props) {
    return (
        <Card
            variant={"outlined"}
            sx={{
                background: "white",
                height: "100px",
                padding: "10px",
                position: "fixed",
                width: "100%",
                bottom: 0,
            }}
        ></Card>
    );
}

export default Footer;
