import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { MeDocument, useLogoutMutation } from "../../api/generated";

export const Home = () => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout({ refetchQueries: [{ query: MeDocument }], awaitRefetchQueries: true });
    await apolloClient.resetStore();
    navigate('/login');
  };
  
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl">AniGuess</h1>
      <button onClick={handleLogout} className="rounded-full bg-red-500 p-2 text-white">Logout</button>
    </div>
  )
}
