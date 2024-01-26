import prisma from "@/components/db/prisma";
import {inngest} from "@/components/inngest/client";


export const testInngestFunction =  inngest.createFunction(
    { id: "insert-data-to-db" },
    { event: "test/test.event" }, // The event that will trigger this function

    // This function will be called every time an event payload is received
    async ({ event, step }) => {
        // return copyAllImagesToS3(event.data.imageURLs); // You can write whatever you want here.


        for(let i = 0; i < 10; i++) {
            await prisma.testTable.create({
                data: {
                    name: `${event.data.title} -- from inngest function`,
                    payload: event.data.data
                }
            })
        }
    }
);
