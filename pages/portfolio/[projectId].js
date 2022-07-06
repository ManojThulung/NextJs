import { useRouter } from "next/router";

function PortfolioProject() {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);
  // router.query send a request to some backend server
  // to fetch the pieces of data with an id of router.query.projectId

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
}

export default PortfolioProject;
