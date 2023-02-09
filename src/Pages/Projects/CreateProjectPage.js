import React, { useEffect, useState } from "react";
import {
    defaultAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";
import axios from "axios";
import ProjectForm from "../../Components/Projects/ProjectForm";
import Loader from "../../Components/General/Loader";

function CreateProjectPage() {
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
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

    const createProject = async (project) => {
        const currentToken = localStorage.getItem("userToken");
        setIsAdding(true);
        await axios
            .post(
                process.env.REACT_APP_API_LINK + "/projects/",

                project,
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then(() => {
                setIsAdding(false);
                alert("Project added");
                navigate("/user/projects");
            })
            .catch((err) => {
                setIsAdding(false);
                alert("Failed to add");
            });
    };

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <ProjectForm
                    submitFunction={createProject}
                    title={"Create Project"}
                    userId={id}
                    isExecuting={isAdding}
                    message={"Creating project ..."}
                />
            )}
        </div>
    );
}

export default CreateProjectPage;
