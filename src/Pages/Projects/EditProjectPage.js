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
import { useParams } from "react-router-dom";

function EditProjectPage() {
    const [loading, setLoading] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const id = useSelector((state) => state.id);
    const { projectId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadPage = async () => {
        setLoading(true);
        await defaultAuthCheck(navigate)
            .then((res) => {
                const { name, id } = getCurrentUser(res);
                dispatch(userActions.login({ name, id }));
                getCurrentProject(projectId);
                setLoading(false);
            })
            .catch(() => {
                dispatch(userActions.logout());
                setLoading(false);
            });
    };

    const updateProject = async (project) => {
        const currentToken = localStorage.getItem("userToken");
        await axios
            .put(
                `${process.env.REACT_APP_API_LINK}/projects/${projectId}`,
                project,
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then(() => {
                alert("Project updated");
                navigate("/user/projects/");
            })
            .catch((err) => {
                alert("Failed to update");
            });
    };

    const getCurrentProject = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_LINK}/projects/${projectId}`)
            .then((res) => {
                setCurrentProject(res.data.data);
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
                <>
                    {" "}
                    {currentProject ? (
                        <>
                            {" "}
                            <ProjectForm
                                submitFunction={updateProject}
                                title={"Edit Project"}
                                userId={id}
                                projectObject={currentProject}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    );
}

export default EditProjectPage;
