import Link from "next/link";

function Clients() {
  const clients = [
    { id: "jhn", name: "John Cena" },
    { id: "rag", name: "Ragnor" },
  ];
  return (
    <div>
      <h1>The Client Page</h1>
      <ul>
        {clients.map((client) => {
          return (
            <li key={client.id}>
              <Link href={`clients/${client.id}`}>{client.name}</Link>
              {/* Above ulternative ways
              <Link
                href={{
                  pathname: "clients/[id]",
                  query: { id: client.id },
                }}
              >
                {client.name}
              </Link> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Clients;
