import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { GetOpeningsDocument, useAddOpeningMutation } from '../../api/generated';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  keywords: Yup.string().required(),
  youtubeUrl: Yup.string().url().required(),
  imageUrl: Yup.string().url().required()
});

export const New = () => {
  const [addOpening] = useAddOpeningMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-5xl mb-5 font-bold">Create a new opening</h1>
      <div className="flex flex-col items-center justify-center bg-white rounded-md p-10 min-w-[1000px]">
        {error && (
          <div className="flex justify-center mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <h3 className="text-red-500 text-lg">{error}</h3>
          </div>
        )}
        <Formik
          initialValues={{ title: '', imageUrl: '', youtubeUrl: '', keywords: '' }}
          validationSchema={validationSchema}
          onSubmit={async data => {
            setError('');
            const response = await addOpening({
              variables: { data: { ...data, keywords: data.keywords.split(',') } },
              awaitRefetchQueries: true,
              refetchQueries: [{ query: GetOpeningsDocument }]
            });
            if (response.errors) {
              return setError('Something went wrong');
            } else if (!response.data?.addOpening) {
              return setError('Data incorrect, please check your input');
            }
            navigate('/');
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-[50%]">
              <div className="mb-5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                </div>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  disabled={isSubmitting}
                  autoComplete="title"
                  placeholder="Seven Deadly Sins"
                  as={Input}
                />
                <div className="text-red-500">
                  <ErrorMessage name="title" />
                </div>
              </div>
              <div className="mb-5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image URL
                  </label>
                </div>
                <Field
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  disabled={isSubmitting}
                  autoComplete="imageUrl"
                  placeholder="http://cdn.website.com/image.png"
                  as={Input}
                />
                <div className="text-red-500">
                  <ErrorMessage name="imageUrl" />
                </div>
              </div>
              <div className="mb-5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="youtubeUrl"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Youtube URL
                  </label>
                </div>
                <Field
                  type="text"
                  id="youtubeUrl"
                  name="youtubeUrl"
                  disabled={isSubmitting}
                  autoComplete="youtubeUrl"
                  placeholder="https://youtu.be/watch?v=00000"
                  as={Input}
                />
                <div className="text-red-500">
                  <ErrorMessage name="youtubeUrl" />
                </div>
              </div>
              <div className="mb-5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="keywords"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Keywords
                  </label>
                </div>
                <Field
                  type="text"
                  id="keywords"
                  name="keywords"
                  disabled={isSubmitting}
                  autoComplete="keywords"
                  placeholder="7DS, NNT, SDS"
                  as={Textarea}
                />
                <div className="text-red-500">
                  <ErrorMessage name="keywords" />
                </div>
              </div>
              <div>
                <Button type="submit">{isSubmitting ? 'Loading...' : 'Add'}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
