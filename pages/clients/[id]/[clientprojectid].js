import { useRouter } from "next/router";

function SelectedClientProject() {
  const router = useRouter();

  console.log(router.query); //give access to the dynamic url.

  return (
    <div>
      <h1>The Project page for the specific project of the selected client</h1>
    </div>
  );
}

export default SelectedClientProject;
