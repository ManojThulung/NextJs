import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    console.log(userEmail);

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" }); //status(422) meaning invalid data.
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Database connection failed." });
      return;
    }

    try {
      await insertDocument(client, "emails", { email: userEmail });
      res.status(201).json({ message: "Registration successful" }); //status(201) request successful
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed." });
    }
    client.close();
  }
}

export default handler;
