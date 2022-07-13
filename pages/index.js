import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

function Home(props) {
  return (
    <div>
      <EventList items={props.events} />
      <div></div>
    </div>
  );
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { events: featuredEvents },
    revalidate: 3600, //in second
  };
}
export default Home;
