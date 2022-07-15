import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId; //stores dynamic value of url.

  //creates connect with the mongodb.
  const client = await MongoClient.connect(
    "mongodb+srv://manojthulung:thulungmanoj@cluster0.ewaqcmh.mongodb.net/?retryWrites=true&w=majority"
  );

  // connects with the database in mongodb
  const dbName = "next-event-app";
  const db = client.db(dbName);

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    // inserting data in the comments collection.
    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);

    res.status(200).json({ message: "POST request successful" });
  }

  if (req.method === "GET") {
    const commentsList = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 }) //_id is the key inside the object and -1 is the sort in descending order.
      .toArray();

    res.status(200).json({ comments: commentsList });
  }
}

export default handler;
