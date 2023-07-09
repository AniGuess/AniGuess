import { Link } from 'react-router-dom';

import { useGetOpeningsQuery } from '../../api/generated';
import { Button } from '../components/Button';
import { OpeningItem } from '../components/Opening';

const API_LIMIT = 10;

export const Home = () => {
  const { data, loading, fetchMore } = useGetOpeningsQuery({
    variables: { data: { cursor: null, limit: API_LIMIT } },
    notifyOnNetworkStatusChange: true
  });
  // const [logout] = useLogoutMutation();
  // const apolloClient = useApolloClient();
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await logout({ refetchQueries: [{ query: MeDocument }], awaitRefetchQueries: true });
  //   await apolloClient.resetStore();
  //   navigate('/login');
  // };

  return (
    <div className="flex flex-col items-center h-full overflow-scroll p-20">
      <h1 className="text-5xl mb-5 font-bold">List of openings</h1>
      <div className="flex flex-col items-center justify-center bg-white rounded-md p-10 w-[1100px]">
        <div className="w-72 mb-9">
          <Link to="/new">
            <Button>Add opening</Button>
          </Link>
        </div>
        {data?.getOpenings.results.length ? (
          <>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data?.getOpenings.results.map(opening => (
                <OpeningItem opening={opening} key={opening.id} />
              ))}
            </ul>
            {data?.getOpenings.hasMore ? (
              <div className="mt-5 w-72">
                <Button
                  onClick={() =>
                    fetchMore({
                      variables: { data: { cursor: data?.getOpenings.lastId, limit: API_LIMIT } }
                    })
                  }
                  disabled={loading}
                  secondary
                >
                  {loading ? 'Loading...' : 'Show More'}
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <div>
            <p className="text-gray-500">{loading ? 'Loading...' : 'Nothing to show'}</p>
          </div>
        )}
      </div>
    </div>
  );
};
