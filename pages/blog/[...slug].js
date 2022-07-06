import { useRouter } from "next/router";

function Blog() {
  const router = useRouter();

  console.log(router.query);
  // for the url path blog/what/you/want this will give {slug: ['what', 'you', 'want']}

  return (
    <div>
      <h1>The blog Page</h1>
    </div>
  );
}

export default Blog;
