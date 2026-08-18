import { Permission } from "appwrite";
import { databases } from "./config";
import { db, answercollection } from "../name";
import { DatabasesIndexType } from "node-appwrite";

export default async function createAnswerCollection() {

    // CREATE COLLECTION
    await databases.createCollection(
        db,
        answercollection,
        answercollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]
    );

    console.log("Answer collection created successfully");

    // CREATE ATTRIBUTES
    await Promise.all([
        databases.createStringAttribute(db, answercollection, "content", 1000, true),
        databases.createStringAttribute(db, answercollection, "authorId", 100, true),
        databases.createStringAttribute(db, answercollection, "questionId", 100, true),

        databases.createIntegerAttribute(db, answercollection, "votes", true, 0),
        databases.createBooleanAttribute(db, answercollection, "isAccepted", true, false),
    ]);

    console.log("Answer attributes created successfully");

    // CREATE INDEXES
    await Promise.all([
        databases.createIndex({
            databaseId: db,
            collectionId: answercollection,
            key: "question_index",
            type: DatabasesIndexType.Key,
            attributes: ["questionId"],
        }),

        databases.createIndex({
            databaseId: db,
            collectionId: answercollection,
            key: "author_index",
            type: DatabasesIndexType.Key,
            attributes: ["authorId"],
        }),
    ]);


    console.log("Answer indexes created successfully");
}

