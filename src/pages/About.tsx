import { useGetUserAboutQuery } from "../redux/api/portfolioApi";
import * as SiIcons from "react-icons/si";

const About = () => {
  const { data, isLoading, isError } = useGetUserAboutQuery();
  const getIconComponent = (iconName: string) => {
    const Icon = (SiIcons as any)[iconName];
    return Icon ? <Icon className="text-2xl text-indigo-600" /> : null;
  };
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

  const { about, skills, experiences } = data.data;

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl font-extrabold text-center text-gray-800 mb-14"
          data-aos="fade-up"
        >
          About
        </h2>

        <p
          className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto"
          data-aos="fade-up"
        >
          {about.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div data-aos="fade-right">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-indigo-50 px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition"
                >
                  {getIconComponent(skill.iconName)}
                  <span className="text-gray-800 font-medium">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div data-aos="fade-left">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              Experience
            </h3>
            <div className="space-y-6 border-l-2 border-indigo-200 pl-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute w-4 h-4 bg-indigo-600 rounded-full left-[-33px] top-2" />
                  <h4 className="text-lg font-semibold text-indigo-700">
                    {exp.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {exp.companyName} • {exp.duration}
                  </span>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
