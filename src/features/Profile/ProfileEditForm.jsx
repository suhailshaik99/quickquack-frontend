// Library Imports
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

// Local Imports
import { errorStyle } from "../../utils/Styles";
import Story from "../../features/Stories/Story";
import useMutationFunc from "../../hooks/useMutation";
import { setViewProfileEditBox } from "./profileSlice";
import {
  authenticateUser,
  updateProfileDetails,
} from "../../services/FormSubmitAPI";
import { setUserDetails } from "../Authentication/userSlice";

const inputElementStyles =
  "h-14 w-full rounded-xl bg-sky-100 px-4 text-[1.5rem] font-medium outline-none focus:ring focus:ring-sky-500 disabled:cursor-not-allowed disabled:text-gray-500";

// Form element to upload the image
function UploadProfilePictureInputElement({ register }) {
  return (
    <div className="border-black">
      <label
        className="block text-[1.5rem] font-medium text-black underline hover:cursor-pointer"
        htmlFor="profileUpload"
      >
        Change Profile Picture
      </label>
      <input
        type="file"
        name="profileUpload"
        id="profileUpload"
        className="hidden"
        accept="image/*"
        // onChange={onImageChange}
        {...register("profileUpload")}
      />
    </div>
  );
}

// Re-usable input element
function InputItem({
  label,
  type,
  span,
  disable,
  value,
  register,
  name,
  errors,
}) {
  return (
    <div className={`flex flex-col gap-1 ${span ? "col-span-2" : ""}`}>
      <label className="text-[1.6rem] font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name="name"
        value={value}
        disabled={disable}
        className={`${inputElementStyles} ${errors?.username && errorStyle}`}
        placeholder={
          errors?.username?.message ? "!" + errors?.username?.message : label
        }
        {...(register && label
          ? register(
              name,
              { required: "Username cannot be empty" },
              {
                pattern: {
                  value: /^[a-zA-Z0-9._@]+$/,
                  message: "Only letters, numbers, ., _, and @ are allowed",
                },
              },
            )
          : {})}
      />
    </div>
  );
}

function ProfileEditForm() {
  // Using Hooks
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProfileRemoved, setIsProfileRemoved] = useState(false);
  let { firstName, lastName, username, email, bio, profilePicture } =
    useSelector((state) => state.user.userDetails || {});

  // Using React-Hook Form
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username,
      bio,
    },
  });
  const watchedFile = watch("profileUpload");

  // Using the mutation function
  const [mutate, isPending, isSuccess] = useMutationFunc(
    updateProfileDetails,
    "Profile Update Successfully",
    "Unable to update profile",
  );

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("bio", data.bio);
    formData.append("username", data.username);
    if (isProfileRemoved) {
      formData.append("removeProfile", true);
    } else if (data.profileUpload?.[0]) {
      formData.append("profileUpload", data.profileUpload[0]);
    }
    mutate(formData);
  }

  function handleRemoveProfilePicture() {
    setSelectedImage("/DEFAULT_PROFILE.webp");
    setIsProfileRemoved(true);
  }

  useEffect(() => {
    async function updateUserStore() {
      try {
        queryClient.invalidateQueries(["profileDetails"]);
        dispatch(setViewProfileEditBox());
        const data = await authenticateUser(); // ✅ Wait for API response
        dispatch(setUserDetails(data.user));
      } catch (error) {
        console.error("Failed to refresh userDetails in store:", error.message);
      }
    }

    if (isSuccess) {
      updateUserStore();
    }
  }, [isSuccess, dispatch, queryClient]);

  useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      const file = watchedFile[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      // Revoke previous object URL on cleanup
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [watchedFile]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <div className="grid grid-cols-2 gap-4 px-5 py-2 pb-3">
        <div className="col-span-2 flex flex-col items-center gap-3">
          <Story profilePicture={selectedImage || profilePicture} />
          <div className="flex items-center gap-2">
            {profilePicture && (
              <>
                <p
                  className="text-[1.5rem] font-medium text-red-600 underline hover:cursor-pointer"
                  onClick={handleRemoveProfilePicture}
                >
                  Remove Profile Picture
                </p>
                <span>|</span>
              </>
            )}
            <UploadProfilePictureInputElement register={register} />
          </div>
        </div>
        <InputItem
          label={"First Name"}
          name={"firstName"}
          type={"text"}
          disable={true}
          value={firstName}
        />
        <InputItem
          label={"Last Name"}
          name={"lastName"}
          type={"text"}
          disable={true}
          value={lastName}
        />
        <InputItem
          label={"Username"}
          name={"username"}
          type={"text"}
          span={true}
          errors={errors}
          register={register}
        />
        <InputItem
          label={"Email Address"}
          type={"email"}
          name={"email"}
          span={true}
          disable={true}
          value={email}
        />
        <div className="col-span-2 flex flex-col gap-2">
          <label
            className="text-[1.6rem] font-medium text-gray-700"
            htmlFor="bio"
          >
            Bio
          </label>
          <textarea
            id="bio"
            defaultValue={bio}
            className="resize-none rounded-xl bg-sky-100 px-4 text-[1.5rem] font-medium outline-none focus:ring focus:ring-sky-500"
            rows={5}
            {...register("bio")}
          />
        </div>
        <button
          disabled={isPending}
          className="col-span-2 rounded-xl bg-sky-400 py-3 text-[1.5rem] font-medium outline-none ring-offset-2 transition-all duration-300 hover:bg-sky-500 focus:ring focus:ring-sky-500 disabled:hover:cursor-not-allowed"
        >
          {isPending ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
}

export default ProfileEditForm;
