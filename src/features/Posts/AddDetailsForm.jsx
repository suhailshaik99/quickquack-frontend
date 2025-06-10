import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";

import { closeBox } from "./postSlice";

function AddDetailsForm({ setStep, register, isPending }) {
  const dispatch = useDispatch();
  return (
    <div className="flex h-[50rem] w-[40rem] sm:w-[45rem] flex-col gap-[5rem] rounded-3xl bg-sky-200 shadow-md shadow-slate-400 backdrop:blur-md">
      <div className="flex items-center justify-between border-b-2 border-slate-300 px-5">
        <IoMdArrowRoundBack
          size={24}
          className="text-slate-600 hover:cursor-pointer"
          onClick={() => setStep((c) => c - 1)}
        />
        <h1 className="py-2 text-[1.8rem] font-semibold text-slate-700">
          Tell more about your post
        </h1>
        <ImCross
          size={18}
          className="text-slate-600 hover:cursor-pointer"
          onClick={() => dispatch(closeBox())}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-[4rem]">
        <div className="flex flex-col gap-2">
          <label className="text-[1.6rem] font-medium text-slate-700">
            Description
          </label>
          <textarea
            rows={6}
            cols={42}
            {...register("description")}
            placeholder="Write your description..."
            className="resize-none rounded-lg bg-sky-100 p-4 text-[1.5rem] focus:border-sky-200 focus:outline-none focus:ring-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[1.6rem] font-semibold text-slate-700">
            Location <span>📌</span>
          </label>
          <textarea
            rows={1}
            cols={42}
            placeholder="Location"
            {...register("location")}
            className="resize-none rounded-lg bg-sky-100 p-4 text-[1.5rem] focus:border-sky-200 focus:outline-none focus:ring-4"
          />
        </div>
        <button
          disabled={isPending}
          className="rounded-lg bg-sky-500 p-3 px-5 text-[1.5rem] font-bold text-white transition-colors duration-300 hover:bg-sky-600 disabled:cursor-not-allowed"
        >
          {isPending ? "Uploading..." : "Create Post"}
        </button>
      </div>
    </div>
  );
}

export default AddDetailsForm;
