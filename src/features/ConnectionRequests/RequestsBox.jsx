// Library Imports
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";

// Local Imports
import useQueryFn from "../../hooks/useQuery";
import RequestDetails from "./RequestDetails";
import { closeRequestsBox } from "./requestSlice";
import NoPendingRequests from "./NoPendingRequests";
import DualRingLoader from "../../spinners/DualRingLoader";
import { getFriendRequests } from "../../services/FormSubmitAPI";

function RequestsBox() {
  const dispatch = useDispatch();
  const { data: connRequests, isPending } = useQueryFn(
    ["pendingRequests"],
    getFriendRequests,
  );

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="flex h-[50rem] w-[36rem] flex-col rounded-3xl bg-sky-200 shadow-md shadow-slate-400 backdrop:blur-md sm:w-[45rem]">
        <div className="border-b-2 border-slate-300 px-5">
          <ImCross
            size={14}
            className="absolute mt-4 text-slate-600 hover:cursor-pointer"
            onClick={() => dispatch(closeRequestsBox())}
          />
          <h1 className="py-2 text-center text-[1.8rem] font-semibold text-slate-700">
            Connection Requests
          </h1>
        </div>
        <div className="h-full space-y-4 overflow-auto px-6 py-4 pb-4">
          {isPending && (
            <div className="flex h-full items-center justify-center">
              <DualRingLoader />
            </div>
          )}
          {connRequests?.length == 0 ? (
            <NoPendingRequests />
          ) : (
            ""
          )}
          {connRequests?.map((request) => (
            <RequestDetails
              docId={request._id}
              key={request.requester._id}
              userId={request.requester._id}
              username={request.requester.username}
              profilePicture={request.requester.profilePicture}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RequestsBox;
