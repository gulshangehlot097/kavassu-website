"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RichTextEditor from "../../components/addproducts/contenteditor";
import { callApiWithFile } from "../../api";
import constant from "../../env";
import { showSuccess, showError } from "../../components/toaster";

export default function AddProductPage() {
  return <AddProductForm />;
}

function AddProductForm() {
  const router = useRouter();
  const imageRef = useRef(null);
  const [categories, setCategories] = useState([
    "Admixtures",
    "Curing Compounds",
    "Joint Sealants",
    "Waterproofing Membrane",
    "Epoxy Grouts",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [technicalData, setTechnicalData] = useState([{ key: "", value: "" }]);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 300;

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    shortdes: "",
    content: "",
  });

  // ---------- Handlers ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (name === "shortdes") setCharCount(value.length);
  };

  const addCategory = () => {
    const v = newCategory.trim();
    if (!v) return alert("Enter a category name");
    if (categories.some((c) => c.toLowerCase() === v.toLowerCase())) {
      alert("Category already exists");
      return;
    }
    setCategories([...categories, v]);
    setFormData((p) => ({ ...p, category: v }));
    setNewCategory("");
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("PDF must be ≤10MB");
      return;
    }
    setPdfFile(file);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter(
      (f) => f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024
    );
    if (valid.length > 2) {
      alert("You can upload maximum 2 images");
      return;
    }
    setImages(valid);
    setPreviewUrls(valid.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (index) => {
    setImages((p) => p.filter((_, i) => i !== index));
    setPreviewUrls((p) => p.filter((_, i) => i !== index));
  };

  const removePdf = () => setPdfFile(null);

  const addTechnicalRow = () =>
    setTechnicalData((p) => [...p, { key: "", value: "" }]);
  const removeTechnicalRow = (i) =>
    setTechnicalData((p) => p.filter((_, x) => x !== i));
  const updateTechnicalRow = (i, field, val) => {
    setTechnicalData((prev) =>
      prev.map((row, index) => {
        if (index !== i) return row;
        // When user types in key, rebuild the object structure
        if (field === "key") {
          const newKey = val;
          const currentValue = Object.values(row)[0] || "";
          return newKey ? { [newKey]: currentValue } : row;
        }
        // When user types in value, update the current key’s value
        const currentKey = Object.keys(row)[0] || "";
        return currentKey ? { [currentKey]: val } : row;
      })
    );
  };

  // ---------- API SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.category) {
      showError("Please fill all required fields");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("category", formData.category);
      fd.append("shortdes", formData.shortdes || "");
      fd.append("content", formData.content || "");
      fd.append("technicalData", JSON.stringify(technicalData || []));

      if (pdfFile) fd.append("datasheet", pdfFile);
      if (images.length > 0) images.forEach((img) => fd.append("images", img));
      console.log(fd);
      // return false

      const res = await callApiWithFile(constant.API.PRODUCTS.ADDPRODUCTS, "POST", fd);

      const ok =
        res?.status === true || res?.success === true || res?.ok === true;
      if (!ok) {
        throw new Error(res?.message || "Failed to save product");
      }

      showSuccess("Product saved successfully!");
      router.refresh();
    } catch (err) {
      console.error(err);
      showError(err.message || "Network or server error");
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Add New Product
        </h1>
        <p className="text-gray-500 mb-8">
          Fill in product details and upload attachments.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
        >
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Product Title <span className="text-rose-500">*</span>
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="inputcls"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Short Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="shortdes"
                rows={3}
                value={formData.shortdes}
                onChange={handleChange}
                placeholder="Write a short summary (max 300 characters)"
                className="inputcls resize-none"
                maxLength={maxChars}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Keep it concise and descriptive.</span>
                <span>
                  {charCount}/{maxChars}
                </span>
              </div>
            </div>

            {/* Technical Data */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                ⚙️ Technical Data
              </h3>

              <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 border-b">
                        Property
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 border-b">
                        Value
                      </th>
                      <th className="px-3 py-3 text-center w-12 border-b"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {technicalData.map((row, i) => (
                      <tr
                        key={i}
                        className={`${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } transition-colors hover:bg-indigo-50/40`}
                      >
                        <td className="px-3 py-2 border-t">
                          <input
                            type="text"
                            value={row.key}
                            onChange={(e) =>
                              updateTechnicalRow(i, "key", e.target.value)
                            }
                            placeholder="e.g. Density"
                            className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                          />
                        </td>
                        <td className="px-3 py-2 border-t">
                          <input
                            type="text"
                            value={row.value}
                            onChange={(e) =>
                              updateTechnicalRow(i, "value", e.target.value)
                            }
                            placeholder="e.g. 1.05 g/cm³"
                            className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                          />
                        </td>
                        <td className="border-t text-center">
                          {technicalData.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTechnicalRow(i)}
                              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-700 transition"
                              title="Delete row"
                            >
                              ✕
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Row Button */}
              <div className="flex justify-start mt-4">
                <button
                  type="button"
                  onClick={addTechnicalRow}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition"
                >
                  <span className="text-lg leading-none">＋</span> Add Row
                </button>
              </div>
            </div>

            {/* Editor */}
            <div className="pt-6">
              <label className="block font-semibold text-gray-700 mb-2">
                Detailed Description
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(html) =>
                  setFormData((p) => ({ ...p, content: html }))
                }
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* Category */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="inputcls"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <div className="flex gap-2 pt-2">
                <input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add new category"
                  className="flex-1 inputcls"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="px-3 py-2 thmbtn rounded-2xl"
                >
                  Add
                </button>
              </div>
            </div>

            {/* PDF Upload */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Upload Data Sheet (PDF)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4
                    file:rounded-lg file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
                {pdfFile ? (
                  <div className="mt-3 flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700">
                    <span>📄 {pdfFile.name}</span>
                    <button
                      type="button"
                      onClick={removePdf}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-2">
                    Upload a single PDF file (max 10MB)
                  </p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Upload Images (max 2)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition">
                <input
                  ref={imageRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4
                    file:rounded-lg file:border-0 file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                {previewUrls.length > 0 ? (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {previewUrls.map((src, i) => (
                      <div key={i} className="relative group">
                        <Image
                          src={src}
                          alt={`Image ${i + 1}`}
                          width={300}
                          height={200}
                          className="rounded-lg border object-cover shadow-sm"
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-white/80 rounded-full text-red-600 text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-2">
                    Upload up to 2 images (≤5MB each)
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="lg:col-span-3 border-t border-gray-200 pt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 thmbtn rounded-full cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
