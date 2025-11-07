"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RichTextEditor from "../../components/addproducts/contenteditor";
import { callApiWithFile } from "../../api";
import constant from "../../env";
import { showSuccess, showError } from "../../components/toaster";

export default function AddNewsPage() {
  return <AddNewsForm />;
}

function AddNewsForm() {
  const router = useRouter();
  const imageRef = useRef(null);

  const [categories, setCategories] = useState([
    "Business",
    "Technology",
    "Health",
    "Lifestyle",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be ≤5MB");
      return;
    }
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl("");
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
      if (image) fd.append("image", image);

      const res = await callApiWithFile(constant.API.NEWS.ADDNEWS, "POST", fd);
      const ok = res?.status === true || res?.success === true || res?.ok === true;

      if (!ok) throw new Error(res?.message || "Failed to save news");

      showSuccess("News added successfully!");
      router.refresh();
    } catch (err) {
      console.error(err);
      showError(err.message || "Network or server error");
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Add News Article
        </h1>
        <p className="text-gray-500 mb-8">
          Fill in article details and upload an image.
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
                News Title <span className="text-rose-500">*</span>
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter news title"
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

            {/* Editor */}
            <div className="pt-6">
              <label className="block font-semibold text-gray-700 mb-2">
                Full News Content
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

            {/* Image Upload */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Upload Image <span className="text-rose-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition">
                <input
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4
                    file:rounded-lg file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
                {previewUrl ? (
                  <div className="mt-4 relative inline-block">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={300}
                      height={200}
                      className="rounded-lg border object-cover shadow-sm"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-1 right-1 bg-white/80 rounded-full text-red-600 text-xs px-2 py-1"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-2">
                    Upload one image (≤5MB)
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
              Publish News
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
