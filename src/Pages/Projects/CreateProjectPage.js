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
                console.log("id", id);
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
        await axios
            .post(
                process.env.REACT_APP_API_LINK + "/projects/",

                project,
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then(() => {
                alert("Project added");
                // navigate("/projects")
            })
            .catch((err) => {
                alert("Failed to add");
            });
    };

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div>
            {loading ? (
                <></>
            ) : (
                <ProjectForm
                    submitFunction={createProject}
                    title={"Create Project"}
                    userId={id}
                />
            )}
        </div>
    );
}

export default CreateProjectPage;
