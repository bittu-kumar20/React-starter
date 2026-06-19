import { IconDeviceFloppy, IconMessageCircle, IconStar } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "react-router";
import { useEffect } from "react";
import PageHeader from "../../components/common/PageHeader";
import PageHeaderCard from "../../components/global/PageHeaderCard";
import { FormField } from "../../components/form/FormField";
import Button from "../../components/ui/button/Button";

const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Customer name is required."),
  designation: z.string().trim().min(1, "Designation is required."),
  company: z.string().trim().optional(),
  rating: z.string().trim().min(1, "Rating is required."),
  status: z.string().trim().min(1, "Status is required."),
  avatar: z.any().optional(),
  message: z
    .string()
    .trim()
    .min(1, "Testimonial message is required.")
    .min(10, "Message must be at least 10 characters."),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

const defaultValues: TestimonialFormValues = {
  name: "",
  designation: "",
  company: "",
  rating: "",
  status: "active",
  avatar: undefined,
  message: "",
};

// Mock testimonial data
const mockTestimonials = [
  {
    id: 1,
    name: "John Doe",
    designation: "CEO",
    company: "TechCorp Inc.",
    rating: "5",
    status: "active",
    message: "Working with this team has been an exceptional experience. Their attention to detail and innovative solutions have transformed our business operations.",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Marketing Manager",
    company: "Creative Agency",
    rating: "4",
    status: "active",
    message: "The creative team delivered outstanding results for our marketing campaigns. Highly professional and results-oriented approach.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    designation: "Founder",
    company: "StartupHub",
    rating: "5",
    status: "inactive",
    message: "Excellent service and support throughout our entire project development lifecycle. Would definitely recommend to others.",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    designation: "Product Manager",
    company: "Enterprise Inc.",
    rating: "3",
    status: "active",
    message: "Great collaboration and communication skills. Delivered project on time and exceeded our expectations.",
  },
];

const AddTestimonial = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const methods = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues,
  });

  // Load testimonial data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const testimonialId = parseInt(id);
      const testimonial = mockTestimonials.find(t => t.id === testimonialId);
      if (testimonial) {
        methods.reset(testimonial);
      }
    }
  }, [id, isEditMode, methods]);

  const handleSubmit = methods.handleSubmit(() => {
    alert(isEditMode ? "Testimonial updated successfully!" : "Testimonial added successfully!");
    methods.reset(defaultValues);
  });

  return (
    <>

      <PageHeader pageTitle={isEditMode ? "Edit Testimonial" : "Add Testimonial"} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <PageHeaderCard
            title={isEditMode ? "Edit Testimonial" : "Add Testimonial"}
            description={isEditMode ? "Update the testimonial details and save your changes." : "Add a new testimonial from your customers and showcase it on your website."}
            icon={<IconMessageCircle size={24} />}
            showBackButton
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField<TestimonialFormValues>
                name="name"
                label="Customer Name"
                type="text"
                placeholder="Enter customer name"
                required
              />
              <FormField<TestimonialFormValues>
                name="designation"
                label="Designation"
                type="text"
                placeholder="Founder, CEO, Manager"
                required
              />
              <FormField<TestimonialFormValues>
                name="company"
                label="Company"
                type="text"
                placeholder="Company name"
              />
              <FormField<TestimonialFormValues>
                name="rating"
                label="Rating"
                type="select"
                placeholder="Select rating"
                options={[
                  { label: "5 Stars", value: "5" },
                  { label: "4 Stars", value: "4" },
                  { label: "3 Stars", value: "3" },
                  { label: "2 Stars", value: "2" },
                  { label: "1 Star", value: "1" },
                ]}
                required
              />
              <FormField<TestimonialFormValues>
                name="status"
                label="Status"
                type="select"
                placeholder="Select status"
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
                required
              />
              <FormField<TestimonialFormValues>
                name="avatar"
                label="Customer Image"
                type="image"
                accept="image/png,image/jpeg,image/webp"
              />
              <FormField<TestimonialFormValues>
                name="message"
                label="Testimonial Message"
                type="textarea"
                placeholder="Write customer testimonial..."
                rows={5}
                className="lg:col-span-2"
                required
              />
            </div>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <IconStar className="size-4 text-warning-500" />
                Preview Tip
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Keep testimonials short, specific, and focused on the result
                your customer achieved.
              </p>
            </div>

            <div className="mt-6 flex justify-start">
              <Button
                type="submit"
                size="sm"
                variant="primary"
                startIcon={<IconDeviceFloppy className="size-4" />}
              >
                Save Testimonial
              </Button>
            </div>
          </PageHeaderCard>
        </form>
      </FormProvider>
    </>
  );
};

export default AddTestimonial;
