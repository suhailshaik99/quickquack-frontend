// Library Imports
import { useState } from "react";
import { useForm } from "react-hook-form";

// Local Imports
import AddDetailsForm from "./AddDetailsForm";
import UploadImageForm from "./UploadImageForm";
import useMutationFunc from "../../hooks/useMutation";
import { createPost } from "../../services/FormSubmitAPI";
import { useDispatch } from "react-redux";
import { closeBox } from "./postSlice";
import { useQueryClient } from "@tanstack/react-query";

function CreatePost() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
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
      onSuccess: () => {
        dispatch(closeBox());
        queryClient.invalidateQueries(["posts"]);
      }
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
