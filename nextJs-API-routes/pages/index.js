import { useRef } from "react";
import useRouter from "next/router";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const router = useRouter();
  function loadFeedbackHandler() {
    router.push("/api/feedback");
  }

  function submitFormHandler(event) {
    event.preventDefault();

    console.log("first");

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, feedback: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Submit Feedabck</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>load feeedback</button>
    </div>
  );
}

export default HomePage;
