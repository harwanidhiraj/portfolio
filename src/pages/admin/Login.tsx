import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useLoginAdminMutation } from "../../redux/api/portfolioApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [loginAdmin, { isLoading }] = useLoginAdminMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await loginAdmin(values).unwrap();

        if (res.success) {
          localStorage.setItem("admin_token", res.meta.token);
          toast.success(res.message || "Login successful!");
          navigate("/admin/profile");
        } else {
          toast.error(res.message || "Login failed");
        }
      } catch (err: any) {
        if (err?.data?.message) {
          toast.error(err.data.message);
        } else if (err?.data?.errorDetails?.length) {
          toast.error(err.data.errorDetails[0].message);
        } else {
          toast.error("Something went wrong!");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6 animate-fade-in"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700">
          Admin Login
        </h2>

        <div>
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-gray-400" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg transition focus:outline-none focus:ring-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <div className="relative flex items-center">
            <FaLock className="absolute left-3 text-gray-400" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg transition focus:outline-none focus:ring-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || formik.isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
