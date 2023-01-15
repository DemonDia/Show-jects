import React from "react";
import { Card, Typography, Button } from "@mui/material";

function Banner(props) {
    return (
        <Card
            variant="outlined"
            sx={{
                padding: `15px`,
                margin: "10px",
            }}
        >
            <Typography
                variant="h2"
                textAlign={"left"}
                sx={{
                    color: "#41B883",
                    textDecoration: "underline",
                }}
            >
                Show-Ject
            </Typography>

            <Typography
                variant="h4"
                textAlign={"left"}
                sx={{
                    float: "left",
                }}
            >
                Have a brilliant idea but don’t know where to showcase them or
                get support? You can join us today!
            </Typography>
            <Button
                variant="contained"
                sx={{
                    float: "left",
                    left: 0,
                    background: "#41B883",
                    width: "50%",
                    margin: "10px",
                    padding: "10px",
                }}
            >
                Join us!
            </Button>

            <Typography
                variant="h4"
                textAlign={"left"}
                sx={{
                    float: "left",
                }}
            >
                View some awesome projects if you need inspirations and ideas!
            </Typography>
            <Button
                variant="contained"
                sx={{
                    float: "left",
                    left: 0,
                    background: "#41B883",
                    width: "50%",
                    margin: "10px",
                    padding: "10px",
                }}
            >
                View Projects
            </Button>
        </Card>
    );
}

export default Banner;
