import { useEffect, useState } from "react";
import useSWR from "swr"; //this is a third party hook used for data fetch.

function LastSales(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  // Here is a client-side data fetching using useSWR. However it is not working.
  //   const { data, error } = useSWR(
  //     "https://nextjs-co-13230-default-rtdb.firebaseio.com/sales.json"
  //   );
  //   useEffect(() => {
  //     if (data) {
  //       const transformedSales = [];
  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].usename,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setSales(transformedSales);
  //     }
  //   }, [data]);

  useEffect(() => {
    // setIsLoading(false);

    fetch("https://nextjs-co-13230-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedSales);
        // setIsLoading(false);
      });
  }, []);

  //   if (isLoading) {
  //     return <p>Loading....</p>;
  //   }

  if (!sales) {
    return <p>Loading....</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

// at the same time we can also prepare some data on the servier-side or during the build process.
export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-co-13230-default-rtdb.firebaseio.com/sales.json"
  );

  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales } };
}

export default LastSales;
