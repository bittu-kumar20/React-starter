
import { IconTag } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { Modal } from "../ui/modal";
import { FormField } from "../form/FormField";
import Button from "../ui/button/Button";

const categorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required."),
  url: z.string().trim().min(1, "Category URL is required."),
  description: z.string().trim().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const defaultValues: CategoryFormValues = {
  name: "",
  url: "",
  description: "",
};

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  editingCategory?: {
    id: number;
    name: string;
    description: string;
    postCount?: number;
    color?: string;
    status?: string;
    createdAt?: string;
    lastPost?: string;
    lastPostDate?: string;
    projectCount?: number;
  } | null;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editingCategory,
}) => {
  const isEditMode = !!editingCategory;
  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  // Load category data when editing
  useEffect(() => {
    if (editingCategory) {
      methods.reset({
        name: editingCategory.name,
        url: editingCategory.name.toLowerCase().replace(/\s+/g, '-'),
        description: editingCategory.description,
      });
    } else {
      methods.reset(defaultValues);
    }
  }, [editingCategory, methods]);

  const handleSubmit = methods.handleSubmit(() => {
    console.log("Category data:", methods.getValues());
    alert(isEditMode ? "Category updated successfully!" : "Category added successfully!");
    methods.reset(defaultValues);
    onClose();
    onSuccess?.();
  });

  const handleCancel = () => {
    methods.reset(defaultValues);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} className="max-w-lg">
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900">
              <IconTag className="size-5 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white/90">
              {isEditMode ? "Edit Category" : "Add New Category"}
            </h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isEditMode ? "Update the category details and save your changes" : "Create a new category to organize your blog posts"}
          </p>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <FormField<CategoryFormValues>
                name="name"
                label="Category Name"
                type="text"
                placeholder="Enter category name"
                required
              />
              <FormField<CategoryFormValues>
                name="url"
                label="Category URL"
                type="text"
                placeholder="Enter category URL (e.g., technology)"
                required
              />
              <FormField<CategoryFormValues>
                name="description"
                label="Description"
                type="textarea"
                placeholder="Enter category description"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex items-center gap-2"
              >
                <IconTag className="size-4" />
                {isEditMode ? "Update Category" : "Add Category"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
