import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSerach from "../../components/events/events-search";

function Events() {
  const allEvents = getAllEvents();
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

export default Events;
