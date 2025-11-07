"use client";
import { useEffect, useState, useCallback } from "react";
import { FiEdit, FiTrash2, FiPlusCircle, FiArchive } from "react-icons/fi";
import { AiOutlineRead } from "react-icons/ai";
import { callApi } from "../../api";
import constant from "../../env";
import { showSuccess, showError } from "../../components/toaster";
import { useRouter } from "next/navigation";
import Pagination from "../../components/blog/pagination";
import Modal from "../../components/modal";
//console
const PER_PAGE = 5;
const SKELETON_COUNT = 5;

export default function BlogTable() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [actionType, setActionType] = useState("delete"); // "delete" | "trash"

  function normalizeBlog(b = {}) {
    return {
      id: b.id || b._id || b.blog_id || "",
      title: b.title || b.name || "—",
      category:
        (b.category && (b.category.name || b.category)) ||
        b.category_name ||
        b.category ||
        "—",
      author:
        (b.author && (b.author.name || b.author)) ||
        b.author_name ||
        b.author ||
        "—",
      date: b.published_at || b.created_at || b.updated_at || b.date || "—",
      status:
        b.status == 1 ||
        b.status == "1" ||
        b.status === "published" ||
        b.is_published
          ? "Published"
          : "Draft",
    };
  }

  // const fetchBlogs = useCallback(async (targetPage = 1) => {
  //   try {
  //     setLoading(true);
  //     let url = constant.API.BLOG;
  //     console.log(url)
  //     url += (url.includes("?") ? "&" : "?") + `page=${targetPage}&per_page=${PER_PAGE}`;

  //     const res = await callApi(url, "GET");
  //     if (!res?.status) {
  //       setBlogs([]);
  //       setPage(1);
  //       setTotalPages(1);
  //       return;
  //     }

  //     const pg = res.data || {};
  //     const rows = Array.isArray(pg.data) ? pg.data : [];
  //     setBlogs(rows.map(normalizeBlog));

  //     const current =
  //       Number(pg.current_page) ||
  //       Number(pg?.meta?.current_page) ||
  //       Number(targetPage) ||
  //       1;

  //     const last =
  //       Number(pg.last_page) ||
  //       Number(pg?.meta?.last_page) ||
  //       (pg.next_page_url != null ? current + 1 : current);

  //     setPage(current);
  //     setTotalPages(last);
  //   } catch (err) {
  //     console.error("Error fetching blogs:", err);
  //     setBlogs([]);
  //     setPage(1);
  //     setTotalPages(1);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // second methode

  const fetchBlogs = useCallback(async (targetPage = 1) => {
    try {
      setLoading(true);
      let url = constant.API.BLOG;
      url +=
        (url.includes("?") ? "&" : "?") +
        `page=${targetPage}&per_page=${PER_PAGE}`;

      let res = null;
      try {
        res = await callApi(url, "GET");
      } catch (apiErr) {
        console.error("API call failed:", apiErr);
        showError(
          "API request failed. Please check your connection or try again later."
        );
        setBlogs([]);
        setPage(1);
        setTotalPages(1);
        return;
      }

      if (!res?.status) {
        showError(res?.message || "Failed to fetch blogs.");
        setBlogs([]);
        setPage(1);
        setTotalPages(1);
        return;
      }

      const pg = res.data || {};
      const rows = Array.isArray(pg.results)
        ? pg.results
        : Array.isArray(res.data)
        ? res.data
        : [];

      setBlogs(rows.map(normalizeBlog));

      const total = Number(pg.total) || rows.length || 1;
      const last = Math.ceil(total / PER_PAGE);
      setPage(targetPage);
      setTotalPages(last);
    } catch (err) {
      console.error("Unexpected error fetching blogs:", err);
      showError("Unexpected error occurred. Please try again later.");
      setBlogs([]);
      setPage(1);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  // second methode

  async function handleDelete(id) {
    if (!id) return;
    try {
      const res = await callApi(constant.API.DELETEBLOG, "POST", { id });
      if (res?.status) {
        showSuccess(res?.message || "Blog deleted successfully");
        setBlogs((prev) => {
          const next = prev.filter((b) => String(b.id) !== String(id));
          const nextPage = next.length === 0 && page > 1 ? page - 1 : page;
          setTimeout(() => fetchBlogs(nextPage), 0);
          return next;
        });
      } else {
        showError(res?.message || "Failed to delete blog");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      showError("Something went wrong while deleting");
    }
  }

  async function handleTrash(id) {
    if (!id) return;
    try {
      const res = await callApi(constant.API.TRASHBLOG, "POST", { id });
      if (res?.status) {
        showSuccess(res?.message || "Blog moved to trash");
        setBlogs((prev) => {
          const next = prev.filter((b) => String(b.id) !== String(id));
          const nextPage = next.length === 0 && page > 1 ? page - 1 : page;
          setTimeout(() => fetchBlogs(nextPage), 0);
          return next;
        });
      } else {
        showError(res?.message || "Failed to move blog to trash");
      }
    } catch (err) {
      console.error("Error trashing blog:", err);
      showError("Something went wrong while moving to trash");
    }
  }

  useEffect(() => {
    fetchBlogs(page);
  }, [page, fetchBlogs]);

  function formatDate(dateStr) {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      return (
        d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) +
        " " +
        d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
    } catch {
      return dateStr;
    }
  }

  return (
    <>
      <div className="p-6 pt-10 md:pt-20 max-w-7xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <AiOutlineRead className="w-8 h-8 text-indigo-600" /> View All Blogs
          </h1>

          <button
            onClick={() => router.push("/admin/uploadblogs")}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer thmbtn rounded-full "
          >
            <FiPlusCircle className="w-5 h-5" /> Add New Blog
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">S.No.</th>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <tr key={`sk-${i}`} className="animate-pulse border-b">
                    <td className="px-6 py-4">
                      <div className="h-4 w-6 rounded bg-gray-200" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-72 rounded bg-gray-200" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 rounded bg-gray-200" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-28 rounded bg-gray-200" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-40 rounded bg-gray-200" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-24 rounded-full bg-gray-200" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-8 w-16 rounded bg-gray-200" />
                        <div className="h-8 w-16 rounded bg-gray-200" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : blogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No blogs found
                  </td>
                </tr>
              ) : (
                blogs.map((blog, index) => (
                  <tr
                    key={blog.id || blog.title}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4">
                      {(page - 1) * PER_PAGE + index + 1}.
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4">{blog.category}</td>
                    <td className="px-6 py-4">{blog.author}</td>
                    <td className="px-6 py-4">{formatDate(blog.date)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          "px-3 py-1 text-xs font-medium rounded-full " +
                          (blog.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700")
                        }
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          router.push(`/admin/uploadblogs?id=${blog.id}`)
                        }
                        className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md bg-[#7998F4] text-white hover:bg-blue-600 transition"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>

                      {/* TRASH */}
                      <button
                        onClick={() => {
                          setSelectedId(blog.id);
                          setActionType("trash");
                          setIsModalOpen(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
                      >
                        <FiArchive className="w-4 h-4" />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => {
                          setSelectedId(blog.id);
                          setActionType("delete");
                          setIsModalOpen(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={(p) => {
            const n = Math.max(1, Math.min(Number(p) || 1, totalPages));
            if (n !== page) setPage(n);
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={actionType === "trash" ? "Move to Trash" : "Confirm Delete"}
        width="max-w-md"
        confirmText={actionType === "trash" ? "Move to Trash" : "Delete"}
        cancelText="Cancel"
        onConfirm={() => {
          if (selectedId) {
            if (actionType === "trash") {
              handleTrash(selectedId);
            } else {
              handleDelete(selectedId);
            }
          }
          setIsModalOpen(false);
        }}
      >
        <p className="text-gray-700">
          {actionType === "trash"
            ? "Are you sure you want to move this blog to Trash? You can restore it later."
            : "Are you sure you want to permanently delete this blog? This action cannot be undone."}
        </p>
      </Modal>
    </>
  );
}
