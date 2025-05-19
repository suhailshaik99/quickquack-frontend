// Library Imports
import { useState } from "react";
import { useForm } from "react-hook-form";

// Local Imports
import AddDetailsForm from "./AddDetailsForm";
import UploadImageForm from "./UploadImageForm";
import useMutationFunc from "../../services/useMutation";
import { createPost } from "../../services/FormSubmitAPI";

function CreatePost() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const [mutate, isPending, ] = useMutationFunc(
    createPost,
    "Post Uploaded Successfully.",
    "Trouble Uploading Post..",
  );

  function handleFormSubmit(data) {
    const formData = new FormData();
    formData.append("location", data.location);
    formData.append("description", data.description);
    formData.append("postUpload", data.postUpload[0]);
    mutate(formData);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
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
