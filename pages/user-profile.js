function UserProfile(props) {
  return (
    <div>
      <h1>{props.username}</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: { username: "John" },
  };
}

export default UserProfile;
