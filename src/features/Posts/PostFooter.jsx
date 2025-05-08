import { FaRegHeart } from "react-icons/fa6";
import { BiCollection } from "react-icons/bi";
import { TbLocationShare } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";

function SpanElement({ children, handleClick }) {
  return (
    <span className="hover:cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
}

function PostFooter({ handleOpenCommentBox }) {
  return (
    <div className="flex justify-between pb-3">
      <div className="flex items-center gap-8">
        <SpanElement>
          <FaRegHeart size={24} />
        </SpanElement>
        <SpanElement handleClick={handleOpenCommentBox}>
          <FaRegCommentAlt size={21} />
        </SpanElement>
        <SpanElement>
          <TbLocationShare size={24} />
        </SpanElement>
      </div>
      <div>
        <SpanElement>
          <BiCollection size={24} />
        </SpanElement>
      </div>
    </div>
  );
}

export default PostFooter;
