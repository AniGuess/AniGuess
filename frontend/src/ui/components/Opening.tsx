import { Link } from 'react-router-dom';

import { GetOpeningsDocument, Opening, useDeleteOpeningMutation } from '../../api/generated';

interface Props {
  opening: Opening;
}

export const OpeningItem = ({ opening }: Props) => {
  const [deleteOpening, { loading }] = useDeleteOpeningMutation();
  return (
    <li
      key={opening.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow max-w-[370px]"
    >
      <div className="flex w-full items-start justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">{opening.title}</h3>
          </div>
          <p className="mt-2 mb-4 truncate text-sm text-gray-500">{opening.keywords.join(', ')}</p>
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
            <Link
              to={`/edit/${opening.id}`}
              className="w-full"
              onClick={loading ? () => null : undefined}
            >
              <button
                disabled={loading}
                className="w-full relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 enabled:hover:bg-blue-500 enabled:hover:text-white enabled:hover:cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Edit'}
              </button>
            </Link>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              disabled={loading}
              onClick={() =>
                deleteOpening({
                  variables: { data: { id: Number(opening.id) } },
                  refetchQueries: [{ query: GetOpeningsDocument }],
                  awaitRefetchQueries: true
                })
              }
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 enabled:hover:bg-red-500 enabled:hover:text-white enabled:hover:cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
