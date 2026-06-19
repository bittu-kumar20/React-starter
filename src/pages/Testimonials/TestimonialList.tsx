import { useState } from "react";
import { IconEdit, IconTrash, IconPlus, IconEye, IconStar } from "@tabler/icons-react";
import PageHeader from "../../components/common/PageHeader";
import PageHeaderCard from "../../components/global/PageHeaderCard";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";
import { Modal } from "../../components/ui/modal";

// Mock data for testimonials
const mockTestimonials = [
  {
    id: 1,
    name: "John Doe",
    designation: "CEO",
    company: "TechCorp Inc.",
    rating: "5",
    status: "active",
    avatar: "https://placehold.co/100x100/3b82f6/ffffff?text=JD",
    message: "Working with this team has been an exceptional experience. Their attention to detail and innovative solutions have transformed our business operations.",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Marketing Manager",
    company: "Creative Agency",
    rating: "4",
    status: "active",
    avatar: "https://placehold.co/100x100/10b981/ffffff?text=JS",
    message: "The creative team delivered outstanding results for our marketing campaigns. Highly professional and results-oriented approach.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    designation: "Founder",
    company: "StartupHub",
    rating: "5",
    status: "inactive",
    avatar: "https://placehold.co/100x100/f59e0b/ffffff?text=MJ",
    message: "Excellent service and support throughout our entire project development lifecycle. Would definitely recommend to others.",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    designation: "Product Manager",
    company: "Enterprise Inc.",
    rating: "3",
    status: "active",
    avatar: "https://placehold.co/100x100/8b5cf6/ffffff?text=SW",
    message: "Great collaboration and communication skills. Delivered project on time and exceeded our expectations.",
  },
];

const TestimonialList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [viewTestimonial, setViewTestimonial] = useState<typeof mockTestimonials[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredTestimonials = mockTestimonials.filter((testimonial) => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || testimonial.status === filterStatus;
    const matchesRating = filterRating === "all" || testimonial.rating === filterRating;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

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

  const handleViewTestimonial = (testimonial: typeof mockTestimonials[0]) => {
    setViewTestimonial(testimonial);
    setIsViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setViewTestimonial(null);
  };

  const getRatingStars = (rating: string) => {
    return Array.from({ length: 5 }, (_, i) => (
      <IconStar
        key={i}
        className={`size-4 ${i < parseInt(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <>
      <PageHeader pageTitle="Testimonial List" />

      <PageHeaderCard
        title="Customer Testimonials"
        description="Manage customer testimonials and reviews"
        showBackButton={false}
      >
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-4">
              <input
                type="text"
                placeholder="Search testimonials..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <Button
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => navigate("/testimonials/add")}
            >
              <IconPlus className="size-4" />
              Add Testimonial
            </Button>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.designation} at {testimonial.company}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {getRatingStars(testimonial.rating)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(testimonial.status)}`}>
                        {testimonial.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    "{testimonial.message}"
                  </p>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleViewTestimonial(testimonial)}
                    >
                      <IconEye className="size-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => navigate(`/testimonials/add/${testimonial.id}`)}
                    >
                      <IconEdit className="size-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <IconTrash className="size-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageHeaderCard>

      {/* View Testimonial Modal */}
      <Modal isOpen={isViewModalOpen} onClose={handleViewModalClose} className="max-w-lg">
        {viewTestimonial && (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                  <IconStar className="size-5 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white/90">
                  {viewTestimonial.name}
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Testimonial Details
              </p>
            </div>

            {/* Avatar */}
            {viewTestimonial.avatar && (
              <div className="mb-4 flex justify-center">
                <img
                  src={viewTestimonial.avatar}
                  alt={viewTestimonial.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}

            {/* Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Designation
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {viewTestimonial.designation}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {viewTestimonial.company}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {getRatingStars(viewTestimonial.rating)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(viewTestimonial.status)}`}>
                    {viewTestimonial.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  "{viewTestimonial.message}"
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

export default TestimonialList;
