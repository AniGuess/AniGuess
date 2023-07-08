import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { MeDocument, useLoginMutation } from '../../api/generated';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
});

export const Login = () => {
  const [login] = useLoginMutation();
  const [error, setError] = useState('');

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-52 w-auto" src="/logo.jpeg" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Administrator login
          </h2>
        </div>

        {error && (
          <div className="flex justify-center mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <h3 className="text-red-500">{error}</h3>
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async ({ username, password }) => {
              setError('');
              const response = await login({
                variables: { username, password },
                awaitRefetchQueries: true,
                refetchQueries: [{ query: MeDocument }]
              });
              if (response.errors) {
                setError('Something went wrong');
              } else if (!response.data?.login) {
                setError('Username or password incorrect');
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                  </div>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    disabled={isSubmitting}
                    autoComplete="username"
                    placeholder="user"
                    as={Input}
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="username" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    aria-label="password"
                    disabled={isSubmitting}
                    placeholder="password"
                    as={Input}
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div>
                  <Button type="submit">{isSubmitting ? 'Loading...' : 'Login'}</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
