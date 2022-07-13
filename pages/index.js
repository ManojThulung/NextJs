import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

function Home(props) {
  return (
    <div>
      <Head>
        <title>Events</title>
        <meta
          name="description"
          content="Find a lot of great events and add your own event." //This will display in the google when searched.
        />
      </Head>
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
