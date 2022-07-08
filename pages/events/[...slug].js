import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import ResultTitle from "../../components/events/result-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

function FilterEvent() {
  const router = useRouter();

  const filteredData = router.query.slug;

  if (!filteredData) {
    return (
      <div className="center">
        <h1>Loading....</h1>
      </div>
    );
  }

  const filterYear = filteredData[0];
  const filtermonth = filteredData[1];

  const numYear = +filterYear;
  const numMonth = +filtermonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>The filter data is invalid. Please use valid data</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Display all EventsSerach</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events are found.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Display all Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilterEvent;
