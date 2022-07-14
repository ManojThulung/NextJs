import { Fragment, useState } from "react";
import { findPath, readFileData } from "../api/feedback";

function Feedback(props) {
  const [selectedFeedback, setSelectedFeedback] = useState();
  function viewDetailHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedFeedback(data.feedback);
      });
  }
  console.log(props.feedbackList);
  return (
    <Fragment>
      {selectedFeedback && <p>{selectedFeedback.email}</p>}
      <ul>
        {props.feedbackList.map((list) => (
          <li key={list.id}>
            {list.feedback}{" "}
            <button onClick={viewDetailHandler.bind(null, list.id)}>
              View Detail
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
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
