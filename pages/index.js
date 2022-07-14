import Head from "next/head";
import { useRef, useState } from "react";

function Home(props) {
  const [feedbackList, setFeedbackList] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    // Post request to store data in feedback.json
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail, feedback: enteredFeedback }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function feedbackDiplayHandler() {
    // GET request to get data of feedback.json
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackList(data.feedback);
        console.log(data);
      });
  }

  return (
    <div>
      <Head>
        <title>API Routs</title>
      </Head>
      <h1>This is home page</h1>
      <form onClick={submitHandler}>
        <div>
          <label htmlFor="email">Your Email:</label>
          <input type="text" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback:</label>
          <textarea
            type="text"
            id="feedback"
            rows="4"
            ref={feedbackInputRef}
          ></textarea>
        </div>
        <button>Submit feedback</button>
      </form>
      <hr />
      <button onClick={feedbackDiplayHandler}>Show Feedback</button>
      <ul>
        {feedbackList.map((list) => (
          <>
            <li>{list.email}</li>
            <li>{list.feedback}</li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default Home;
