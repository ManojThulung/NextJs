import { Fragment } from "react";
import Head from "next/head";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

import EventSummary from "../../components/event-details/event-summary";
import EventContent from "../../components/event-details/event-content";
import EventLogistics from "../../components/event-details/event-logistics";

function Eventid(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        image={event.image}
        address={event.location}
        alt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.id;
  const event = await getEventById(eventId);

  return {
    props: { selectedEvent: event },
    revalidate: 30, //in second
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();

  const pathWithEvents = allEvents.map((event) => ({
    params: { id: event.id },
  }));

  return {
    paths: pathWithEvents,
    fallback: "blocking",
  };
}

export default Eventid;
