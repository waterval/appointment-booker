import React, { useState, useEffect } from "react";
import axios from "../app/axios";

export default function EditInformation() {
    const [values, setValues] = useState();
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get("/api/app");
            setValues(data);
        }
        fetchData();
    }, []);
    const editProfile = event => {
        event.preventDefault();
        setIsEditing(true);
    };
    const handleInputChange = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };
    const saveProfile = event => {
        event.preventDefault();
        axios.post("/api/user-profile-edit", {
            krankenkasseName: values.krankenkasseName,
            patientSurgery: values.patientSurgery,
            patientHospital: values.patientHospital,
            patientMedication: values.patientMedication,
            patientDisease: values.patientDisease,
            patientImportant: values.patientImportant
        });
        setIsEditing(false);
    };

    if (!values) {
        return <p>Page loading...</p>;
    }
    return (
        <div>
            {!isEditing && (
                <div>
                    <h2>Krankenkasse:</h2>
                    <p>{values.krankenkasseName}</p>
                    <h2>Did you ever have surgery?</h2>
                    <p>{values.patientSurgery}</p>
                    <h2>
                        Have you ever been admitted to a hospital for an
                        extended period of time?
                    </h2>
                    <p>{values.patientHospital}</p>
                    <h2>Are you taking any medication?</h2>
                    <p>{values.patientMedication}</p>
                    <h2>
                        Are you diabetic or suffering from heart, lung or kidney
                        disease?
                    </h2>
                    <p>{values.patientDisease}</p>
                    <h2>
                        Is there anything else that is important for us to know?
                    </h2>
                    <p>{values.patientImportant}</p>
                    <button onClick={editProfile}>Edit profile</button>
                </div>
            )}
            {isEditing && (
                <div>
                    <h2>Krankenkasse:</h2>
                    <textarea
                        name="krankenkasseName"
                        onChange={handleInputChange}
                        value={values.krankenkasseName || ""}
                    />
                    <h2>Did you ever have surgery?</h2>
                    <textarea
                        name="patientSurgery"
                        onChange={handleInputChange}
                        value={values.patientSurgery || ""}
                    />
                    <h2>
                        Have you ever been admitted to a hospital for an
                        extended period of time?
                    </h2>
                    <textarea
                        name="patientHospital"
                        onChange={handleInputChange}
                        value={values.patientHospital || ""}
                    />
                    <h2>Are you taking any medication?</h2>
                    <textarea
                        name="patientMedication"
                        onChange={handleInputChange}
                        value={values.patientMedication || ""}
                    />
                    <h2>
                        Are you diabetic or suffering from heart, lung or kidney
                        disease?
                    </h2>
                    <textarea
                        name="patientDisease"
                        onChange={handleInputChange}
                        value={values.patientDisease || ""}
                    />
                    <h2>
                        Is there anything else that is important for us to know?
                    </h2>
                    <textarea
                        name="patientImportant"
                        onChange={handleInputChange}
                        value={values.patientImportant || ""}
                    />
                    <div>
                        <button onClick={saveProfile}>Save profile</button>
                    </div>
                </div>
            )}
            <div>
                {(values.patientHistory ||
                    this.state.patientRecommendations) && (
                    <h2>Doctors notes</h2>
                )}
                {values.patientHistory && (
                    <div>
                        <h2>Medical history:</h2>
                        <p>{values.patientHistory}</p>
                    </div>
                )}
                {values.patientRecommendations && (
                    <div>
                        <h2>Recommendations:</h2>
                        <p>{values.patientRecommendations}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
