import { useState } from "react";
import { IconEdit, IconTrash, IconPlus, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import PageHeader from "../../components/common/PageHeader";
import PageHeaderCard from "../../components/global/PageHeaderCard";
import Button from "../../components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Modal } from "../../components/ui/modal";

// Mock data for blogs
const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    category: "Technology",
    author: "John Doe",
    date: "2024-01-15",
    status: "published",
    image: "https://placehold.co/600x400/3b82f6/ffffff?text=React+Hooks",
  },
  {
    id: 2,
    title: "Modern Web Development Trends",
    category: "Technology",
    author: "Jane Smith",
    date: "2024-01-12",
    status: "draft",
    image: "https://placehold.co/600x400/10b981/ffffff?text=Web+Dev+Trends",
  },
  {
    id: 3,
    title: "Building Scalable Applications",
    category: "Business",
    author: "Mike Johnson",
    date: "2024-01-10",
    status: "published",
    image: "https://placehold.co/600x400/f59e0b/ffffff?text=Scalable+Apps",
  },
  {
    id: 4,
    title: "UI/UX Best Practices",
    category: "Technology",
    author: "Sarah Wilson",
    date: "2024-01-08",
    status: "published",
    image: "https://placehold.co/600x400/8b5cf6/ffffff?text=UI+UX+Best+Practices",
  },
];

const BlogList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewBlog, setViewBlog] = useState<typeof mockBlogs[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || blog.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleViewBlog = (blog: typeof mockBlogs[0]) => {
    setViewBlog(blog);
    setIsViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setViewBlog(null);
  };

  return (
    <>
      <PageHeader pageTitle="Blog List" />

      <PageHeaderCard
        title="Blog Posts"
        description="Manage your blog posts and content"
        showBackButton={false}
      >
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <Button
              variant="primary"
              className="flex items-center gap-2 w-full sm:w-auto"
              onClick={() => navigate("/blogs/add")}
            >
              <IconPlus className="size-4" />
              Add Blog
            </Button>
          </div>

          {/* Blog Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Title
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Category
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Author
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {filteredBlogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-lg">
                            <img
                              width={40}
                              height={40}
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {blog.title}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {blog.category}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {blog.category}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {blog.author}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {blog.date}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(blog.status)}`}>
                          {blog.status}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 w-full sm:w-auto"
                            onClick={() => handleViewBlog(blog)}
                          >
                            <IconEye className="size-4" />
                            <span className="sm:hidden">View</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 w-full sm:w-auto"
                            onClick={() => navigate(`/blogs/add/${blog.id}`)}
                          >
                            <IconEdit className="size-4" />
                            <span className="sm:hidden">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 w-full sm:w-auto"
                          >
                            <IconTrash className="size-4" />
                            <span className="sm:hidden">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </PageHeaderCard>

      {/* View Blog Modal */}
      <Modal isOpen={isViewModalOpen} onClose={handleViewModalClose} className="max-w-lg">
        {viewBlog && (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                  <IconEye className="size-5 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white/90">
                  {viewBlog.title}
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Blog Details
              </p>
            </div>

            {/* Image */}
            {viewBlog.image && (
              <div className="mb-4">
                <img
                  src={viewBlog.image}
                  alt={viewBlog.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {viewBlog.category}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Author
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {viewBlog.author}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {viewBlog.date}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(viewBlog.status)}`}>
                    {viewBlog.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                onClick={handleViewModalClose}
                className="flex items-center gap-2"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BlogList;
