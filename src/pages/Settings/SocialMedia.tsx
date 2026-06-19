import { IconEdit } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Card from "../../components/common/Card";
import ContainerCard from "../../components/common/ContainerCard";
import PageHeader from "../../components/common/PageHeader";
import { FormField } from "../../components/form/FormField";
import Button from "../../components/ui/button/Button";

const socialMediaItems = [
  { key: "whatsapp", label: "Whatsapp" },
  { key: "facebook", label: "Facebook" },
  { key: "twitter", label: "Twitter" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "Youtube" },
] as const;

const socialMediaFieldSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "URL is required.")
    .url("Please enter a valid URL."),
  icon: z.string().trim().min(1, "ICON is required."),
});

const socialMediaSchema = z.object({
  socialLinks: z.object(
    Object.fromEntries(
      socialMediaItems.map((item) => [item.key, socialMediaFieldSchema])
    ) as Record<(typeof socialMediaItems)[number]["key"], typeof socialMediaFieldSchema>
  ),
});

type SocialMediaFormValues = z.infer<typeof socialMediaSchema>;

const defaultValues: SocialMediaFormValues = {
  socialLinks: Object.fromEntries(
    socialMediaItems.map((item) => [
      item.key,
      {
        url: "",
        icon: "",
      },
    ])
  ) as SocialMediaFormValues["socialLinks"],
};

const SocialMedia = () => {
  const methods = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues,
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = methods.handleSubmit(() => {
    setIsEditMode(false);
  });

  return (
    <>

      <PageHeader pageTitle="Social Media Settings" />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <ContainerCard>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Social Media
              </h3>
              <Button
                type="button"
                size="sm"
                variant={isEditMode ? "primary" : "outline"}
                onClick={() => setIsEditMode((prev) => !prev)}
                startIcon={<IconEdit className="size-4" />}
              >
                {isEditMode ? "Edit" : "Edit Mode"}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {socialMediaItems.map((item) => (
                <Card key={item.key} title={item.label}>
                  <FormField<SocialMediaFormValues>
                    name={`socialLinks.${item.key}.url`}
                    label="URL"
                    type="text"
                    required
                    disabled={!isEditMode}
                  />
                  <FormField<SocialMediaFormValues>
                    name={`socialLinks.${item.key}.icon`}
                    label="ICON"
                    type="text"
                    required
                    placeholder="Icon class or URL"
                    disabled={!isEditMode}
                  />
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-start">
              <Button
                type="submit"
                size="sm"
                variant="primary"
                disabled={!isEditMode}
              >
                Submit
              </Button>
            </div>
          </ContainerCard>
        </form>
      </FormProvider>
    </>
  );
};

export default SocialMedia;
