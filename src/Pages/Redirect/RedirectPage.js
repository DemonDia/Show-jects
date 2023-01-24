import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redirectAuthCheck } from "../../HelperFunctions/authCheck";

function RedirectPage() {
    const navigate = useNavigate();
    useEffect(() => {
        redirectAuthCheck(navigate);
    }, []);

    return (
        <div>
            <h1>Redirect</h1>
        </div>
    );
}

export default RedirectPage;
