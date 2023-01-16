import axios from "axios";
const checkAuthStatus = async (successRoute, failRoute, navigate) => {
    const currentToken = localStorage.getItem("userToken");
    const loggedUser = await axios
        .get(process.env.REACT_APP_API_LINK + "/users/current", {
            headers: { Authorization: `Bearer ${currentToken}` },
        })
        .catch((err) => {
            if (failRoute !== "") {
                navigate(failRoute);
            }
        });
    if (successRoute !== "" && loggedUser.status == 200) {
        navigate(successRoute);
    } else if (failRoute !== "" && !loggedUser.status == 200) {
        navigate(failRoute);
    }
    return loggedUser;
};

const loginPageAuthCheck = async (navigate) => {
    return await checkAuthStatus("/home", "", navigate);
};

const defaultAuthCheck = async (navigate) => {
    return await checkAuthStatus("", "/login", navigate);
};

const redirectAuthCheck = async (navigate) => {
    return await checkAuthStatus("/home", "/login", navigate);
};

const getCurrentUser = (result) => {
    if (result.status == 200) {
        const { name } = result.data;
        return name;
    }
    return null;
};

export { loginPageAuthCheck, defaultAuthCheck, redirectAuthCheck ,getCurrentUser};
