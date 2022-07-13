import { Fragment } from "react";
// import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";

import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/result-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

function FilterEvent(props) {
  // const router = useRouter();

  // const filteredData = router.query.slug;

  // if (!filteredData) {
  //   return (
  //     <div className="center">
  //       <h1>Loading....</h1>
  //     </div>
  //   );
  // }

  if (props.hasError) {
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

  const filteredEvents = props.filteredEvents;

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

  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <Fragment>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilterEvent;

export async function getServerSideProps(context) {
  const filteredDate = context.params.slug;

  const filterYear = filteredDate[0];
  const filtermonth = filteredDate[1];

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
    return {
      props: { hasError: true },
      // notFound: true, //display an 404 error
      // redirect: { // redirect to different page
      //   destination: '/path'
      // }
    };
  }

  const selectedEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents: selectedEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
