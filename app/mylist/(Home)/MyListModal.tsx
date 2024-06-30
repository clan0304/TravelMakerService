import Form from './Form';

interface MyListModalProps {
  onClose: () => void;
  listId: string;
}

const MyListModal = ({ onClose, listId }: MyListModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg  rounded-lg relative p-10">
        <button
          className="absolute top-2 right-3 text-3xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <Form listId={listId} onClose={onClose} />
      </div>
    </div>
  );
};

export default MyListModal;
