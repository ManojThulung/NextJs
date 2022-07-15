import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    console.log(userEmail);

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" }); //status(422) meaning invalid data.
      return;
    }

    // Connection with MongoDB
    const client = await MongoClient.connect(
      "mongodb+srv://manojthulung:thulungmanoj@cluster0.ewaqcmh.mongodb.net/?retryWrites=true&w=majority"
    );

    const dbName = "next-event-app";
    const db = client.db(dbName);
    await db.collection("emails").insertOne({ email: userEmail });

    res.status(201).json({ message: "Registration successful" }); //status(201) request successful
  }
}

export default handler;
