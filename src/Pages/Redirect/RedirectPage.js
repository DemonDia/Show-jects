import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redirectAuthCheck } from "../../HelperFunctions/authCheck";
import Loader from "../../Components/General/Loader";

function RedirectPage() {
    const navigate = useNavigate();
    useEffect(() => {
        redirectAuthCheck(navigate);
    }, []);

    return (
        <div>
            <Loader message={"Redirecting ..."} />
        </div>
    );
}

export default RedirectPage;
