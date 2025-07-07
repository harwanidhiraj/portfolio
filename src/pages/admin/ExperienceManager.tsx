import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useGetAdminExperiencesQuery,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} from "../../redux/api/portfolioApi";
import ConfirmModal from "../../components/ConfirmModal";

type Experience = {
  id: number;
  title: string;
  companyName: string;
  duration: string;
  description: string;
};

const ExperienceSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  companyName: Yup.string().required("Company is required"),
  duration: Yup.string().required("Duration is required"),
  description: Yup.string().required("Details are required"),
});

const ExperienceManager = () => {
  const [editItem, setEditItem] = useState<Experience | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, error } = useGetAdminExperiencesQuery();
  const [addExperience] = useAddExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const experiences = data?.data || [];

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteExperience(deleteId).unwrap();
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (
    values: Omit<Experience, "id">,
    resetForm: () => void
  ) => {
    try {
      if (editItem?.id) {
        await updateExperience({ id: editItem.id, body: values }).unwrap();
        toast.success("Experience updated");
      } else {
        await addExperience(values).unwrap();
        toast.success("Experience added");
      }
      resetForm();
      setEditItem(null);
    } catch {
      toast.error("Failed to save experience");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border mt-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        Manage Experience
      </h2>

      <Formik
        initialValues={{
          title: editItem?.title || "",
          companyName: editItem?.companyName || "",
          duration: editItem?.duration || "",
          description: editItem?.description || "",
        }}
        enableReinitialize
        validationSchema={ExperienceSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Job Title
            </label>
            <Field
              name="title"
              placeholder="Job Title"
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Company
            </label>
            <Field
              name="companyName"
              placeholder="Company"
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <ErrorMessage
              name="companyName"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Duration
            </label>
            <Field
              name="duration"
              placeholder="Duration (e.g., Jan 2020 - Dec 2021)"
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <ErrorMessage
              name="duration"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Details
            </label>
            <Field
              as="textarea"
              name="description"
              rows={4}
              placeholder="Work Summary / Achievements"
              className="border px-4 py-2 rounded-md w-full resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {editItem ? "Update Experience" : "Add Experience"}
          </button>
        </Form>
      </Formik>

      <div className="space-y-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">Failed to load experiences.</p>
        ) : (
          experiences.map((item) => (
            <div
              key={item.id}
              className="border p-5 rounded-xl bg-gray-50 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-indigo-600">
                      {item.companyName}
                    </span>{" "}
                    &middot; <span>{item.duration}</span>
                  </p>
                  <p className="mt-2 text-gray-700 text-sm whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setEditItem(item)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(item.id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Experience"
        message="Are you sure you want to delete this experience entry? This action cannot be undone."
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

export default ExperienceManager;
