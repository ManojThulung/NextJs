import fs from "fs/promises";
import path from "path";
import { Fragment } from "react";

function ProductDetail(props) {
  const { productData } = props;

  return (
    <Fragment>
      <h1>{productData.title}</h1>
      <p>{productData.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context; //to get access to the concrete value of url similar to router.querry.pid
  // params is an object given by next with a full of key value paires.

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((pd) => productId === pd.id);

  return {
    props: { productData: product },
  };
}

// Since this page is for a concrete url, is requires another function
export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false, // fallback key will be helpful if there is lot of pages that need to be regerenated.
  };
}

export default ProductDetail;
