import { IconCode, IconEye } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import TextEditorWrapper from "../../components/editor/Editor";
import { FormField } from "../../components/form/FormField";
import Button from "../../components/ui/button/Button";
import PageHeader from "../../components/common/PageHeader";

const emailTemplateSchema = z.object({
    templateName: z.string().trim().min(1, "Template Name is required."),
    fromEmail: z
        .string()
        .trim()
        .min(1, "From Email is required.")
        .email("Please enter a valid from email."),
    subject: z.string().trim().min(1, "Subject is required."),
    htmlContent: z.string().trim().min(1, "HTML Content is required."),
});

type EmailTemplateFormValues = z.infer<typeof emailTemplateSchema>;

const defaultValues: EmailTemplateFormValues = {
    templateName: "",
    fromEmail: "",
    subject: "",
    htmlContent: "",
};

const EmailTemplate = () => {
    const methods = useForm<EmailTemplateFormValues>({
        resolver: zodResolver(emailTemplateSchema),
        defaultValues,
    });
    const htmlContent = methods.watch("htmlContent");
    const editorError = methods.formState.errors.htmlContent?.message;

    const handleSubmit = methods.handleSubmit(() => { });

    return (
        <>
        <PageHeader pageTitle="Email Templates" />

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">
                            <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-6 dark:border-gray-800">
                                <IconCode className="size-5 text-brand-500" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    HTML Content Editor
                                </h3>
                            </div>

                            <div className="space-y-5 p-6">
                                <FormField<EmailTemplateFormValues>
                                    name="templateName"
                                    label="Template Name"
                                    type="text"
                                    required
                                />

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <FormField<EmailTemplateFormValues>
                                        name="fromEmail"
                                        label="From Email"
                                        type="email"
                                        required
                                    />
                                    <FormField<EmailTemplateFormValues>
                                        name="subject"
                                        label="Subject"
                                        type="text"
                                        required
                                    />
                                </div>

                                <div>
                                    <TextEditorWrapper
                                        name="htmlContent"
                                        placeholder="Paste your <html> code here..."
                                        height="205px"
                                    />
                                    {editorError && (
                                        <p className="mt-1.5 text-xs text-error-500">
                                            {editorError}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    size="md"
                                    variant="primary"
                                    className="w-full rounded-2xl bg-[#ff5738] py-4 text-base hover:bg-[#ef4b2e]"
                                >
                                    Save Template
                                </Button>
                            </div>
                        </div>

                        <div className="min-h-[656px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">
                            <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-6 dark:border-gray-800">
                                <IconEye className="size-5 text-success-500" />
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    Email Preview
                                </h3>
                            </div>

                            <div className="flex min-h-[560px] items-start justify-center p-8">
                                {htmlContent ? (
                                    <div
                                        className="prose max-w-none text-gray-800 dark:prose-invert dark:text-gray-200"
                                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                                    />
                                ) : (
                                    <div className="pt-16 text-center text-base text-gray-400 dark:text-gray-500">
                                        Design will appear here...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default EmailTemplate;
