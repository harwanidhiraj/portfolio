import { useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";
import {
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "../../redux/api/portfolioApi";

const MarkdownField = ({ name }: { name: string }) => {
  const { values, setFieldValue, touched, errors, setFieldTouched } =
    useFormikContext<any>();

  return (
    <div data-color-mode="light">
      <MDEditor
        value={values[name]}
        onChange={(val) => setFieldValue(name, val)}
        onBlur={() => setFieldTouched(name, true)}
        height={300}
        preview="edit"
      />
      {touched[name] && typeof errors[name] === "string" && (
        <p className="text-red-600 text-sm mt-2">{errors[name]}</p>
      )}
    </div>
  );
};

const AboutManager = () => {
  const initialValues = {
    description: "",
  };

  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required"),
  });

  const { data, isLoading, isError, error } = useGetAboutQuery();
  const [updateAbout, { isLoading: isUpdating }] = useUpdateAboutMutation();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const res = await updateAbout({
        description: values.description,
      }).unwrap();
      toast.success(res.message || "About updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update About");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border mt-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        Manage About Section
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue }) => {
          useEffect(() => {
            if (data?.success) {
              setFieldValue("description", data.data.description || "");
            }

            if (isError && error && "data" in error) {
              const err: any = error;
              toast.error(
                err?.data?.message || "Failed to fetch About content."
              );
            }
          }, [data, isError, error, setFieldValue]);

          return (
            <Form className="space-y-6">
              {isLoading ? (
                <p className="text-indigo-600 text-center">
                  Loading content...
                </p>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description (Markdown)
                    </label>
                    <MarkdownField name="description" />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ${
                      isUpdating ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AboutManager;
