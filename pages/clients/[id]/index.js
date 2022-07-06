import { useRouter } from "next/router";

function ClientProject() {
  const router = useRouter();

  function loadProjectHandler() {
    router.push("/clients/jhn/Project"); //redirect to the given path
  }

  return (
    <div>
      <h1>The Project of a given client</h1>
      <button onClick={loadProjectHandler}>Load a Project</button>
    </div>
  );
}

export default ClientProject;
