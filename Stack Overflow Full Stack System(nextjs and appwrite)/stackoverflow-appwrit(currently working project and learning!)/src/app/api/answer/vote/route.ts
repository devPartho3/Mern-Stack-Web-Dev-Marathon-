import { databases } from "@/models/client/config";
import { db, votecollection } from "@/models/name";
import { users } from "@/models/servers/config";
import { UserPrefs } from "@/store/Auth";
import { ID } from "appwrite";
import { NextRequest } from "next/server";
import { Query } from "node-appwrite";


export async function POST(request: NextRequest) {
    try {
        //grab the data from the request body
        //list documents
        const { votedbyid, votestatus, type, typeid } = await request.json();
        const response = await databases.listDocuments(
            db, votecollection,
            [
                Query.equal("votedbyid", votedbyid),
                Query.equal("typeid", typeid),
                Query.equal("type", type)
            ]
        )

        if (response.documents.length > 0) {
            await databases.deleteDocument(
                db, votecollection, response.documents[0].$id)

            //decrease the previous vote count
            const questionoranswervote = await databases.getDocument(db, type === "question" ? "questions" : "answers", typeid);
            const authorPrefs = await users.getPrefs<UserPrefs>(questionoranswervote.authorid);
            await users.updatePrefs<UserPrefs>(questionoranswervote.authorid, {
                reputation: response.documents[0].votestatus === "upvote" ? Number(authorPrefs.reputation) - 10 : Number(authorPrefs.reputation) + 2
            });
            //that means previous vote doesnt exist so vote status shifted to the new one
            if (response.documents[0]?.votestatus !== votestatus) {


                const doc = await databases.createDocument(
                    db,
                    votecollection,
                    ID.unique(),
                    {
                        type,
                        typeid,
                        votebyid: votedbyid,
                        votestatus
                    }
                );
                //increase or decrease the vote count based on the new vote status
                const questionoranswervote = await databases.getDocument(db, type === "question" ? "questions" : "answers", typeid);
                const authorPrefs = await users.getPrefs<UserPrefs>(questionoranswervote.authorid);
                await users.updatePrefs<UserPrefs>(questionoranswervote.authorid, {
                    reputation: votestatus === "upvote" ? Number(authorPrefs.reputation) + 10 : Number(authorPrefs.reputation) - 2
                });
            }
        } else {
            const doc = await databases.createDocument(
                db,
                votecollection,
                ID.unique(),
                {
                    type,
                    typeid,
                    votebyid: votedbyid,
                    votestatus
                }
            );
            // increase or decrease the vote count based on the new vote status
            const questionoranswervote = await databases.getDocument(
                db,
                type === "question" ? "questions" : "answers",
                typeid
            );
            //if vote was present then update the reputation of the author
            if (response.documents.length > 0) {
                const authorPrefs = await users.getPrefs<UserPrefs>(questionoranswervote.authorid);
                await users.updatePrefs<UserPrefs>(questionoranswervote.authorid, {
                    reputation: response.documents[0].votestatus === "upvote" ? Number(authorPrefs.reputation) - 10 : Number(authorPrefs.reputation) + 2
                });
            }
            const authorPrefs = await users.getPrefs<UserPrefs>(questionoranswervote.authorid);
            await users.updatePrefs<UserPrefs>(questionoranswervote.authorid, {
                reputation: votestatus === "upvote" ? Number(authorPrefs.reputation) + 10 : Number(authorPrefs.reputation) - 2
            });
            //if vote was present and the new vote status is different from the previous one then update the reputation of the author based on the new vote status
            if (response.documents.length > 0 && response.documents[0].votestatus !== votestatus) {
                const authorPrefs = await users.getPrefs<UserPrefs>(questionoranswervote.authorid);
                await users.updatePrefs<UserPrefs>(questionoranswervote.authorid, {
                    reputation: votestatus === "upvote" ? Number(authorPrefs.reputation) + 10 : Number(authorPrefs.reputation) - 2
                });
            }
        }



        const [upvotes, downvotes] = await Promise.all([
            databases.listDocuments(db, votecollection, [
                Query.equal("typeid", typeid),
                Query.equal("type", type),
                Query.equal("votestatus", "upvote"),
                Query.equal("votebyid", votedbyid),
                Query.limit(1)
            ]),
            databases.listDocuments(db, votecollection, [
                Query.equal("typeid", typeid),
                Query.equal("type", type),
                Query.equal("votestatus", "downvote"),
                Query.equal("votebyid", votedbyid),
                Query.limit(1)
            ])
        ]);

        return new Response(JSON.stringify({
            upvotes: upvotes.total,
            downvotes: downvotes.total
        }), { status: 200 });

    } catch (error: any) {
        console.error("Error voting on answer:", error);
        return new Response(JSON.stringify({ error: "Failed to vote on answer" }), { status: 500 });
    }
}