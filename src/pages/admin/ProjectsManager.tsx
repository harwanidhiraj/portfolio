import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useGetAdminProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../redux/api/portfolioApi";
import ConfirmModal from "../../components/ConfirmModal";
// Adjust path

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  tech: Yup.string().required("Tech stack is required"),
  image: Yup.mixed().required("Image is required"),
});

const ProjectsManager = () => {
  const { data, isLoading } = useGetAdminProjectsQuery();
  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: undefined as File | undefined,
      tech: "",
      github: "",
      demo: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("tech", values.tech);
      if (values.github) formData.append("gitHubUrl", values.github);
      if (values.demo) formData.append("liveUrl", values.demo);
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      try {
        if (editId) {
          // ✅ Corrected line
          await updateProject({ id: editId, formData }).unwrap();
          toast.success("Project updated");
        } else {
          await addProject(formData).unwrap();
          toast.success("Project added");
        }
        resetForm();
        setEditId(null);
        setPreviewImage("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    },
  });

  const handleEdit = (project: any) => {
    formik.setFieldValue("title", project.title || "");
    formik.setFieldValue("description", project.description || "");
    formik.setFieldValue("tech", project.tech || "");
    formik.setFieldValue("github", project.gitHubUrl || "");
    formik.setFieldValue("demo", project.liveUrl || "");
    formik.setFieldValue("image", undefined); // or null

    setEditId(project.id);
    setPreviewImage(project.imageUrl);
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteProject(deleteId).unwrap();
      toast.success("Project deleted");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete");
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const projects = data?.data || [];

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border mt-6">
      <h2 className="text-4xl font-bold text-indigo-700 text-center mb-10">
        Manage Projects
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
      >
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Project Title
          </label>
          <input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Project Title"
            className="border px-4 py-2 rounded-md"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            GitHub URL
          </label>
          <input
            name="github"
            value={formik.values.github}
            onChange={formik.handleChange}
            placeholder="GitHub URL"
            className="border px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Live Demo URL
          </label>
          <input
            name="demo"
            value={formik.values.demo}
            onChange={formik.handleChange}
            placeholder="Live Demo URL"
            className="border px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="border px-4 py-2 rounded-md"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
          )}
        </div>

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md border md:col-span-2"
          />
        )}

        <div className="flex flex-col md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tech Stack
          </label>
          <input
            name="tech"
            value={formik.values.tech}
            onChange={formik.handleChange}
            placeholder="Tech Stack (comma separated)"
            className="border px-4 py-2 rounded-md"
          />
          {formik.touched.tech && formik.errors.tech && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.tech}</p>
          )}
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Project Description
          </label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Project Description"
            rows={3}
            className="border px-4 py-2 rounded-md"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 md:col-span-2 transition font-semibold"
        >
          {editId ? "Update Project" : "Add Project"}
        </button>
      </form>

      <div className="grid gap-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="flex flex-col md:flex-row items-start gap-6 border p-4 rounded-xl shadow-sm bg-gray-50"
            >
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full md:w-40 object-cover rounded-md"
              />
              <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{p.title}</h3>
                  <div className="space-x-2 text-sm">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(p.id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{p.description}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {p.tech.split(",").map((t, i) => (
                    <span
                      key={i}
                      className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-3 text-sm">
                  {p.gitHubUrl && (
                    <a
                      href={p.gitHubUrl}
                      target="_blank"
                      className="text-indigo-600 hover:underline"
                      rel="noopener noreferrer"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      className="text-green-600 hover:underline"
                      rel="noopener noreferrer"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
};

export default ProjectsManager;
