import { MongoClient } from "mongodb";
export async function connectDatabase() {
  // Connection with MongoDB
  const client = await MongoClient.connect(
    "mongodb+srv://manojthulung:thulungmanoj@cluster0.ewaqcmh.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const dbName = "next-event-app"; //connecting with database
  const db = client.db(dbName);
  const result = await db.collection(collection).insertOne(document); //data insertion
  return result;
}

export async function getAllComments(client, collection, sort) {
  const dbName = "next-event-app"; //connecting with database
  const db = client.db(dbName);

  const commentsList = await db
    .collection(collection)
    .find()
    .sort(sort) //_id is the key inside the object and -1 is the sort in descending order.
    .toArray();

  return commentsList;
}
