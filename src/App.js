// ====================================general imports====================================
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// ======================redux======================

// ====================================component imports====================================
// ======================general======================
import Navbar from "./Components/General/Navbar";
import { Toolbar } from "@mui/material";

import Footer from "./Components/General/Footer";

// ====================================page imports====================================
// ======================authenticaion======================
import RegistrationPage from "./Pages/Authentication/RegistrationPage";
import LoginPage from "./Pages/Authentication/LoginPage";

// ======================projects======================
import CreateProjectPage from "./Pages/Projects/CreateProjectPage";
import ProjectListPage from "./Pages/Projects/ProjectListPage";
import EditProjectPage from "./Pages/Projects/EditProjectPage";
import IndividualProjectPage from "./Pages/Projects/IndividualProjectPage";

// ======================users======================
import UserProfile from "./Pages/User/UserProfile";
import UserProjectPage from "./Pages/Projects/UserProjectPage";

// ======================redirect======================
import RedirectPage from "./Pages/Redirect/RedirectPage";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Toolbar/>
                <div className="pageContainer">
                    {/* ======================authenticaion====================== */}
                    <Routes>
                        <Route exact path="/login" element={<LoginPage />} />
                        <Route
                            exact
                            path="/register"
                            element={<RegistrationPage />}
                        />

                        {/* ======================projects====================== */}
                        <Route
                            exact
                            path="/projects"
                            element={<ProjectListPage />}
                        />
                        <Route
                            exact
                            path="/projects/create"
                            element={<CreateProjectPage />}
                        />
                        <Route
                            exact
                            path="/projects/edit/:projectId"
                            element={<EditProjectPage />}
                        />
                        <Route
                            exact
                            path="/projects/:projectId"
                            element={<IndividualProjectPage />}
                        />

                        {/* ======================users====================== */}
                        <Route
                            exact
                            path="/user/projects"
                            element={<UserProjectPage />}
                        />
                        <Route
                            exact
                            path="/user/profiole"
                            element={<UserProfile />}
                        />
                        {/* ======================redirect====================== */}
                        <Route exact path="/" element={<RedirectPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
