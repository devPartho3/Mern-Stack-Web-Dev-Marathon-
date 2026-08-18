import { db } from "../name";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentsCollection from "./comments.collection";
import createVoteCollection from "./vote.collection";
import createStorageBucket from "./storage.collection";
import { databases } from "./config";
import { StatusCode } from "node-appwrite";

export default async function getorcreatedb() {
    try {
        await databases.get(db);
        console.log("Database already exists");

        await Promise.all([
            createQuestionCollection(),
            createAnswerCollection(),
            createCommentsCollection(),
            createVoteCollection(),
            createStorageBucket(),
        ])
        console.log("All collections and storage bucket are set up");
    }
    catch (error) {
        if (error === 404) {
            await databases.create(db, db);
            console.log("Database created successfully");
        } else {
            console.error("Error checking database:", error);
            return;
        }
    }

    return databases
}
