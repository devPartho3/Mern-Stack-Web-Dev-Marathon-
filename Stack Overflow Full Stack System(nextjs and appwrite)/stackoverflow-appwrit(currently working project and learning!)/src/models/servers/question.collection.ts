import { Permission } from "appwrite";
import { DatabasesIndexType } from "node-appwrite";
import { db, questioncollection } from "../name";
import { databases } from "./config";

export default async function createQuestionCollection() {
  // CREATE COLLECTION
  await databases.createCollection(
    db,
    questioncollection,
    questioncollection,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );

  console.log("Question collection created successfully");

  // CREATE ATTRIBUTES
  await Promise.all([
    databases.createStringAttribute(db, questioncollection, "title", 100, true),
    databases.createStringAttribute(db, questioncollection, "content", 1000, true),
    databases.createStringAttribute(db, questioncollection, "tags", 100, true),
    databases.createStringAttribute(db, questioncollection, "authorId", 100, true),

    databases.createIntegerAttribute(db, questioncollection, "votes", true, 0),
    databases.createIntegerAttribute(db, questioncollection, "answersCount", true, 0),
    databases.createIntegerAttribute(db, questioncollection, "viewsCount", true, 0),

    databases.createStringAttribute(db, questioncollection, "attachmentId", 100, false),
  ]);

  console.log("Question attributes created successfully");

  // CREATE INDEXES
  await Promise.all([
    await Promise.all([
  databases.createIndex({
    databaseId: db,
    collectionId: questioncollection,
    key: "title_index",
    type: DatabasesIndexType.Fulltext,
    attributes: ["title"],
  }),

  databases.createIndex({
    databaseId: db,
    collectionId: questioncollection,
    key: "content_index",
    type: DatabasesIndexType.Fulltext,
    attributes: ["content"],
  }),

  databases.createIndex({
    databaseId: db,
    collectionId: questioncollection,
    key: "author_index",
    type: DatabasesIndexType.Key,
    attributes: ["authorId"],
  }),
])
    ]);

  console.log("Indexes created successfully");
}