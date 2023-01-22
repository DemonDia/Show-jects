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

function ProjectListPage() {
    const [loading, setLoading] = useState(false);
    const [allProjects, setAllProjects] = useState();
    const id = useSelector((state) => state.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadPage = async () => {
        setLoading(true);
        await getAllProjects();
        setLoading(false)
        // await defaultAuthCheck(navigate)
        //     .then(async (res) => {
        //         const { name, id } = getCurrentUser(res);
        //         dispatch(userActions.login({ name, id }));
        //         await getAllProjects();
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         dispatch(userActions.logout());
        //         setLoading(false);
        //     });
        // await getAllProjects().then(() => {
        //     setLoading(false);
        // });
    };

    const getAllProjects = async () => {
        axios
            .get(`${process.env.REACT_APP_API_LINK}/projects/`)
            .then((result) => {
                setAllProjects(result.data.data);
            })
            .catch((err) => {});
    };

    // likes
    const handleLike = async (projectId, userId) => {
        const currentToken = localStorage.getItem("userToken");
        axios
            .put(
                `${process.env.REACT_APP_API_LINK}/projects/like/${projectId}`,
                {
                    userId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then(async (result) => {
                await getAllProjects();
            })
            .catch((err) => {});
    };

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div>
            <h1>Project List Page</h1>
            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    <ProjectListContainer
                        projects={allProjects}
                        isOwner={false}
                        userId={id}
                        handleLike={handleLike}
                    />
                </>
            )}
        </div>
    );
}

export default ProjectListPage;
