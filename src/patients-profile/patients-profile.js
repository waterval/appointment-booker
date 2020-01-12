import React from "react";
import axios from "../app/axios";

export default class PatientsProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editButton: true
        };
        this.userInput = this.userInput.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }
    userInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const { data } = await axios.get("/api/patients-profile/" + id);
            this.setState(data.patientData);
        } catch (error) {
            console.log(
                "error on patients-profile inside componentDidMount in axios get /api/patients-profile/id: ",
                error
            );
        }
    }
    async saveProfile(event) {
        const { id } = this.props.match.params;
        event.preventDefault();
        this.props.updatePatientHistory(this.state.patientHistory);
        this.props.updatePatientRecommendations(
            this.state.patientRecommendations
        );
        this.setState({ saveButton: false });
        this.setState({ editButton: true });
        try {
            const { data } = await axios.post(
                "/api/patients-profile/edit/" + id,
                {
                    patientHistory: this.state.patientHistory,
                    patientRecommendations: this.state.patientRecommendations
                }
            );
            this.setState(data.otherData);
        } catch (error) {
            console.log(
                "error on patients-profile inside saveProfile in axios get /api/patients-profile/edit/id: ",
                error
            );
        }
    }
    async editProfile(event) {
        event.preventDefault();
        this.setState({ saveButton: true });
        this.setState({ editButton: false });
    }
    render() {
        return (
            <div>
                <div>
                    <h1>
                        Patient profile of {this.state.forename}{" "}
                        {this.state.surname}
                    </h1>
                </div>
                <p>
                    On this page you can view information a patient has provided
                    themselves. Also, it is possible to add their medical
                    history and your recommendations.
                </p>
                <div>
                    <img
                        className="profile-image"
                        src={this.state.image || "/patient-icon.jpg"}
                    />
                </div>
                <h2>Medical history:</h2>
                {this.state.saveButton && (
                    <textarea
                        name="patientHistory"
                        onChange={this.userInput}
                        value={this.state.patientHistory}
                    />
                )}
                {this.state.editButton && <p>{this.state.patientHistory}</p>}

                <h2>Medical recommendations:</h2>
                {this.state.saveButton && (
                    <textarea
                        name="patientRecommendations"
                        onChange={this.userInput}
                        value={this.state.patientRecommendations}
                    />
                )}
                {this.state.editButton && (
                    <p>{this.state.patientRecommendations}</p>
                )}

                {this.state.saveButton && (
                    <div>
                        <button onClick={this.saveProfile}>Save</button>
                    </div>
                )}
                {this.state.editButton && (
                    <div>
                        <button onClick={this.editProfile}>Edit</button>
                    </div>
                )}
                <div>
                    <h2>Krankenkasse:</h2>
                    <p>{this.state.krankenkasseName}</p>
                </div>
                <div>
                    <h2>Surgery:</h2>
                    <p>{this.state.patientSurgery}</p>
                </div>
                <div>
                    <h2>Hospital:</h2>
                    <p>{this.state.patientHospital}</p>
                </div>
                <div>
                    <h2>Medication:</h2>
                    <p>{this.state.patientMedication}</p>
                </div>
                <div>
                    <h2>Diseases:</h2>
                    <p>{this.state.patientDiseases}</p>
                </div>
                <div>
                    <h2>Important:</h2>
                    <p>{this.state.patientImportant}</p>
                </div>
            </div>
        );
    }
}
