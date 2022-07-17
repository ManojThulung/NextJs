import {
  connectDatabase,
  insertDocument,
  getAllComments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId; //stores dynamic value of url.

  let client;
  let result;
  //creates connect with the mongodb.
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "database connection failed." });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    // inserting data in the comments collection.
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      res.status(200).json({ message: "POST request successful" });
    } catch (error) {
      res.status(500).json({ message: "Data insertion failed." });
    }
  }

  if (req.method === "GET") {
    try {
      result = await getAllComments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: result });
    } catch (error) {
      res.status(500).json({ message: "failed to load comments" });
    }
  }

  client.close();
}

export default handler;
