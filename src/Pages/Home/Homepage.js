import React, { useEffect, useState } from "react";
import {
    defaultAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userActions } from "../../Store";

function Homepage(props) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadPage = async () => {
        setLoading(true);
        await defaultAuthCheck(navigate)
            .then((res) => {
                const name = getCurrentUser(res);
                console.log(name)
                dispatch(userActions.login(name))
                setLoading(false);
            })
            .catch(() => {
                dispatch(userActions.logout())
                setLoading(false);
            });
    };

    useEffect(() => {
        loadPage();
    },[]);
    return (
        <div>
            <h1>Homepage</h1>
        </div>
    );
}

export default Homepage;
