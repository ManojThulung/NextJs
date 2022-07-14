import fs from "fs";
import path from "path";

function findPath() {
  return path.join(process.cwd(), "data", "feedback.json"); //takes the file path where the data is to be store
}

function readFileData(filePath) {
  const fileData = fs.readFileSync(filePath); //read the data of that file
  const data = JSON.parse(fileData); //store the read data to array
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };

    // store that data in the file or in the database using POST request
    const filePath = findPath();
    const data = readFileData(filePath);

    data.push(newFeedback); //add new received feedback data to the array.
    fs.writeFileSync(filePath, JSON.stringify(data)); //store the total array data to the file.
    res
      .status(201)
      .json({ message: "Feedback is submitted", feedback: newFeedback }); //sends back response to the request.
  } else {
    const filePath = findPath();
    const data = readFileData(filePath);
    // .status() allows to change the status code.
    res.status(200).json({ feedback: data });
  }
}

export default handler; //this is not react component. This is stardard javascript function.
