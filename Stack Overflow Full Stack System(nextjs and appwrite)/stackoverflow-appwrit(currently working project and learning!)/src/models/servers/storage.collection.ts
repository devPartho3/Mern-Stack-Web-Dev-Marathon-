import { Storage } from "node-appwrite";
import { client } from "./config";

const storage = new Storage(client);

const BUCKET_ID = "attachments";

export default async function getOrCreateBucket() {
  try {
    // Try to get bucket
    const bucket = await storage.getBucket(BUCKET_ID);
    console.log("Bucket already exists");
    return bucket;
  } catch (err) {
    // If not found → create it
    const bucket = await storage.createBucket(
      BUCKET_ID,
      "Attachments",
      [
        "read(\"any\")",
        "create(\"users\")",
        "update(\"users\")",
        "delete(\"users\")"
      ],
      true,  // file security
      true,  // enabled
      undefined,
      undefined,
      undefined,
      undefined,    
    );

    console.log("Bucket created successfully");
    return bucket;
  }
}