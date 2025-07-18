import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/portfolioApi";

interface FormValues {
  name: string;
  rolesInput: string;
  about: string;
  profileImage: File | null;
  resumeFile: File | null;
}

const ProfileManager = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      rolesInput: "",
      about: "",
      profileImage: null,
      resumeFile: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      rolesInput: Yup.string().required("At least one role is required"),
      about: Yup.string().required("About section is required"),
      profileImage: Yup.mixed()
        .required("Profile image is required")
        .test("fileType", "Unsupported file type", (value) =>
          value
            ? ["image/jpeg", "image/png", "image/jpg"].includes(
                (value as File).type
              )
            : false
        ),
      resumeFile: Yup.mixed()
        .required("Resume is required")
        .test("fileType", "Only PDF allowed", (value) =>
          value ? (value as File).type === "application/pdf" : false
        ),
    }),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (!values.profileImage || !values.resumeFile) {
        toast.error("Please select both image and resume before submitting.");
        return;
      }

      try {
        const payload = {
          name: values.name,
          roles: values.rolesInput,
          description: values.about,
          resume: values.resumeFile,
          image: values.profileImage,
        };

        const response = await updateProfile(payload).unwrap();
        toast.success(response.message || "Profile updated successfully!");

        resetForm({
          values: {
            ...values,
            profileImage: null,
            resumeFile: null,
          },
        });

        setImagePreview(null);
        setResumeName(null);
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to update profile.");
        console.error("API error:", err?.data);
      }
    },
  });

  useEffect(() => {
    if (data?.success) {
      formik.setValues({
        name: data.data.name || "",
        rolesInput: data.data.roles || "",
        about: data.data.description || "",
        profileImage: null,
        resumeFile: null,
      });

      setImagePreview(data.data.imageUrl || null);
      setResumeName(data.data.resumeUrl?.split("/").pop() || null);
    }

    if (isError && error && "data" in error) {
      const errData: any = error;
      toast.error(errData?.data?.message || "Failed to load profile.");
    }
  }, [data, isError]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("profileImage", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("resumeFile", file);
      setResumeName(file.name);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border mt-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        Admin Profile Settings
      </h2>

      {isLoading ? (
        <p className="text-center text-indigo-600">Loading profile...</p>
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Roles (comma-separated)
            </label>
            <input
              type="text"
              name="rolesInput"
              value={formik.values.rolesInput}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.rolesInput && formik.errors.rolesInput && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.rolesInput}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {formik.values.rolesInput.split(",").map((role, index) => (
                <span
                  key={index}
                  className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full"
                >
                  {role.trim()}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              About
            </label>
            <textarea
              name="about"
              rows={5}
              value={formik.values.about}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
            {formik.touched.about && formik.errors.about && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.about}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              key={formik.values.profileImage?.name || "profileImage"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
            {formik.touched.profileImage && formik.errors.profileImage && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.profileImage}
              </p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 mt-2 rounded-full object-cover border shadow"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Resume (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeChange}
              key={formik.values.resumeFile?.name || "resumeFile"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
            {formik.touched.resumeFile && formik.errors.resumeFile && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.resumeFile}
              </p>
            )}
            {resumeName && (
              <p className="text-green-700 text-sm mt-2">
                Selected: {resumeName}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileManager;
