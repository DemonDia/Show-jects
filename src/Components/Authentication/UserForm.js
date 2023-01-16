import React, { useState } from "react";
import { Button, Card, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { validEmail } from "../../HelperFunctions/validEmail";

function UserForm({ mode, submitFunction }) {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async () => {
        if (!validEmail(email)) {
            setErrors([...errors, "Invalid email"]);
        }
        if (mode == "register" && !name) {
            setErrors([...errors, "Name cannot be empty"]);
        }
        if (
            password.length < 8 ||
            (password != confirmPassword && mode == "register")
        ) {
            setErrors([...errors, "Invalid password"]);
        }
        if (errors.length == 0) {
            var userData = {};
            if (mode == "register") {
                userData = {
                    name,
                    email,
                    password,
                };
            } else {
                userData = {
                    email,
                    password,
                };
            }
            await submitFunction(userData);
        } else {
            var errorMessage = "";
            if (mode == "register") {
                errorMessage = "Registration";
            } else {
                errorMessage = "Login";
            }
            errorMessage += " failed.";
            alert(errorMessage);
        }
    };
    return (
        <Card
            sx={{
                width: {
                    xs: "90vw",
                    sm: "60vw",
                },
                margin: "10px auto",
                padding: "20px;",
            }}
        >
            <Typography variant="h5">
                {mode == "register" ? <>Registration</> : <>Login</>}
            </Typography>
            {mode == "register" ? (
                <>
                    <TextField
                        label="Name*"
                        variant="outlined"
                        sx={{
                            width: {
                                xs: "80%",
                                sm: "60%",
                            },
                            margin: "10px",
                        }}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </>
            ) : (
                <></>
            )}
            <TextField
                label="Email*"
                variant="outlined"
                sx={{
                    width: {
                        xs: "80%",
                        sm: "60%",
                    },
                    margin: "10px",
                }}
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />

            <TextField
                label="Password*"
                variant="outlined"
                type="password"
                sx={{
                    width: {
                        xs: "80%",
                        sm: "60%",
                    },
                    margin: "10px",
                }}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />

            {mode == "register" ? (
                <>
                    {" "}
                    <TextField
                        label="Enter password again*"
                        variant="outlined"
                        type="password"
                        sx={{
                            width: {
                                xs: "80%",
                                sm: "60%",
                            },
                            margin: "10px",
                        }}
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </>
            ) : (
                <></>
            )}
            <Button
                variant="contained"
                sx={{
                    background: "#41B883",
                    width: {
                        xs: "80%",
                        sm: "60%",
                    },
                    margin: "10px",
                    padding: "10px",
                }}
                onClick={() => {
                    handleSubmit();
                }}
            >
                {mode == "register" ? <>Register</> : <>Login</>}
            </Button>
            <Typography
                variant="subtitle1"
                textAlign={"left"}
                sx={{
                    width: {
                        xs: "80% *90vw",
                        sm: "60%",
                    },
                    margin: "10px auto",
                    padding: "10px",
                }}
            >
                {mode == "register" ? (
                    <>
                        Already have an account? Click{" "}
                        <Link to="/login">here</Link>
                    </>
                ) : (
                    <>
                        Dont' have an account? Click{" "}
                        <Link to="/register">here</Link>
                    </>
                )}
                <br></br>
                Looking for projects? Click <Link to="/projects">here</Link>
            </Typography>
            {/* <>Looking for projects? Click <Link to = "/projects">here</Link></> */}
        </Card>
    );
}

export default UserForm;
