import PostMethod from "./methods/PostMethod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "../stores/projectSlice";

const AddProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dataObject = Object.fromEntries(formData.entries());
    const newProject = await PostMethod("projects/", {
      name: dataObject.title,
      description: dataObject.description,
      due_date: dataObject.date,
    });

    dispatch(setCurrentProject(newProject));
    navigate(`/projects/${newProject.id}`);
  };

  const handleReset = () => {
    navigate("/projects");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-10 rounded-lg bg-gray-100 w-full"
    >
      <div className="mb-4 flex justify-end">
        <button
          id="discard-button"
          type="reset"
          className="w-28 bg-gray-100 text-black px-4 py-2 rounded-md"
          onClick={handleReset}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-28 bg-stone-900 text-white px-4 py-2 rounded-md hover:bg-stone-700 transition duration-300"
        >
          Save
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-stone-500 font-bold mb-2">
          TITLE
        </label>
        <input
          id="title"
          type="text"
          name="title"
          className="w-full px-4 py-2 bg-stone-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
          required
        ></input>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-stone-500 font-bold mb-2"
        >
          DESCRIPTION
        </label>
        <textarea
          id="description"
          type="text"
          name="description"
          className="w-full px-4 py-2 bg-stone-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-stone-500 font-bold mb-2">
          DUE DATE
        </label>
        <input
          id="date"
          type="date"
          name="date"
          required
          className="w-full px-4 py-2 bg-stone-200 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
        ></input>
      </div>
    </form>
  );
};

export default AddProject;
