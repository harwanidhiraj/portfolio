import { useState, createElement } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal";
import * as SiIcons from "react-icons/si";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetAdminSkillsQuery,
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "../../redux/api/portfolioApi";

type Skill = {
  id: number;
  name: string;
  iconName: string;
};

const SkillsManager = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredIcons, setFilteredIcons] = useState<string[]>([]);

  const { data, isLoading } = useGetAdminSkillsQuery();
  const [addSkill, { isLoading: adding }] = useAddSkillMutation();
  const [updateSkill, { isLoading: updating }] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      icon: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Skill name is required"),
      icon: Yup.string().required("Icon is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editId) {
          await updateSkill({
            id: editId,
            name: values.name,
            iconName: values.icon,
          }).unwrap();
          toast.success("Skill updated");
        } else {
          await addSkill({ name: values.name, iconName: values.icon }).unwrap();
          toast.success("Skill added");
        }

        resetForm();
        setEditId(null);
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to save skill");
      }
    },
  });

  const handleEdit = (skill: Skill) => {
    formik.setValues({ name: skill.name, icon: skill.iconName });
    setEditId(skill.id);
  };

  const promptDelete = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteSkill(deleteId).unwrap();
        toast.success("Skill deleted");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete skill");
      } finally {
        setShowModal(false);
        setDeleteId(null);
      }
    }
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (SiIcons as any)[iconName];
    return Icon ? <Icon className="text-2xl text-indigo-600" /> : null;
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border mt-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        Manage Skills
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Skill Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Skill Icon
          </label>
          <input
            type="text"
            name="icon"
            placeholder="Icon Class (e.g. SiJavascript)"
            value={formik.values.icon}
            onChange={(e) => {
              const value = e.target.value;
              formik.setFieldValue("icon", value);

              if (value.length > 1) {
                const matches = Object.keys(SiIcons).filter((key) =>
                  key.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredIcons(matches.slice(0, 10));
                setShowSuggestions(true);
              } else {
                setShowSuggestions(false);
              }
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => {
              if (formik.values.icon.length > 1) setShowSuggestions(true);
            }}
            className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {formik.touched.icon && formik.errors.icon && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.icon}</p>
          )}

          {showSuggestions && (
            <div className="absolute z-10 bg-white border rounded-md shadow max-h-48 overflow-auto mt-1 w-full">
              {filteredIcons.map((iconKey) => (
                <div
                  key={iconKey}
                  onClick={() => {
                    formik.setFieldValue("icon", iconKey);
                    setShowSuggestions(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {(SiIcons as any)[iconKey] && (
                    <span className="text-xl text-indigo-600">
                      {createElement((SiIcons as any)[iconKey])}
                    </span>
                  )}
                  <span className="text-sm text-gray-700">{iconKey}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={adding || updating}
          className="md:col-span-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {adding || updating
            ? "Saving..."
            : editId
            ? "Update Skill"
            : "Add Skill"}
        </button>
      </form>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading skills...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.data?.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="text-indigo-600">
                  {getIconComponent(skill.iconName)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{skill.name}</p>
                  <p className="text-xs text-gray-500">{skill.iconName}</p>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => promptDelete(skill.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={showModal}
        title="Delete Skill"
        message="Are you sure you want to delete this skill?"
        confirmText="Delete"
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default SkillsManager;
