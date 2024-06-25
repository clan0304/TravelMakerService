import { useSession } from 'next-auth/react';

import { SubmitHandler, useForm } from 'react-hook-form';

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
}

const Form = ({ listId }: FormProps) => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch('/api/lists', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: session?.user.email,
          id: listId,
          myRating: data.myRating,
          comment: data.comment,
          type: data.type,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('CafeItem updated successfully:', result);
      } else {
        console.error('Error updating CafeItem:', result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
          type="number"
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
          {...register('comment', { maxLength: 30 })}
          className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Your comment... (max 30 characters)"
        />
        {errors.comment && (
          <span className="text-red-500 text-sm mt-1">
            Comment must be 30 characters or less
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
