import React, { useEffect, useState } from "react";
import {
    defaultAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";

import ProjectForm from "../../Components/Projects/ProjectForm";

function CreateProjectPage(props) {
    const [loading, setLoading] = useState(false);
    const id = useSelector((state) => state.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadPage = async () => {
        setLoading(true);
        await defaultAuthCheck(navigate)
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

    const createProject = async () => [];

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div>
            <ProjectForm submitFunction={createProject} title={"Create Project"} />
        </div>
    );
}

export default CreateProjectPage;
