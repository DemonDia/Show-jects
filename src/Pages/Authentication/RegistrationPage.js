import React, { useState } from "react";
import UserForm from "../../Components/Authentication/UserForm";
import axios from "axios";

function RegistrationPage() {
    const register = async (newUser) => {
        await axios
            .post(process.env.REACT_APP_API_LINK + "/users/", newUser)
            .then((res) => {
                const { message } = res.data;
                alert(message);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <UserForm mode="register" submitFunction={register} />
        </div>
    );
}

export default RegistrationPage;
