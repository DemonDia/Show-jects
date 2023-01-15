import React from "react";
import Banner from "../../Components/General/Banner";
import { Grid } from "@mui/material";
function Landingpage(props) {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <Banner />
                </Grid>
                <Grid item md={4}>
                </Grid>
            </Grid>
        </div>
    );
}

export default Landingpage;
