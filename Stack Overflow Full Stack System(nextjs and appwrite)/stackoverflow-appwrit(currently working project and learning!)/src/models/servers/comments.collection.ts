import { Permission } from "appwrite";
import { databases } from "./config";
import { db, commentcollection } from "../name";
import { DatabasesIndexType } from "node-appwrite";

export default async function createCommentsCollection() {
    // CREATE COLLECTION
    await databases.createCollection(
        db,
        commentcollection,
        commentcollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]
    );

    console.log("Comments collection created successfully");

    // CREATE ATTRIBUTES
    await Promise.all([
        databases.createStringAttribute(db, commentcollection, "content", 1000, true),
        databases.createStringAttribute(db, commentcollection, "authorId", 100, true),
        databases.createStringAttribute(db, commentcollection, "questionId", 100, true),
        databases.createStringAttribute(db, commentcollection, "answerId", 100, true),
    ]);

    console.log("Comments attributes created successfully");

    // CREATE INDEXES
    await Promise.all([
        databases.createIndex({
            databaseId: db,
            collectionId: commentcollection,
            key: "question_index",
            type: DatabasesIndexType.Key,
            attributes: ["questionId"],
        }),

        databases.createIndex({
            databaseId: db,
            collectionId: commentcollection,
            key: "answer_index",
            type: DatabasesIndexType.Key,
            attributes: ["answerId"],
        }),

        databases.createIndex({
            databaseId: db,
            collectionId: commentcollection,
            key: "author_index",
            type: DatabasesIndexType.Key,
            attributes: ["authorId"],
        }),
    ]);

    console.log("Comments indexes created successfully");
}

