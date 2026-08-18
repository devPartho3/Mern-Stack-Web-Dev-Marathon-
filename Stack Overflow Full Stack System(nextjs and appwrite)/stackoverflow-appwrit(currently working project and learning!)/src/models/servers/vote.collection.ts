import { Permission } from "node-appwrite";
import { db, votecollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
    // Creating Collection
    await databases.createCollection(db, votecollection, votecollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Vote Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createEnumAttribute(db, votecollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, votecollection, "typeId", 50, true),
        databases.createEnumAttribute(
            db,
            votecollection,
            "voteStatus",
            ["upvoted", "downvoted"],
            true
        ),
        databases.createStringAttribute(db, votecollection, "votedById", 50, true),
    ]);
    console.log("Vote Attributes Created");
}
