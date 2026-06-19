import { useState } from "react";
import { IconEdit, IconTrash, IconPlus, IconEye, IconExternalLink } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import PageHeader from "../../components/common/PageHeader";
import PageHeaderCard from "../../components/global/PageHeaderCard";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";

// Mock data for portfolio
const mockPortfolio = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    client: "TechCorp Inc.",
    date: "2024-01-15",
    status: "completed",
    image: "https://placehold.co/600x400/3b82f6/ffffff?text=E-commerce",
    projectUrl: "https://example.com",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    category: "Mobile App",
    client: "FinanceHub",
    date: "2024-01-12",
    status: "in-progress",
    image: "https://placehold.co/600x400/10b981/ffffff?text=Banking+App",
    projectUrl: "https://example.com",
  },
  {
    id: 3,
    title: "Brand Identity Design",
    category: "UI/UX Design",
    client: "Creative Agency",
    date: "2024-01-10",
    status: "completed",
    image: "https://placehold.co/600x400/f59e0b/ffffff?text=Brand+Identity",
    projectUrl: "",
  },
  {
    id: 4,
    title: "Food Delivery App",
    category: "Mobile App",
    client: "Food & Co",
    date: "2024-01-08",
    status: "active",
    image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Food+Delivery",
    projectUrl: "https://example.com",
  },
];

const PortfolioList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewProject, setViewProject] = useState<typeof mockPortfolio[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredPortfolio = mockPortfolio.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    const matchesCategory = filterCategory === "all" || project.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "active":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleViewProject = (project: typeof mockPortfolio[0]) => {
    setViewProject(project);
    setIsViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setViewProject(null);
  };

  return (
    <>
      <PageHeader pageTitle="Portfolio List" />

      <PageHeaderCard
        title="Portfolio Projects"
        description="Showcase your portfolio projects and work"
        showBackButton={false}
      >
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="all">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Branding">Branding</option>
                <option value="E-commerce">E-commerce</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <Button
              variant="primary"
              className="flex items-center gap-2 w-full sm:w-auto"
              onClick={() => navigate("/portfolio/add")}
            >
              <IconPlus className="size-4" />
              Add Project
            </Button>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPortfolio.map((project) => (
              <div key={project.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {project.category}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Client: {project.client}
                    </p>
                  </div>

                  {/* Project Actions */}
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-2">
                      {project.projectUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 w-full sm:w-auto"
                        >
                          <IconExternalLink className="size-4" />
                          <span className="sm:hidden">View</span>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleViewProject(project)}
                      >
                        <IconEye className="size-4" />
                        <span className="sm:hidden">Details</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 w-full sm:w-auto"
                        onClick={() => navigate(`/portfolio/add/${project.id}`)}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageHeaderCard>

      {/* View Project Modal */}
      <Modal isOpen={isViewModalOpen} onClose={handleViewModalClose} className="max-w-lg">
        {viewProject && (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                  <IconEye className="size-5 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white/90">
                  {viewProject.title}
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Project Details
              </p>
            </div>

            {/* Image */}
            {viewProject.image && (
              <div className="mb-4">
                <img
                  src={viewProject.image}
                  alt={viewProject.title}
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
                    {viewProject.category}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Client
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {viewProject.client}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {viewProject.date}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(viewProject.status)}`}>
                    {viewProject.status}
                  </span>
                </div>
              </div>

              {viewProject.projectUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project URL
                  </label>
                  <a
                    href={viewProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 flex items-center gap-1"
                  >
                    {viewProject.projectUrl}
                    <IconExternalLink className="size-3" />
                  </a>
                </div>
              )}
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

export default PortfolioList;
