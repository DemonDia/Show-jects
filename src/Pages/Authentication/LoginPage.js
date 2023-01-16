import React, { useState } from "react";
import UserForm from "../../Components/Authentication/UserForm";
import axios from "axios";
function LoginPage() {
    const login = async (loginUser) => {
        await axios
            .post(process.env.REACT_APP_API_LINK + "/users/login", loginUser)
            .then((res) => {
                const { message, token } = res.data;
                alert(message);
                localStorage.setItem("userToken",token)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <UserForm mode="login" submitFunction={login} />
        </div>
    );
}

export default LoginPage;
