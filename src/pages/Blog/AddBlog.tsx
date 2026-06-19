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

const blogSchema = z.object({
  title: z.string().trim().min(1, "Blog title is required."),
  category: z.string().trim().min(1, "Category is required."),
  author: z.string().trim().min(1, "Author is required."),
  seoUrl: z.string().trim().optional(),
  content: z
    .string()
    .trim()
    .min(1, "Blog content is required.")
    .min(20, "Content must be at least 20 characters."),
  image: z.any().optional(),
  status: z.string().trim().min(1, "Status is required."),
});

type BlogFormValues = z.infer<typeof blogSchema>;

const defaultValues: BlogFormValues = {
  title: "",
  category: "",
  author: "",
  seoUrl: "",
  content: "",
  image: undefined,
  status: "draft",
};

// Mock blog data
const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    category: "Technology",
    author: "John Doe",
    seoUrl: "getting-started-react-hooks",
    content: "React Hooks provide a way to use state and other React features without writing a class. They let you organize component logic into reusable blocks.",
    status: "published",
  },
  {
    id: 2,
    title: "Modern Web Development Trends",
    category: "Technology",
    author: "Jane Smith",
    seoUrl: "modern-web-development-trends",
    content: "Web development is constantly evolving. Stay updated with the latest trends in modern web development including new frameworks, tools, and best practices.",
    status: "draft",
  },
  {
    id: 3,
    title: "Building Scalable Applications",
    category: "Business",
    author: "Mike Johnson",
    seoUrl: "building-scalable-applications",
    content: "Scalability is crucial for growing applications. Learn how to architect and build applications that can handle increased load and user base.",
    status: "published",
  },
  {
    id: 4,
    title: "UI/UX Best Practices",
    category: "Technology",
    author: "Sarah Wilson",
    seoUrl: "ui-ux-best-practices",
    content: "User experience is key to product success. Discover the best practices for creating intuitive and engaging user interfaces.",
    status: "published",
  },
];

const AddBlog = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const methods = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues,
  });

  // Load blog data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const blogId = parseInt(id);
      const blog = mockBlogs.find(b => b.id === blogId);
      if (blog) {
        methods.reset(blog);
      }
    }
  }, [id, isEditMode, methods]);

  const handleSubmit = methods.handleSubmit(() => {
    console.log("Blog data:", methods.getValues());
    alert(isEditMode ? "Blog post updated successfully!" : "Blog post created successfully!");
    methods.reset(defaultValues);
  });

  return (
    <>

      <PageHeader pageTitle={isEditMode ? "Edit Blog" : "Add Blog"} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <PageHeaderCard
            title={isEditMode ? "Edit Blog" : "Add Blog"}
            description={isEditMode ? "Update the blog post details and save your changes." : "Create a new blog post and publish it on your website."}
            icon={<IconMessageCircle size={24} />}
            showBackButton
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField<BlogFormValues>
                name="title"
                label="Blog Title"
                type="text"
                placeholder="Enter blog title"
                required
              />
              <FormField<BlogFormValues>
                name="category"
                label="Category"
                type="select"
                placeholder="Select category"
                options={[
                  { label: "Technology", value: "Technology" },
                  { label: "Business", value: "Business" },
                  { label: "Design", value: "Design" },
                  { label: "Marketing", value: "Marketing" },
                  { label: "Development", value: "Development" },
                  { label: "Tutorial", value: "Tutorial" },
                  { label: "News", value: "News" },
                  { label: "Review", value: "Review" },
                ]}
                required
              />
              <FormField<BlogFormValues>
                name="author"
                label="Author"
                type="text"
                placeholder="Enter author name"
                required
              />
              <FormField<BlogFormValues>
                name="seoUrl"
                label="SEO URL"
                type="text"
                placeholder="Enter SEO-friendly URL"
              />
              <FormField<BlogFormValues>
                name="image"
                label="Featured Image"
                type="image"
                accept="image/png,image/jpeg,image/webp"
              />
              <FormField<BlogFormValues>
                name="status"
                label="Status"
                type="select"
                placeholder="Select status"
                options={[
                  { label: "Published", value: "published" },
                  { label: "Draft", value: "draft" },
                ]}
                required
              />
              <FormField<BlogFormValues>
                name="content"
                label="Blog Content"
                type="textarea"
                placeholder="Write your blog content..."
                rows={5}
                className="lg:col-span-2"
                required
              />
            </div>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <IconStar className="size-4 text-warning-500" />
                Blog Tip
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Write engaging content with proper SEO. Include relevant keywords and
                make your blog posts easy to read and share.
              </p>
            </div>

            <div className="mt-6 flex justify-start">
              <Button
                type="submit"
                size="sm"
                variant="primary"
                startIcon={<IconDeviceFloppy className="size-4" />}
              >
                Save Blog
              </Button>
            </div>
          </PageHeaderCard>
        </form>
      </FormProvider>
    </>
  );
};

export default AddBlog;
