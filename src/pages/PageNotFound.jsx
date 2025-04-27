import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <p>This is a 404 page. The page you are looking for does not exist.</p>
      <p>
        Click{" "}
        <Link
          to="/"
          className="text-3xl font-bold hover:cursor-pointer hover:text-red-700"
        >
          Go to Home
        </Link>{" "}
        to go back to the home page.
      </p>
    </div>
  );
}

export default PageNotFound;
