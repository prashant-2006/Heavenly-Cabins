import React from "react";
import UpdateUserDataForm from "../features/Authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/Authentication/UpdatePasswordForm";

function Account(){
    return (
        <>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 mx-6">
            Update Your Account
        </h2>
        <UpdateUserDataForm />
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 mx-6 mt-10">
            Update Password
        </h2>
        <UpdatePasswordForm />
        </>
    )
}

export default Account;