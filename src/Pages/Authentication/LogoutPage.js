import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../HelperFunctions/authCheck";
import axios from "axios";

import { useDispatch } from "react-redux";
import { userActions } from "../../Store";

function LogoutPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((res) => {
            if (res.status == 200) {
                localStorage.removeItem("userToken");
                dispatch(userActions.logout());
                alert("Successfully logged out!");
                navigate("/landing");
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);

    return <div></div>;
}

export default LogoutPage;
