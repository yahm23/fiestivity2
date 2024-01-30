import React, {useState} from 'react'
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

const EventForm = () => {
  const { user } = useUser();
  const [input, setInput] = useState({
    name: '',
    content: '',
    userId: user?.id
  });


  const { mutate, isLoading: isPosting } = api.event.createUserEvent.useMutation({
    onSuccess: () => {
      setInput({name: '', content: '', userId: user?.id});
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  if (!input.userId) return null;

  return (

    <div className="flex w-full gap-3">
      <input
        placeholder="Enter event name"
        className="grow bg-transparent outline-none"
        type="text"
        value={input.name}
        onChange={(e) => setInput({name: e.target.value, content: input.content, userId: input.userId})}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input.name !== "") {
              mutate({ name: input.name , content: input.content, userId: input.userId! });
            }
          }
        }}
        disabled={isPosting}
      />
      {!isPosting && (
        <button onClick={() => mutate({  name: input.name , content: input.content, userId: input.userId! })}>Create</button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <p>Loading!</p>
        </div>
      )}
    </div>
  );
};


export default EventForm