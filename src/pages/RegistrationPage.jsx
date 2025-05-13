import PostMethod from "../components/methods/PostMethod";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dataObject = Object.fromEntries(formData.entries());
    await PostMethod(
      "users/",
      {
        email: dataObject.email,
        first_name: dataObject.firstName,
        last_name: dataObject.lastName,
        password: dataObject.password,
      },
      true
    );

    navigate("/registration-successful");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Register
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-200"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
