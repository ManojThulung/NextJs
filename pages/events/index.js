import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSerach from "../../components/events/events-search";

function Events(props) {
  const allEvents = props.events;
  const router = useRouter();

  function eventSearchHandler(year, month) {
    const path = `/events/${year}/${month}`;

    router.push(path);
  }

  return (
    <div>
      <EventsSerach onSearch={eventSearchHandler} />
      <EventList items={allEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: { events: allEvents },
    revalidate: 1600,
  };
}
export default Events;
