"use client"
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import createDummyData from "@/app/test-data-audit/action";

export default function AuditTestPage () {
    const [firstData, setFirstData] = useState("")
    const [secondData, setSecondData] = useState("")

    const handleFirstDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstData(e.target.value)
    }

    const handleSecondDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondData(e.target.value)
    }

    const handleFormSubmission = async () => {
        const loadingProgress = toast.loading(`submitting data`)
        const status = await createDummyData({first: firstData, second: secondData})

        if(!status) {
            toast.error("cannot create data", {id: loadingProgress})
            return
        }

        toast.success("data created successfully", {id: loadingProgress})
    }

    return (
        <div>
            <Toaster />
            this is gonna be an audit test with rendered as client side and utilizing server action on action.ts
            br
            <div>
                <input type="text" name="first" id="first" placeholder={'first data'} value={firstData} onChange={handleFirstDataChange}/>
                <br/>
                <input type="text" name="second" id="second" placeholder={'second data'} value={secondData} onChange={handleSecondDataChange} />
                <button onClick={handleFormSubmission}>submit</button>
            </div>
        </div>
    )
}