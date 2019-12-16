import React from "react";
import ProfileImage from "./user-profile-display-image";
import EditInformation from "./user-profile-edit";

export default function UserProfile({
    forename,
    surname,
    image,
    showUploadOption,
    displaySize
}) {
    return (
        <div>
            <div>
                <h1>
                    Profile of {forename} {surname}
                </h1>
            </div>
            <p>
                Please add a picture of yourself. This makes it possible for our
                staff to welcome you in our office.
            </p>
            <div>
                <ProfileImage
                    displaySize={displaySize}
                    forename={forename}
                    surname={surname}
                    image={image}
                    showUploadOption={showUploadOption}
                />

                <p>
                    We would like to provide the best care possible. For this
                    reason we will ask a few questions before your first
                    appointment. You can answer them during your first visit in
                    our office or you can save time by editing your profile
                    below:
                </p>
            </div>
            <div>
                <EditInformation />
            </div>
        </div>
    );
}
