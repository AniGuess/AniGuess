import { ErrorMessage, FastField, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { MeDocument, useLoginMutation } from '../../api/generated';

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
});

export const Login = () => {
  const [login] = useLoginMutation();
  const [error, setError] = useState('');

  return (
    <>
      <h1>Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Formik
        initialValues={{ username: 'admin', password: 'admin' }}
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
        {({ isSubmitting, handleChange, handleBlur }) => (
          <Form>
            <div>
              <FastField
                type="text"
                name="username"
                aria-label="username"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                placeholder="user@mail.com"
              />
              <ErrorMessage name="username" className="text-red-500" />
            </div>
            <div>
              <FastField
                type="password"
                name="password"
                aria-label="password"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                placeholder="P@ssw0rd"
              />
              <ErrorMessage name="password" className="text-red-500" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
            {isSubmitting && <p>Loading...</p>}
          </Form>
        )}
      </Formik>
    </>
  );
};
