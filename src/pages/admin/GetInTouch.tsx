import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useGetAdminGetInTouchQuery,
  useUpdateAdminGetInTouchMutation,
} from "../../redux/api/portfolioApi";

interface ContactValues {
  address: string;
  email: string;
  contactNumber: string;
}

const GetInTouch = () => {
  const { data, isLoading } = useGetAdminGetInTouchQuery();
  const [updateGetInTouch, { isLoading: updating }] =
    useUpdateAdminGetInTouchMutation();

  const formik = useFormik<ContactValues>({
    initialValues: {
      address: "",
      email: "",
      contactNumber: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Address is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      contactNumber: Yup.string()
        .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
        .required("Contact number is required"),
    }),

    onSubmit: async (values) => {
      try {
        await updateGetInTouch({
          address: values.address,
          email: values.email,
          phone: values.contactNumber,
        }).unwrap();

        toast.success("Contact details updated successfully!");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to update contact info");
      }
    },
  });

  useEffect(() => {
    if (data?.data) {
      formik.setValues({
        address: data.data.address,
        email: data.data.email,
        contactNumber: data.data.phone,
      });
    }
  }, [data]);

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border mt-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        Get in Touch
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading contact info...</p>
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <input
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.address}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter contact number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {formik.touched.contactNumber && formik.errors.contactNumber && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.contactNumber}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-60"
          >
            {updating ? "Saving..." : "Save Contact Info"}
          </button>
        </form>
      )}
    </div>
  );
};

export default GetInTouch;
