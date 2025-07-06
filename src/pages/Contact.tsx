// import { useState } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     from_name: "",
//     from_email: "",
//     message: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <section className="bg-white py-20 px-4">
//       <div
//         className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
//         data-aos="fade-up"
//       >
//         <div className="bg-white p-8 rounded-2xl shadow-xl ring-1 ring-gray-100">
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
//             Contact Me
//           </h2>
//           <p className="text-gray-600 mb-8">
//             Have a question or want to work together? I’d love to hear from you!
//           </p>

//           <form className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Your Name
//               </label>
//               <input
//                 type="text"
//                 name="from_name"
//                 value={formData.from_name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//                 placeholder="John Doe"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="from_email"
//                 value={formData.from_email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Message
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 rows={5}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//                 placeholder="Write your message here..."
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 rounded-lg transition-shadow shadow-md hover:shadow-xl"
//             >
//               ✉️ Send Message
//             </button>
//           </form>
//         </div>

//         <div className="flex flex-col justify-center px-6">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//             Get in Touch
//           </h3>
//           <ul className="space-y-4 text-lg text-gray-600">
//             <li>
//               <strong>Address:</strong>
//               <br />
//               Rajkot, Gujarat.
//             </li>
//             <li>
//               <strong>Email:</strong>
//               <br />
//               <a
//                 href="mailto:harwanidhiraj23@gmail.com"
//                 className="text-indigo-600 hover:underline"
//               >
//                 harwanidhiraj23@gmail.com
//               </a>
//             </li>
//             <li>
//               <strong>Phone:</strong>
//               <br />
//               <a
//                 href="tel:+8849892389"
//                 className="text-indigo-600 hover:underline"
//               >
//                 8849892389
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </section>
//   );
// };

// export default Contact;

import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetUserInTouchQuery,
  useSendUserMessageMutation,
} from "../redux/api/portfolioApi";

const validationSchema = Yup.object({
  from_name: Yup.string().required("Name is required"),
  from_email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const Contact = () => {
  const {
    data: contactData,
    isLoading: isContactLoading,
    isError: isContactError,
  } = useGetUserInTouchQuery();

  const [sendUserMessage, { isLoading: isSending }] =
    useSendUserMessageMutation();

  const formik = useFormik({
    initialValues: {
      from_name: "",
      from_email: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await sendUserMessage({
          name: values.from_name,
          email: values.from_email,
          message: values.message,
        }).unwrap();
        toast.success("Message sent successfully!");
        resetForm();
      } catch {
        toast.error("Failed to send message.");
      }
    },
  });

  const contact = contactData?.data;

  return (
    <section className="bg-white py-20 px-4">
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        data-aos="fade-up"
      >
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl ring-1 ring-gray-100">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Contact Me
          </h2>
          <p className="text-gray-600 mb-8">
            Have a question or want to work together? I’d love to hear from you!
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="from_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.from_name}
                className={`w-full px-4 py-3 border ${
                  formik.touched.from_name && formik.errors.from_name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                placeholder="John Doe"
              />
              {formik.touched.from_name && formik.errors.from_name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.from_name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="from_email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.from_email}
                className={`w-full px-4 py-3 border ${
                  formik.touched.from_email && formik.errors.from_email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                placeholder="you@example.com"
              />
              {formik.touched.from_email && formik.errors.from_email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.from_email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className={`w-full px-4 py-3 border ${
                  formik.touched.message && formik.errors.message
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                placeholder="Write your message here..."
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 rounded-lg transition-shadow shadow-md hover:shadow-xl disabled:opacity-50"
            >
              {isSending ? "Sending..." : "✉️ Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center px-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h3>

          {isContactLoading ? (
            <p className="text-gray-500">Loading contact info...</p>
          ) : isContactError || !contact ? (
            <p className="text-red-500">Failed to load contact info.</p>
          ) : (
            <ul className="space-y-4 text-lg text-gray-600">
              <li>
                <strong>Address:</strong>
                <br />
                {contact.address}
              </li>
              <li>
                <strong>Email:</strong>
                <br />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-indigo-600 hover:underline"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <strong>Phone:</strong>
                <br />
                <a
                  href={`tel:${contact.phone}`}
                  className="text-indigo-600 hover:underline"
                >
                  {contact.phone}
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default Contact;
