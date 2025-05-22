import TaskList from "./ListComponents/TaskList";
import PostMethod from "./methods/PostMethod";
import { useEffect } from "react";
import { useState } from "react";
import api from "./methods/RefreshMethod";
import deleteItem from "./methods/DeleteMethod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentProject } from "../stores/projectSlice";

const AddTask = ({ currentProject }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const limit = 7;

  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState(0);

  const [listData, setListData] = useState({});
  const [endpoint, setEndpoint] = useState(`tasks/?limit=${limit}&offset=0`);

  async function handleProjectDeleteClick(projectId) {
    await deleteItem(`projects/${projectId}/`);
    dispatch(setCurrentProject(null));
    navigate("/projects");
  }

  useEffect(() => {
    if (!currentProject) return;
    const url = new URL(endpoint, api.defaults.baseURL);
    url.searchParams.set("project", currentProject.id);
    api
      .get(url.toString())
      .then((response) => {
        setTasks(response.data["results"]);
        setListData(response.data);
      })
      .catch((error) => console.error(error));
  }, [taskStatus, currentProject, endpoint]);

  useEffect(() => {
    if (!currentProject) return;
    api
      .get(`projects/${currentProject.id}/`)
      .then((response) => setCurrentProject(response.data))
      .catch((error) => console.error(error));
  }, [currentProject]);

  const submitTask = async (event) => {
    event.preventDefault();

    const title = event.target.elements.title.value;
    await PostMethod("tasks/", {
      name: title,
      project: currentProject.id,
    });

    event.target.reset();
    setTaskStatus((taskStatus) => taskStatus + 1);
  };

  const capitalizeTitle = (title) => {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  if (currentProject) {
    return (
      <div className="space-y-6">
        <div>
          <div className="w-[90%] mx-auto space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-bold text-stone-700">
                {capitalizeTitle(currentProject.name)}
              </h2>
              <button
                onClick={() => handleProjectDeleteClick(currentProject.id)}
              >
                Delete
              </button>
            </div>
            <p className="text-stone-400">
              {formatDate(currentProject.due_date)}
            </p>
            <p>{currentProject.description}</p>
          </div>
        </div>
        <div className="h-1 bg-stone-200 w-[90%] mx-auto"></div>
        <form className="w-[90%] mx-auto" onSubmit={submitTask}>
          <div className="space-y-3">
            <label
              htmlFor="title"
              className="block text-gray-700 text-2xl font-bold"
            >
              Tasks
            </label>
            <div className="flex space-x-2">
              <input
                id="title"
                type="text"
                name="title"
                required
                className="w-80 px-4 py-2 bg-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              ></input>
              <button className="px-4" type="submit">
                Add Task
              </button>
            </div>
          </div>
        </form>
        <TaskList
          listData={listData}
          setEndpoint={setEndpoint}
          tasks={tasks}
          taskStatus={taskStatus}
          setTaskStatus={setTaskStatus}
          limit={limit}
        />
      </div>
    );
  }
};

export default AddTask;
