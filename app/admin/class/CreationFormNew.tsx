"use client"

import { useState } from "react"

import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {Toaster} from "@/components/ui/toaster";


export interface ScheduleData {
    id: number,
    name: string
}

export interface SubjectData {
    id: number,
    name: string
}

interface SchedulesData {
    scheduleData: ScheduleData[]
    subjectData: SubjectData[]
}

interface  SubmissionState {
    id: string;
    selectedValue: string;
}


export default function NewClassCreationForm({scheduleData, subjectData}: SchedulesData) {

    const testState = ['first', 'second', 'third', 'fourth']
    const optionList = ['option 1', 'option 2', 'option 3']

    const submissionState: SubmissionState[] = []
    testState.map((id) => {
        submissionState.push({
            id: id,
            selectedValue: "",
        })
    })

    const printToConsole = () => {

        if(submissionState.some(data => data.selectedValue === '')) {
            toast({description: 'data cannot be empty', variant: 'destructive'})
            return
        }

        console.log(submissionState)
        // console.log(scheduleData)
        toast({description: "data created"})
    }

    const onChangeFunction = (id:string, value: string) => {
        // @ts-ignore
        submissionState.find((data) => data.id === id).selectedValue = value
    }


    return (
        <Dialog>
            <Toaster />

            <DialogTrigger asChild>
                <Button variant={'outline'}>
                    Buat Data Kelas Baru
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Buat Kelas Baru</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>

                <div className={'flex flex-col gap-5'}>
                    <div className={'grid grid-cols-3 gap-3'}>
                        {testState.map((element) => (
                            <div key={element}>
                                <h2>{element}</h2>
                                <Select onValueChange={(value) => {
                                    onChangeFunction(element, value)
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        ))}
                        </div>
                    </div>

                    <Button onClick={printToConsole}>submit</Button>

            </DialogContent>
        </Dialog>
        )
}