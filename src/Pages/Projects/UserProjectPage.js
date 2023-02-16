import React, { useEffect, useState } from "react";
import {
    defaultAuthCheck,
    getCurrentUser,
} from "../../HelperFunctions/authCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";
import axios from "axios";
import ProjectListContainer from "../../Components/Projects/ProjectListContainer";
import Loader from "../../Components/General/Loader";

function UserProjectPage() {
    const currentToken = localStorage.getItem("userToken");
    const [loading, setLoading] = useState(false);
    const [userProjects, setUserProjects] = useState();
    const id = useSelector((state) => state.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadPage = async () => {
        setLoading(true);
        await defaultAuthCheck(navigate)
            .then(async (res) => {
                const { name, id } = getCurrentUser(res);
                dispatch(userActions.login({ name, id }));
                await getUserProjects(id);
                setLoading(false);
            })
            .catch(() => {
                dispatch(userActions.logout());
                setLoading(false);
            });
    };

    const getUserProjects = async (id) => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_API_LINK}/projects/user/${id}`, {})
            .then((result) => {
                setUserProjects(result.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const handleDelete = async (projectId) => {
        var confirmDelete = prompt(
            "Are you sure? This is irrecersible! Type 'yes' to confirm."
        );
        if (confirmDelete == "yes") {
            await axios
                .delete(
                    `${process.env.REACT_APP_API_LINK}/projects/${projectId}`,
                    {
                        headers: { Authorization: `Bearer ${currentToken}` },
                    }
                )
                .then(async () => {
                    await getUserProjects(id);
                    alert("Successfully deleted!");
                });
        }
    };

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <ProjectListContainer
                        projects={userProjects}
                        isOwner={true}
                        handleDelete={handleDelete}
                    />
                </>
            )}
        </div>
    );
}

export default UserProjectPage;
