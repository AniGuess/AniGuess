import { Opening } from '../types/opening';
import { client } from './client';

const GET_RANDOM_OPENINGS_QUERY = `
  query GetRandomOpenings($data: GetRandomOpeningsInput) {
    getRandomOpenings(data: $data) {
      id
      title
      imageUrl
      keywords
      youtubeUrl
    }
  }
`;

interface Data {
  getRandomOpenings: Opening[];
}
interface Variables {
  limit: number;
}

export const getOpenings = async ({ limit }: { limit: number }) => {
  const response = await client.query<Data, Variables>(
    GET_RANDOM_OPENINGS_QUERY,
    {
      limit
    }
  );
  if (!response.data?.getRandomOpenings) {
    throw new Error(
      'An error has occurred while fetching openings: ' +
        (response.error ?? 'Opening list is empty')
    );
  }
  return response.data.getRandomOpenings;
};
