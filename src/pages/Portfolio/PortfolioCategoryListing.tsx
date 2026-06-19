import { useState } from "react";
import { IconEdit, IconTrash, IconPlus, IconEye, IconFolder } from "@tabler/icons-react";
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

// Mock data for portfolio categories
const mockCategories = [
  {
    id: 1,
    name: "Web Development",
    description: "Websites, web applications, e-commerce platforms",
    projectCount: 15,
    color: "bg-blue-500",
    status: "active",
    createdAt: "2024-01-15",
    lastProject: "E-commerce Platform",
    lastProjectDate: "2024-01-14",
  },
  {
    id: 2,
    name: "Mobile App",
    description: "iOS and Android applications",
    projectCount: 10,
    color: "bg-green-500",
    status: "active",
    createdAt: "2024-01-10",
    lastProject: "Fitness App",
    lastProjectDate: "2024-01-09",
  },
  {
    id: 3,
    name: "UI/UX Design",
    description: "User interface and user experience design projects",
    projectCount: 12,
    color: "bg-purple-500",
    status: "active",
    createdAt: "2024-01-08",
    lastProject: "Dashboard Design",
    lastProjectDate: "2024-01-07",
  },
  {
    id: 4,
    name: "Branding",
    description: "Brand identity, logo design, visual identity",
    projectCount: 8,
    color: "bg-orange-500",
    status: "active",
    createdAt: "2024-01-05",
    lastProject: "Tech Startup Brand",
    lastProjectDate: "2024-01-04",
  },
  {
    id: 5,
    name: "E-commerce",
    description: "Online stores, shopping platforms",
    projectCount: 14,
    color: "bg-indigo-500",
    status: "active",
    createdAt: "2024-01-12",
    lastProject: "Fashion Store",
    lastProjectDate: "2024-01-11",
  },
];

const PortfolioCategoryListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<typeof mockCategories[0] | null>(null);
  const [viewCategory, setViewCategory] = useState<typeof mockCategories[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredCategories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <PageHeader pageTitle="Portfolio Categories" />

      <PageHeaderCard
        title="Portfolio Categories"
        description="Manage portfolio categories and organize your projects"
        showBackButton={false}
      >
        <div className="space-y-6">
          {/* Search and Add Button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
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
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Category
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Description
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Projects
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
                      Created
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Last Project
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
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="px-5 py-4 text-start text-theme-sm dark:text-gray-300">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${category.color}`}>
                            <IconFolder className="size-5 text-white" />
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
                        {category.projectCount}
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
                            {category.lastProject}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {category.lastProjectDate}
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
                  <IconFolder className="size-5 text-white" />
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
                    Project Count
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {viewCategory.projectCount}
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
                  Last Project
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {viewCategory.lastProject} ({viewCategory.lastProjectDate})
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

export default PortfolioCategoryListing;
