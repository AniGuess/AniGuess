import { useApolloClient } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { MeDocument, Opening, useGetOpeningsQuery, useLogoutMutation } from '../../api/generated';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';

const API_LIMIT = 200000

export const Home = () => {
  const { data, loading } = useGetOpeningsQuery({ variables: { data: { cursor: null, limit: API_LIMIT } } })
  // const [logout] = useLogoutMutation();
  // const apolloClient = useApolloClient();
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await logout({ refetchQueries: [{ query: MeDocument }], awaitRefetchQueries: true });
  //   await apolloClient.resetStore();
  //   navigate('/login');
  // };

  return (
    <div className="flex flex-col justify-center items-center h-full overflow-scroll p-20">
      <h1 className="text-5xl mb-5 font-bold">List of openings</h1>
      <div className="flex flex-col items-center justify-center bg-white rounded-md p-10 w-[1100px]">
        <div className="w-72 mb-9">
          <Link to="/new">
            <Button>Add opening</Button>
          </Link>
        </div>
        {data?.getOpenings.results.length ? (
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.getOpenings.results.map(opening => (
              <li
                key={opening.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow max-w-[370px]"
              >
                <div className="flex w-full items-start justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        {opening.title}
                      </h3>
                    </div>
                    <p className="mt-2 mb-4 truncate text-sm text-gray-500">
                      {opening.keywords.join(', ')}
                    </p>
                    <a className="mt-4 truncate text-sm text-[#F8B5AB]" href={opening.youtubeUrl}>
                      {opening.youtubeUrl}
                    </a>
                  </div>
                  <img
                    className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                    src={opening.imageUrl}
                    alt={opening.title}
                  />
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <a className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-blue-500 hover:text-white hover:cursor-pointer">
                        Edit
                      </a>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      <a className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-red-500 hover:text-white hover:cursor-pointer">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p className="text-gray-500">{loading ? 'Loading...' : 'Nothing to show'}</p>
          </div>
        )}
      </div>
    </div>
  );
};
