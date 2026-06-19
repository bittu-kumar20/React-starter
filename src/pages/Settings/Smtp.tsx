import { useState } from "react";
import {
    IconEdit,
    IconInfoCircle,
    IconMail,
    IconSettings,
} from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormField } from "../../components/form/FormField";
import Button from "../../components/ui/button/Button";
import PageHeader from "../../components/common/PageHeader";

const smtpSchema = z.object({
    host: z.string().trim().min(1, "SMTP Host is required."),
    port: z
        .string()
        .trim()
        .min(1, "SMTP Port is required.")
        .regex(/^\d+$/, "SMTP Port must be a number.")
        .refine((value) => {
            const port = Number(value);
            return port >= 1 && port <= 65535;
        }, "SMTP Port must be between 1 and 65535."),
    username: z
        .string()
        .trim()
        .min(1, "SMTP Username is required.")
        .email("Please enter a valid username email."),
    password: z.string().trim().min(1, "SMTP Password is required."),
    encryption: z.enum(["none", "ssl", "tls"], {
        message: "Encryption is required.",
    }),
    fromEmail: z
        .string()
        .trim()
        .min(1, "From Email is required.")
        .email("Please enter a valid from email."),
    fromName: z.string().trim().min(1, "From Name is required."),
    enableSmtp: z.boolean(),
    testEmail: z.string(),
});

type SmtpFormValues = z.infer<typeof smtpSchema>;

const defaultValues: SmtpFormValues = {
    host: "",
    port: "",
    username: "",
    password: "",
    encryption: "tls",
    fromEmail: "",
    fromName: "",
    enableSmtp: false,
    testEmail: "",
};

const Smtp = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const methods = useForm<SmtpFormValues>({
        resolver: zodResolver(smtpSchema),
        defaultValues,
    });

    const handleSubmit = methods.handleSubmit(() => {
        setIsEditMode(false);
    });

    const handleSendTestEmail = () => {
        const testEmail = methods.getValues("testEmail").trim();
        const result = z
            .string()
            .min(1, "Test Email Address is required.")
            .email("Please enter a valid test email.")
            .safeParse(testEmail);

        if (!result.success) {
            methods.setError("testEmail", {
                type: "manual",
                message: result.error.issues[0]?.message,
            });
            return;
        }

        methods.clearErrors("testEmail");
    };

    return (
        <>
           
            <PageHeader pageTitle="SMTP Settings" />

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            SMTP Settings
                        </h2>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setIsEditMode((prev) => !prev)}
                            startIcon={<IconEdit className="size-4" />}
                            className="shadow-theme-sm"
                        >
                            Edit
                        </Button>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-7 flex items-center gap-2">
                            <IconSettings className="size-5 text-gray-700 dark:text-gray-300" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                SMTP Configuration
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-2">
                            <FormField<SmtpFormValues>
                                name="host"
                                label="SMTP Host"
                                type="text"
                                placeholder="smtp.gmail.com"
                                disabled={!isEditMode}
                                required
                            />
                            <FormField<SmtpFormValues>
                                name="port"
                                label="SMTP Port"
                                type="text"
                                placeholder="587"
                                inputMode="numeric"
                                maxLength={5}
                                disabled={!isEditMode}
                                required
                            />
                            <FormField<SmtpFormValues>
                                name="username"
                                label="SMTP Username"
                                type="email"
                                placeholder="info@urlwebwala.com"
                                disabled={!isEditMode}
                                required
                            />
                            <FormField<SmtpFormValues>
                                name="password"
                                label="SMTP Password"
                                type="password"
                                placeholder="********"
                                disabled={!isEditMode}
                                required
                            />
                            <FormField<SmtpFormValues>
                                name="encryption"
                                label="Encryption"
                                type="select"
                                placeholder="Select encryption"
                                options={[
                                    { label: "None", value: "none" },
                                    { label: "SSL", value: "ssl" },
                                    { label: "TLS", value: "tls" },
                                ]}
                                disabled={!isEditMode}
                                required
                            />
                            <FormField<SmtpFormValues>
                                name="fromEmail"
                                label="From Email"
                                type="email"
                                placeholder="no-reply@yourapp.com"
                                disabled={!isEditMode}
                                required
                            />
                            <FormField<SmtpFormValues>
                                name="fromName"
                                label="From Name"
                                type="text"
                                placeholder="Your App"
                                disabled={!isEditMode}
                                required
                            />

                            <Controller
                                name="enableSmtp"
                                control={methods.control}
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                            Enable SMTP
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-700 dark:text-gray-400">
                                                No
                                            </span>
                                            <button
                                                type="button"
                                                disabled={!isEditMode}
                                                onClick={() => field.onChange(!field.value)}
                                                className={`relative h-6 w-12 rounded-full transition ${field.value
                                                    ? "bg-brand-500"
                                                    : "bg-gray-300 dark:bg-gray-700"
                                                    } ${!isEditMode
                                                        ? "cursor-not-allowed opacity-60"
                                                        : "cursor-pointer"
                                                    }`}
                                                aria-pressed={field.value}
                                            >
                                                <span
                                                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-theme-sm transition ${field.value ? "left-6" : "left-0.5"
                                                        }`}
                                                />
                                            </button>
                                            <span className="text-sm text-gray-700 dark:text-gray-400">
                                                Yes
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Enable to start using SMTP for sending emails
                                        </p>
                                    </div>
                                )}
                            />
                        </div>

                        <div className="mt-8">
                            <Button
                                type="submit"
                                size="md"
                                variant="primary"
                                disabled={!isEditMode}
                                className="bg-[#f47f9f] hover:bg-[#ef6f93] disabled:bg-[#f7b6c8]"
                            >
                                Save Settings
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,2fr)]">
                            <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                                <div className="mb-7 flex items-center gap-3">
                                    <IconMail className="size-6 text-gray-800 dark:text-white/90" />
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Test Email
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    <FormField<SmtpFormValues>
                                        name="testEmail"
                                        label="Test Email Address"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        disabled={!isEditMode}
                                    />

                                    <Button
                                        type="button"
                                        size="md"
                                        variant="primary"
                                        disabled={!isEditMode}
                                        onClick={handleSendTestEmail}
                                        className="w-full bg-[#f31247] hover:bg-[#dc0f3f] disabled:bg-[#f78fa8]"
                                    >
                                        Send Test Email
                                    </Button>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                                <div className="mb-7 flex items-center gap-3">
                                    <IconInfoCircle className="size-5 text-gray-800 dark:text-white/90" />
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Email Preview
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 gap-6 text-base leading-6 text-gray-800 dark:text-gray-300 md:grid-cols-3">
                                    <p>Send a test email to see the preview</p>
                                    <p>Send a test email to see the preview</p>
                                    <p>Send a test email to see the preview</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default Smtp;
