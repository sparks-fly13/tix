import buildClient from "../api/build-client";

const MainPage = ({currentUser}) => {
  console.log(currentUser);
  return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
};

//cannot use useRequest here because it is a hook and hooks can only be used in functional components and getInitialProps is a function
MainPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const {data} = await client.get("/api/users/currentuser");

  return data;
};

export default MainPage;
