function UserId(props) {
  return <div>{props.userId}</div>;
}

export default UserId;

export async function getServerSideProps(context) {
  // params is an object given by next with a full of key value paires.
  const { params } = context; //to get access to the concrete value of url similar to router.querry.pid

  const userId = params.id;

  return {
    props: { userId: "userId_" + userId },
  };
}
