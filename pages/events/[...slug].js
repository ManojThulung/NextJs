import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// import { getFilteredEvents } from "../../helpers/api-util"; //this is for server-side rendering

import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/result-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import useSWR from "swr";

function FilterEvent(props) {
  // for client side rendering
  const [loadedEvent, setLoadedEvent] = useState();
  const router = useRouter();

  const filteredDate = router.query.slug;

  const fetcher = (...args) =>
    fetch(...args).then((response) => response.json());

  const { data, error } = useSWR(
    "https://nextjs-co-13230-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    const transformedData = [];

    for (const key in data) {
      transformedData.push({
        id: key,
        ...data[key],
      });
    }

    setLoadedEvent(transformedData);
  }, [data]);

  if (!loadedEvent || !filteredDate) {
    return (
      <Fragment>
        <HeaderData />
        <h1 className="center">Loading....</h1>
      </Fragment>
    );
  }

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
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <HeaderData />
        <ErrorAlert>
          <p>The filter data is invalid. Please use valid data</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Display all EventsSerach</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvent.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <HeaderData />
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
      <HeaderData />
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilterEvent;

function HeaderData(props) {
  return (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All the filtered Events.`} />
    </Head>
  );
}

// for server side rendering
// export async function getServerSideProps(context) {
//   const filteredDate = context.params.slug;

//   const filterYear = filteredDate[0];
//   const filtermonth = filteredDate[1];

//   const numYear = +filterYear;
//   const numMonth = +filtermonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true, //display an 404 error
//       // redirect: { // redirect to different page
//       //   destination: '/path'
//       // }
//     };
//   }

//   const selectedEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       filteredEvents: selectedEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
