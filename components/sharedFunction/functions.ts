import {StudenDailyPresenceData} from "@/components/ui/student/presence";

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

function generateDatesInRange(startDate: Date, endDate: Date): Date[] {
    const datesArray: Date[] = [];

    // Calculate the difference in days between start and end dates
    const timeDifference = new Date(endDate).getTime() - new Date(startDate).getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Loop to generate dates in the range
    for (let i = 0; i <= daysDifference; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(new Date(startDate).getDate() + i);

        // if(newDate.getDay() != 0 || newDate.getDate() != 6) {
            // datesArray.push(newDate);
        // }
        if(newDate.getDay() === 0 || newDate.getDay() === 6) {
        } else {
            datesArray.push(newDate);
        }
    }

    return datesArray;
}

const parseScheduleDay = (day: string): string => {
    let parsedDay: string

    switch(day) {
        case "MONDAY":
            parsedDay = "Senin"
            break;

        case "TUESDAY":
            parsedDay = "Selasa"
            break;

        case "WEDNESDAY":
            parsedDay = "Rabu"
            break;

        case "THURSDAY":
            parsedDay = "Kamis"
            break;

        case "FRIDAY":
            parsedDay = "Jumat"
            break;

        default:
            parsedDay = "hari invalid"
            break;
    }

    return parsedDay
}

const parsePresenceStatus = (status: StudenDailyPresenceData["status"]): string => {
    let parsedPresenceStatus: string

    switch(status) {

        case "LATE":
            parsedPresenceStatus = "Terlambat"
            break;

        case "NOT_YET":
            parsedPresenceStatus = "Belum Absen"
            break;

        case "ON_TIME":
            parsedPresenceStatus = "Tepat Waktu"
            break;

        default:
            parsedPresenceStatus = "Tidak Ada Data"
            break;
    }

    return parsedPresenceStatus
}

const isTimeValid = (givenTime: Date, limitTime: Date): boolean => {
    const givenTotalMinutes = givenTime.getHours() * 60 + givenTime.getMinutes();
    const limitTotalMinutes = limitTime.getHours() * 60 + limitTime.getMinutes();

    return givenTotalMinutes <= limitTotalMinutes;
}

export { generateDatesInRange, generateRandomString, parsePresenceStatus, parseScheduleDay, isTimeValid }