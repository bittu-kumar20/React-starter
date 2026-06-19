import { useState } from "react";
import { IconEdit, IconTrash, IconPlus, IconTag, IconSearch, IconChevronUp, IconChevronDown, IconEye } from "@tabler/icons-react";
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
import AddCategoryModal from "../../components/modals/AddCategoryModal";

// Mock data for categories
const mockCategories = [
  {
    id: 1,
    name: "Technology",
    description: "Tech tutorials, programming guides, software reviews",
    postCount: 24,
    color: "bg-blue-500",
    status: "active",
    createdAt: "2024-01-15",
    lastPost: "React Hooks Best Practices",
    lastPostDate: "2024-01-14",
  },
  {
    id: 2,
    name: "Business",
    description: "Business insights, entrepreneurship, case studies",
    postCount: 18,
    color: "bg-green-500",
    status: "active",
    createdAt: "2024-01-10",
    lastPost: "Startup Funding Guide",
    lastPostDate: "2024-01-09",
  },
  {
    id: 3,
    name: "Design",
    description: "UI/UX design, graphics, creative tutorials",
    postCount: 15,
    color: "bg-purple-500",
    status: "active",
    createdAt: "2024-01-08",
    lastPost: "Color Theory in Web Design",
    lastPostDate: "2024-01-07",
  },
  {
    id: 4,
    name: "Marketing",
    description: "Digital marketing, SEO, social media strategies",
    postCount: 12,
    color: "bg-orange-500",
    status: "active",
    createdAt: "2024-01-05",
    lastPost: "Content Marketing Strategies",
    lastPostDate: "2024-01-04",
  },
  {
    id: 5,
    name: "Development",
    description: "Web development, mobile apps, coding tutorials",
    postCount: 20,
    color: "bg-indigo-500",
    status: "active",
    createdAt: "2024-01-12",
    lastPost: "Advanced React Patterns",
    lastPostDate: "2024-01-11",
  },
];

const CategoryListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<typeof mockCategories[0] | null>(null);
  const [viewCategory, setViewCategory] = useState<typeof mockCategories[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof typeof mockCategories[0]>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCategories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedCategories = sortedCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);

  const handleSort = (column: keyof typeof mockCategories[0]) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: typeof mockCategories[0]) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleViewCategory = (category: typeof mockCategories[0]) => {
    setViewCategory(category);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setViewCategory(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleDeleteCategory = (category: any) => {
    // Handle delete logic here
    console.log("Delete category:", category);
  };

  return (
    <>
      <PageHeader pageTitle="Blog Categories" />

      <PageHeaderCard
        title="Blog Categories"
        description="Manage blog categories and organize your content"
        showBackButton={false}
      >
        <div className="space-y-6">
          {/* Search and Add Button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IconSearch className="size-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
            <Button
              variant="primary"
              onClick={handleAddCategory}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <IconPlus className="size-4" />
              Add Category
            </Button>
          </div>

          {/* Categories Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-0 py-3"
                    >
                      <div
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-2 px-5 py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors select-none rounded"
                      >
                        Category
                        {sortColumn === "name" && (
                          sortDirection === "asc" ? <IconChevronUp className="size-4" /> : <IconChevronDown className="size-4" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Description
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-0 py-3"
                    >
                      <div
                        onClick={() => handleSort("postCount")}
                        className="flex items-center gap-2 px-5 py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors select-none rounded"
                      >
                        Posts
                        {sortColumn === "postCount" && (
                          sortDirection === "asc" ? <IconChevronUp className="size-4" /> : <IconChevronDown className="size-4" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-0 py-3"
                    >
                      <div
                        onClick={() => handleSort("status")}
                        className="flex items-center gap-2 px-5 py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors select-none rounded"
                      >
                        Status
                        {sortColumn === "status" && (
                          sortDirection === "asc" ? <IconChevronUp className="size-4" /> : <IconChevronDown className="size-4" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-0 py-3"
                    >
                      <div
                        onClick={() => handleSort("createdAt")}
                        className="flex items-center gap-2 px-5 py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors select-none rounded"
                      >
                        Created
                        {sortColumn === "createdAt" && (
                          sortDirection === "asc" ? <IconChevronUp className="size-4" /> : <IconChevronDown className="size-4" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Last Post
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
                  {paginatedCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="px-5 py-4 text-start text-theme-sm dark:text-gray-300">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${category.color}`}>
                            <IconTag className="size-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white/90">
                              {category.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {category.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category.description}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(category.status)}`}>
                          {category.postCount}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(category.status)}`}>
                          {category.status}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category.createdAt}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="text-sm">
                          <div className="font-medium text-gray-800 dark:text-white/90">
                            {category.lastPost}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {category.lastPostDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewCategory(category)}
                            className="flex items-center gap-1"
                          >
                            <IconEye className="size-4" />
                            <span className="sm:hidden">View</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCategory(category)}
                            className="flex items-center gap-1"
                          >
                            <IconEdit className="size-4" />
                            <span className="sm:hidden">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCategory(category)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedCategories.length)} of {sortedCategories.length} categories
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </PageHeaderCard>

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        editingCategory={editingCategory}
      />

      {/* View Category Modal */}
      <Modal isOpen={isViewModalOpen} onClose={handleViewModalClose} className="max-w-lg">
        {viewCategory && (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${viewCategory.color}`}>
                  <IconTag className="size-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white/90">
                  {viewCategory.name}
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Category Details
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {viewCategory.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Post Count
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {viewCategory.postCount}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(viewCategory.status)}`}>
                    {viewCategory.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Created At
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {viewCategory.createdAt}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Post
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {viewCategory.lastPost} ({viewCategory.lastPostDate})
                </p>
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

export default CategoryListing;
