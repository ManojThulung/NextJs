import { findPath, readFileData } from "./feedback";

function handler(req, res) {
  const feedbackId = req.query.feedbackId; //gets concrete value of the path.

  const filePath = findPath();
  const feedbackList = readFileData(filePath);

  const selectedFeedback = feedbackList.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
