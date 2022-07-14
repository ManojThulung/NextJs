import Head from "next/head";
import { useRef } from "react";

function Home(props) {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

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
    </div>
  );
}

export default Home;
