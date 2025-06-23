// Library Imports
import { useState } from "react";
import moment from "moment-timezone";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

// Local Imports
import { closeBox } from "./postSlice";
import AddDetailsForm from "./AddDetailsForm";
import UploadImageForm from "./UploadImageForm";
import useMutationFunc from "../../hooks/useMutation";
import { useSocket } from "../../contexts/socketContext";
import { createPost } from "../../services/FormSubmitAPI";

function CreatePost() {
  const socket = useSocket();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const {_id: userId} = useSelector(state => state.user.userDetails);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const [mutate, isPending] = useMutationFunc(
    createPost,
    "Post Uploaded Successfully.",
    "Trouble Uploading Post..",
  );

  function handleFormSubmit(data) {
    const formData = new FormData();
    formData.append("location", data.location);
    formData.append("description", data.description);
    formData.append("postUpload", data.postUpload[0]);
    mutate(formData, {
      onSuccess: (data) => {
        const { _id: newPostId } = data?.post || {};
        const eventData = {
          userId, 
          newPostId,
          actionAt: moment().tz("Asia/Kolkata").format("h:mm A"),
          fullTime: moment().tz("Asia/Kolkata").format("DD/MM/YYYY h:mm:ss A z")
        }
        socket.emit("trigger-postCreation-notifications", eventData);
        dispatch(closeBox());
        queryClient.invalidateQueries(["posts"]);
      },
    });
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        encType="multipart/form-data"
      >
        {step == 1 && (
          <UploadImageForm
            setStep={setStep}
            errors={errors}
            trigger={trigger}
            register={register}
          />
        )}
        {step == 2 && (
          <AddDetailsForm
            setStep={setStep}
            register={register}
            isPending={isPending}
          />
        )}
      </form>
    </div>
  );
}

export default CreatePost;
