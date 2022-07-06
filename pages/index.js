import Link from "next/link";

function Home() {
  return (
    <div>
      <h1>Hello world</h1>
      <ul>
        <li>
          <Link href="clients">Clients</Link>
        </li>
        <li>
          <Link href="portfolio">Portfolio</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
