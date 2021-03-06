import React from "react";
import axios from "./axios";
import { Route, BrowserRouter, NavLink } from "react-router-dom";
import Appointments from "../appointments/appointments";
import UserProfile from "../user-profile/user-profile";
import UploadImage from "../user-profile/user-profile-upload-image";
import FindPatients from "../patients/patients";
import PatientsProfile from "../patients-profile/patients-profile";
import Schedule from "../schedule/schedule";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
    }
    async componentDidMount() {
        const { data } = await axios.get("/api/app");
        this.setState(data);
    }
    render() {
        if (!this.state.id) {
            return <div>Page is loading...</div>;
        }
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <div className="header-logo-title-container">
                            <img
                                src="/doctor-logo.png"
                                className="header-logo"
                            />
                            <p className="header-title">
                                Medical Appointments Platform
                            </p>
                        </div>
                        <div>
                            <nav className="header-link-container">
                                <NavLink
                                    exact
                                    to="/"
                                    className="header-link"
                                    activeClassName="active"
                                >
                                    Appointments
                                </NavLink>
                                <NavLink
                                    to="/user-profile"
                                    className="header-link"
                                    activeClassName="active"
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/patients"
                                    className="header-link"
                                    activeClassName="active"
                                >
                                    Patients
                                </NavLink>
                                <NavLink
                                    to="/schedule"
                                    className="header-link"
                                    activeClassName="active"
                                >
                                    Schedule
                                </NavLink>
                            </nav>
                        </div>
                    </header>
                    <section>
                        <Route
                            exact
                            path="/"
                            render={() => <Appointments id={this.state.id} />}
                        />
                        <Route
                            exact
                            path="/user-profile"
                            render={() => (
                                <UserProfile
                                    displaySize={"200px"}
                                    forename={this.state.forename}
                                    surname={this.state.surname}
                                    image={
                                        this.state.image || "/patient-icon.jpg"
                                    }
                                    showUploadOption={() =>
                                        this.setState({ uploaderVisible: true })
                                    }
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/patients"
                            component={FindPatients}
                        />
                        <Route
                            path="/patients/:id"
                            render={props => (
                                <PatientsProfile
                                    key={props.match.url}
                                    match={props.match}
                                    historia={props.historia}
                                    patientRecommendations={
                                        this.state.patientRecommendations
                                    }
                                    patientHistory={this.state.patientHistory}
                                    updatePatientRecommendations={patientRecommendations =>
                                        this.setState({
                                            patientRecommendations
                                        })
                                    }
                                    updatePatientHistory={patientHistory =>
                                        this.setState({ patientHistory })
                                    }
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/schedule"
                            render={() => <Schedule id={this.state.id} />}
                        />
                    </section>
                    {this.state.uploaderVisible && (
                        <UploadImage
                            updateImage={image => this.setState({ image })}
                            hideUploadOption={() =>
                                this.setState({ uploaderVisible: false })
                            }
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
