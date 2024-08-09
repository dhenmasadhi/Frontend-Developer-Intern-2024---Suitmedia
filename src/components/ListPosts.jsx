import { useEffect, useState } from "react";
import axios from "axios";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("-published_at");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const visiblePages = 5; // Maximum number of page buttons to show

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${perPage}&append[]=small_image&append[]=medium_image&sort=${sort}`
      );
      setPosts(response.data.data);
      setTotalPages(Math.ceil(response.data.meta.total / perPage));
    };
    fetchPosts();
  }, [sort, page, perPage]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSort = params.get("sort") || "-published_at";
    const urlPage = parseInt(params.get("page") || "1", 10);
    const urlPerPage = parseInt(params.get("perPage") || "10", 10);

    setSort(urlSort);
    setPage(urlPage);
    setPerPage(urlPerPage);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("sort", sort);
    params.set("page", page);
    params.set("perPage", perPage);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [sort, page, perPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getVisiblePages = () => {
    let start = Math.max(1, page - Math.floor(visiblePages / 2));
    let end = start + visiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <div>
      <div className="mx-20 my-10">
        <div className="mb-4 flex gap-4 justify-end">
          <label className="flex items-center gap-2">
            Show per page:
            <select
              value={perPage}
              onChange={(e) => setPerPage(e.target.value)}
              className="border rounded p-1"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            Sort By:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded p-1"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="card border rounded overflow-hidden shadow-md"
            >
              <img
                src={post.small_image}
                alt={post.title}
                className="w-full h-48 object-cover"
                loading="lazy"
                style={{ aspectRatio: "16/9" }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold leading-tight max-h-16 overflow-hidden text-ellipsis">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            &lt;
          </button>
          {getVisiblePages().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-2 rounded ${
                page === pageNumber ? "bg-orange-500 text-white" : "bg-gray-300"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListPosts;
