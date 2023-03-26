import { faker } from '@faker-js/faker';
import { testDataSource } from '../../../utils/createDataSource';
import { gqlCall } from '../../../utils/gqlCall';
import { User } from '../../../db/entities/User';

const meQuery = `
query Me {
    me {
        id
        username
    }
}
`;

export const HomeTest = () => {
  it('should get user', async () => {
    const dataSource = await testDataSource();

    const userData = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    };

    const user = await dataSource.manager.create(User, { ...userData }).save();

    const response = await gqlCall({
      source: meQuery,
      userId: user.id
    });
    expect(response).toMatchObject({
      data: {
        me: {
          id: user.id,
          username: user.username
        }
      }
    });
  });

  it('should return null', async () => {
    const response = await gqlCall({
      source: meQuery
    });
    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  });
};
