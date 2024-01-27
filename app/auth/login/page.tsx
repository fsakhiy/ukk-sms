"use client"
import React, { useState } from "react";

import toast, {Toaster} from "react-hot-toast";

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const adminEmail = process.env.ADMIN_EMAIL

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleFormSubmission = () => {
        toast(`username: ${username}, password: ${password}`)
    }

    return (
        <div className="max-w-sm mx-auto mt-8 p-3" >
            <Toaster />
            <div className={'text-center font-bold text-3xl pb-5'}>
                Login
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleFormSubmission}
                >
                    Log In
                </button>
            </div>
            <div>
                forgot your password? <a href={`mailto:${adminEmail}`} className={`font-bold underline text-blue-700`}>contact the admin</a>
            </div>
        </div>

    )
}