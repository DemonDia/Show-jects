import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../HelperFunctions/authCheck";
import Loader from "../../Components/General/Loader";
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
                navigate("/");
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);

    return (
        <>
            <Loader message={"Logging out..."} />
        </>
    );
}

export default LogoutPage;
