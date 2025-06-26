// Library Imports
import { useState } from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";

// Local Imports
import { closeBox } from "./postSlice";

function GalleryImage({ preview }) {
  return (
    <div className="h-[25rem] w-[22rem]">
      <img
        src={preview || "UPLOAD_POST.svg"}
        alt="upload_post_image"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function InputElement({ register, errors, handlePreview }) {
  return (
    <div className="h-[5rem] w-[20rem]">
      <input
        type="file"
        id="postUpload"
        className="hidden"
        {...register("postUpload", {
          required: "Please choose a post...",
          onChange: (e) => handlePreview(e),
        })}
      />
      <label
        htmlFor="postUpload"
        className="block w-full rounded-full border-2 border-violet-600 bg-violet-200 px-8 py-4 text-center text-[1.7rem] font-semibold text-violet-700 hover:cursor-pointer"
      >
        Select a post
      </label>
      {errors?.postImage && (
        <p className="text-[1rem] font-medium text-red-600">
          {errors.postImage.mesage}
        </p>
      )}
    </div>
  );
}

function UploadImageForm({ setStep, register, errors, trigger }) {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);

  // Event Handler Function
  async function handleNext() {
    const valid = await trigger("postUpload");
    if (valid) {
      setStep((c) => c + 1);
    } else {
      toast.error("Please select a post to upload..");
    }
  }

  function handlePreview(e) {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
    }
  }
  return (
    <div className="flex h-[50rem] w-[36rem] flex-col gap-[5rem] rounded-3xl bg-sky-200 shadow-md shadow-slate-400 backdrop:blur-md sm:w-[45rem]">
      <div className="flex items-center justify-between border-b-2 border-slate-300 px-5">
        <ImCross
          size={18}
          className="text-slate-600 hover:cursor-pointer"
          onClick={() => dispatch(closeBox())}
        />
        <h1 className="py-2 text-[1.8rem] font-semibold text-slate-700">
          Create Post
        </h1>
        <button
          className="rounded-lg bg-sky-500 px-3 py-[0.2rem] text-[1.5rem] font-semibold text-white transition-colors duration-200 hover:bg-sky-600"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-[2rem]">
        <GalleryImage preview={preview} />
        <InputElement
          register={register}
          errors={errors}
          handlePreview={handlePreview}
        />
      </div>
    </div>
  );
}

export default UploadImageForm;
