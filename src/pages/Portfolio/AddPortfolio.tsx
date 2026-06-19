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

const portfolioSchema = z.object({
  title: z.string().trim().min(1, "Project title is required."),
  category: z.string().trim().min(1, "Category is required."),
  client: z.string().trim().min(1, "Client name is required."),
  projectUrl: z.string().trim().optional(),
  description: z
    .string()
    .trim()
    .min(1, "Project description is required.")
    .min(20, "Description must be at least 20 characters."),
  image: z.any().optional(),
  status: z.string().trim().min(1, "Status is required."),
});

type PortfolioFormValues = z.infer<typeof portfolioSchema>;

const defaultValues: PortfolioFormValues = {
  title: "",
  category: "",
  client: "",
  projectUrl: "",
  description: "",
  image: undefined,
  status: "draft",
};

// Mock portfolio data
const mockPortfolio = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    client: "TechCorp Inc.",
    projectUrl: "https://example.com",
    description: "A comprehensive e-commerce platform with advanced features including product management, payment integration, and order tracking.",
    status: "completed",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    category: "Mobile App",
    client: "FinanceHub",
    projectUrl: "https://example.com",
    description: "A secure and user-friendly mobile banking application with features like account management, transfers, and bill payments.",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Brand Identity Design",
    category: "UI/UX Design",
    client: "Creative Agency",
    projectUrl: "",
    description: "Complete brand identity design including logo, color palette, typography, and brand guidelines.",
    status: "completed",
  },
  {
    id: 4,
    title: "Food Delivery App",
    category: "Mobile App",
    client: "Food & Co",
    projectUrl: "https://example.com",
    description: "A modern food delivery application with real-time tracking, multiple payment options, and restaurant management.",
    status: "active",
  },
];

const AddPortfolio = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const methods = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues,
  });

  // Load portfolio data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const portfolioId = parseInt(id);
      const portfolio = mockPortfolio.find(p => p.id === portfolioId);
      if (portfolio) {
        methods.reset(portfolio);
      }
    }
  }, [id, isEditMode, methods]);

  const handleSubmit = methods.handleSubmit(() => {
    console.log("Portfolio data:", methods.getValues());
    alert(isEditMode ? "Portfolio project updated successfully!" : "Portfolio project created successfully!");
    methods.reset(defaultValues);
  });

  return (
    <>

      <PageHeader pageTitle={isEditMode ? "Edit Portfolio" : "Add Portfolio"} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <PageHeaderCard
            title={isEditMode ? "Edit Portfolio" : "Add Portfolio"}
            description={isEditMode ? "Update the portfolio project details and save your changes." : "Create a new portfolio project and showcase your work."}
            icon={<IconMessageCircle size={24} />}
            showBackButton
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField<PortfolioFormValues>
                name="title"
                label="Project Title"
                type="text"
                placeholder="Enter project title"
                required
              />
              <FormField<PortfolioFormValues>
                name="category"
                label="Category"
                type="select"
                placeholder="Select category"
                options={[
                  { label: "Web Development", value: "Web Development" },
                  { label: "Mobile App", value: "Mobile App" },
                  { label: "UI/UX Design", value: "UI/UX Design" },
                  { label: "Branding", value: "Branding" },
                  { label: "E-commerce", value: "E-commerce" },
                ]}
                required
              />
              <FormField<PortfolioFormValues>
                name="client"
                label="Client Name"
                type="text"
                placeholder="Enter client name"
                required
              />
              <FormField<PortfolioFormValues>
                name="projectUrl"
                label="Project URL"
                type="text"
                placeholder="Enter project URL"
              />
              <FormField<PortfolioFormValues>
                name="image"
                label="Project Image"
                type="image"
                accept="image/png,image/jpeg,image/webp"
              />
              <FormField<PortfolioFormValues>
                name="status"
                label="Status"
                type="select"
                placeholder="Select status"
                options={[
                  { label: "Completed", value: "completed" },
                  { label: "In Progress", value: "in-progress" },
                  { label: "Draft", value: "draft" },
                ]}
                required
              />
              <FormField<PortfolioFormValues>
                name="description"
                label="Project Description"
                type="textarea"
                placeholder="Write project description..."
                rows={5}
                className="lg:col-span-2"
                required
              />
            </div>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <IconStar className="size-4 text-warning-500" />
                Portfolio Tip
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showcase your best work with high-quality images and detailed descriptions.
                Include client testimonials when possible.
              </p>
            </div>

            <div className="mt-6 flex justify-start">
              <Button
                type="submit"
                size="sm"
                variant="primary"
                startIcon={<IconDeviceFloppy className="size-4" />}
              >
                Save Portfolio
              </Button>
            </div>
          </PageHeaderCard>
        </form>
      </FormProvider>
    </>
  );
};

export default AddPortfolio;
