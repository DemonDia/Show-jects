import React, { useState, useEffect } from "react";
import UserForm from "../../Components/Authentication/UserForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    loginPageAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";

import { useDispatch } from "react-redux";
import { userActions } from "../../Store";
function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (loginUser) => {
        await axios
            .post(process.env.REACT_APP_API_LINK + "/users/login", loginUser)
            .then((res) => {
                const { message, token } = res.data;
                alert(message);
                localStorage.setItem("userToken", token);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const loadPage = async () => {
        setLoading(true);
        await loginPageAuthCheck(navigate)
            .then((res) => {
                const { name, id } = getCurrentUser(res);
                dispatch(userActions.login({ name, id }));
                setLoading(false);
            })
            .catch(() => {
                dispatch(userActions.logout());
                setLoading(false);
            });
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <UserForm mode="login" submitFunction={login} />
        </div>
    );
}

export default LoginPage;
