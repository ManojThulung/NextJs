import fs from "fs/promises";
import path from "path";
import { Fragment } from "react";

function ProductDetail(props) {
  const { productData } = props;

  //   if data fetching is late.
  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <h1>{productData.title}</h1>
      <p>{productData.description}</p>
    </Fragment>
  );
}

async function fetchData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  // params is an object given by next with a full of key value paires.
  const { params } = context; //to get access to the concrete value of url similar to router.querry.pid

  const productId = params.pid;
  const data = await fetchData();
  const product = data.products.find((pd) => productId === pd.id);

  if (!product) {
    return { notFound: true }; //notFound: true will display 404 error when the request url is not found.
  }

  return {
    props: { productData: product },
  };
}

// Since this page is for a concrete url (ie dynamic pages), is requires another function
export async function getStaticPaths() {
  const data = await fetchData();

  const ids = data.products.map((product) => product.id);

  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: pathWithParams,
    // fallback key will be helpful if there is lot of pages that need to be regerenated.
    fallback: true, // This will allow Just in time data fetch. also requires return condition in the component function.
    // fallback: "blocking", //unlike above true, this will only redirect to the page after the data is responede.
    // Hence 'blocking' do not requires any return condition.
  };
}

export default ProductDetail;
