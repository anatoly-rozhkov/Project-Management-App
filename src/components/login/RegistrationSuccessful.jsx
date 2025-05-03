const RegistrationSuccessful = ({ handleLoginClick }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-green-100 border border-green-300 rounded-lg text-green-800 shadow-md text-center space-y-4">
        <p>You have successfully registered!</p>
        <button
          onClick={handleLoginClick}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccessful;
