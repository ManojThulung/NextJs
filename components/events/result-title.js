import Button from "../ui/button";
import classes from "./result-title.module.css";

function ResultTitle(props) {
  const { date } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link={"/events"}>Display all Events</Button>
    </section>
  );
}

export default ResultTitle;
