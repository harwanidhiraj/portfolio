import { Typewriter } from "react-simple-typewriter";
import { useGetUserHomeQuery } from "../redux/api/portfolioApi";
import About from "./About";
import Contact from "./Contact";
import Projects from "./Projects";
import GoToTop from "../components/GoToTop";

const Home = () => {
  const { data, isLoading, isError } = useGetUserHomeQuery();

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </section>
    );
  }

  if (isError || !data?.data) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Failed to load data.</p>
      </section>
    );
  }

  const { name, roles, description, resumeUrl, imageUrl } = data.data;

  // Convert roles string to array of keywords
  const roleKeywords = roles.split(",").map((role) => role.trim());

  return (
    <>
      <section className="bg-gray-50 min-h-screen w-full overflow-hidden flex items-center justify-center px-4">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
              Hi, I'm <span className="text-indigo-600">{name}</span>
            </h1>

            <h2 className="text-xl text-gray-600 mb-6">
              I’m a{" "}
              <span className="text-indigo-600 font-semibold">
                <Typewriter
                  words={roleKeywords}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h2>

            <p className="text-md text-gray-700 mb-6">{description}</p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Get in Touch
              </a>
              <a
                href={resumeUrl}
                download
                className="inline-block border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover shadow-xl border-4 border-indigo-100"
            />
          </div>
        </div>
      </section>
      <About />
      <Projects />
      <Contact />
      <GoToTop />
    </>
  );
};

export default Home;
