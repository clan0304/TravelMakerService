'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

enum TypeEnum {
  accomodation = 'accomodation',
  cafe = 'cafe',
  restaurant = 'restaurant',
  attraction = 'attraction',
  shopping = 'shopping',
  other = 'other',
}

type Inputs = {
  type: TypeEnum;
  myRating: number;
  comment: string;
};

interface FormProps {
  listId: string;
  onClose: () => void;
}

const Form = ({ listId, onClose }: FormProps) => {
  const { data: session } = useSession();
  const [defaultValues, setDefaultValues] = useState<Inputs>({
    type: TypeEnum.cafe,
    myRating: 0,
    comment: '',
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm<Inputs>({ defaultValues });

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const response = await axios.get(
            `/api/mylist/${session.user.email}/${listId}`
          );
          setDefaultValues(response.data);
          reset(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [session, listId, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (session) {
      try {
        const response = await axios.put(`/api/mylist/${session.user.email}`, {
          id: listId,
          myRating: data.myRating,
          comment: data.comment,
          type: data.type,
        });

        setDefaultValues(response.data);
        reset(response.data);

        onClose();
        window.location.reload();
      } catch (error) {
        toast.error('Somethin went wrong!');
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg max-w-md mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Place Type</label>
        <select
          {...register('type')}
          className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="accomodation">Accomodation</option>
          <option value="cafe">Cafe</option>
          <option value="restaurant">Restaurant</option>
          <option value="attraction">Attraction</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">My Rating</label>
        <input
          type="float"
          {...register('myRating', { max: 5 })}
          className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Rate out of 5"
        />
        {errors.myRating && (
          <span className="text-red-500 text-sm mt-1">Max rating is 5</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">
          Leave Comment
        </label>
        <textarea
          {...register('comment', { maxLength: 50 })}
          className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Your comment... (max 50 characters)"
        />
        {errors.comment && (
          <span className="text-red-500 text-sm mt-1">
            Comment must be 50 characters or less
          </span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
