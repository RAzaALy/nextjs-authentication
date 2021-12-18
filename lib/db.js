import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://HayderAly:mwxj7NWhak5HG1gc@cluster0.ophfd.mongodb.net/auth?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  return client;
}
