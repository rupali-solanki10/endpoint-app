import { Task as TaskType, TaskUpdatePayload } from "@/app/types/task";

const apiKey = "PMAK-65a6d95a73d7f315b0b3ae13-28f9a3fada28cc91e0990b112478319641";
const todoListURL = "https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/get";
const updateToDoURL = "https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/patch/";
const headers = new Headers();
headers.append("X-Api-Key", `${apiKey}`);

export const getToDoList = async () => {
    const res = await fetch(todoListURL, {
        method: "GET",
        headers: headers
    });
    return await res.json();
}

export const updateToDo = async (payload: TaskUpdatePayload) => {
    const res = await fetch(`${updateToDoURL}${payload.id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(payload)
    });
    return await res.json();
}
