import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IconEdit, IconUpload } from "@tabler/icons-react";
import PageHeader from "../../components/common/PageHeader";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";

type AssetKey = "logo" | "favicon" | "metaFavicon" | "appFavicon";

type AssetItem = {
    key: AssetKey;
    title: string;
};

const brandingAssets: AssetItem[] = [
    { key: "logo", title: "Website Logo" },
    { key: "favicon", title: "Website Favicon" },
    { key: "metaFavicon", title: "Meta Favicon" },
    { key: "appFavicon", title: "App Favicon" },
];

type UploadCardProps = {
    title: string;
    disabled: boolean;
    preview?: string;
    onDrop: (files: File[]) => void;
};

const UploadCard = ({ title, disabled, preview, onDrop }: UploadCardProps) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        disabled,
        multiple: false,
        accept: {
            "image/png": [],
            "image/jpeg": [],
            "image/webp": [],
            "image/svg+xml": [],
            "image/x-icon": [],
        },
    });

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                {title}
            </h3>

            <div
                {...getRootProps()}
                className={`flex min-h-[198px] items-center justify-center rounded-2xl border border-dashed bg-gray-50 px-6 text-center transition dark:bg-gray-900 ${disabled
                    ? "cursor-not-allowed border-gray-200 opacity-70 dark:border-gray-800"
                    : "cursor-pointer border-gray-200 hover:border-brand-500 dark:border-gray-700 dark:hover:border-brand-500"
                    } ${isDragActive
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-500/[0.08]"
                        : ""
                    }`}
            >
                <input {...getInputProps()} />
                {preview ? (
                    <img
                        src={preview}
                        alt={title}
                        className="max-h-32 max-w-full object-contain"
                    />
                ) : (
                    <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                        <IconUpload className="mb-3 size-9 text-gray-400 dark:text-gray-500" />
                        <span className="text-sm">
                            {isDragActive ? "Drop Image Here" : "Upload Image"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

const LogoFavicon = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [files, setFiles] = useState<Partial<Record<AssetKey, File>>>({});

    const previews = useMemo(() => {
        return Object.entries(files).reduce<Partial<Record<AssetKey, string>>>(
            (previewMap, [key, file]) => {
                if (file) {
                    previewMap[key as AssetKey] = URL.createObjectURL(file);
                }
                return previewMap;
            },
            {}
        );
    }, [files]);

    useEffect(() => {
        return () => {
            Object.values(previews).forEach((preview) => {
                if (preview) {
                    URL.revokeObjectURL(preview);
                }
            });
        };
    }, [previews]);

    const handleDrop = (key: AssetKey, acceptedFiles: File[]) => {
        const [file] = acceptedFiles;

        if (!file) {
            return;
        }

        setFiles((prev) => ({
            ...prev,
            [key]: file,
        }));
    };

    return (
        <>
            <PageMeta
                title="React.js Logo & Favicon Settings Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Logo & Favicon Settings Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageHeader pageTitle="Logo & Favicon Settings" />

            <div>
                <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Logo & Favicon
                        </h2>
                        <p className="mt-1 text-sm text-brand-700 dark:text-brand-300">
                            Manage your website logos and icons
                        </p>
                    </div>

                    <Button
                        type="button"
                        size="sm"
                        variant={isEditMode ? "primary" : "outline"}
                        onClick={() => setIsEditMode((prev) => !prev)}
                        startIcon={<IconEdit className="size-4" />}
                        className="border border-error-500 text-error-500 shadow-theme-sm"
                    >
                        {isEditMode ? "Editing " : "Edit "}
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {brandingAssets.map((asset) => (
                        <UploadCard
                            key={asset.key}
                            title={asset.title}
                            disabled={!isEditMode}
                            preview={previews[asset.key]}
                            onDrop={(acceptedFiles) => handleDrop(asset.key, acceptedFiles)}
                        />
                    ))}
                </div>

                <div className="mt-6 flex justify-start">
                    <Button type="button" size="sm" variant="primary" disabled={!isEditMode}>
                        Submit
                    </Button>
                </div>
            </div>
        </>
    );
};

export default LogoFavicon;
