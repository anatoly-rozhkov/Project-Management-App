import Register from "./Register";
import RegistrationSuccessful from "./RegistrationSuccessful";
import PostMethod from "../methods/PostMethod";

const Login = ({ editorState, setEditorState }) => {
  const handleLoginClick = () => {
    setEditorState("welcomeState");
  };

  const handleRegisterClick = () => {
    setEditorState("registerState");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dataObject = Object.fromEntries(formData.entries());
    const tokens = await PostMethod("auth/obtain/", {
      email: dataObject.email,
      password: dataObject.password,
    });

    localStorage.setItem("accessToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);

    setEditorState("startingState");
  };

  return (
    <div>
      {editorState === "welcomeState" ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleRegisterClick}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      ) : editorState === "registerState" ? (
        <Register setEditorState={setEditorState} />
      ) : editorState === "registrationSuccessState" ? (
        <RegistrationSuccessful handleLoginClick={handleLoginClick} />
      ) : null}
    </div>
  );
};
export default Login;
