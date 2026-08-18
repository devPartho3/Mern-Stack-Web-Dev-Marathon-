import { Client, Databases, Storage, Users, Avatars } from "node-appwrite";
import  {serverEnv}  from "@/lib/env/server"

const client = new Client();

if (!serverEnv.appwrite.endpoint) throw new Error("Missing endpoint");
if (!serverEnv.appwrite.projectId) throw new Error("Missing projectId");
if (!serverEnv.appwrite.apiKey) throw new Error("Missing apiKey");

client
  .setEndpoint(serverEnv.appwrite.endpoint)
  .setProject(serverEnv.appwrite.projectId)
  .setKey(serverEnv.appwrite.apiKey);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client);
export const avatars = new Avatars(client);