<<<<<<< HEAD
import path from "path";
import fs from "fs/promises";
import Link from "next/link";

function Home(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>
          <Link href={`/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("(Re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // If there is no data found during the fetching we can use redirect key as given below.
  if (!data) {
    return {
      redirect: {
        destination: "/no-data", //path name that you want to redirect.
      },
    };
  }

  //IF during the fetching, something went wrong or fetch request failed we can also display 404 error.
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, //time in second to re-generate page.
  };
}

=======
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
>>>>>>> 05-events-app-with-firebase
export default Home;
