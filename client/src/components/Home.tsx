import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <main>
          <h1 className="text-green-500 font-semibold text-2xl text-center mb-16">
            Frontend SpotiSearch home
          </h1>
          <div className="p-2 rounded-lg bg-gray-700 bg-opacity-50 h-64">
            <h3 className="text-white font-semibold text-lg text-center">
              About this project
            </h3>
            <p className="text-white mt-6">
              This proyect allows you to search any artist and get his albums
              using the Spotify API
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Link
              to={"/search"}
              className="bg-green-600 p-2 rounded-lg text-white font-medium"
            >
              Start searching
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
