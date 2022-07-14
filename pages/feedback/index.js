import { findPath, readFileData } from "../api/feedback";

function Feedback(props) {
  console.log(props.feedbackList);
  return (
    <ul>
      {props.feedbackList.map((list) => (
        <li key={list.id}>{list.feedback}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // here fetch API should not be use to call within the same localhost or own API.
  // Insted we directly use path and fs to get the data.
  const filePath = findPath();
  const data = readFileData(filePath);

  return {
    props: { feedbackList: data },
    revalidate: 3600,
  };
}

export default Feedback;
