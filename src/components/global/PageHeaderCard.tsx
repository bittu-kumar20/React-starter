import type { ReactNode } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import Button from "../ui/button/Button";

type PageHeaderCardProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  showBackButton?: boolean;
  backLabel?: string;
  onBack?: () => void;
  className?: string;
  contentClassName?: string;
};

const PageHeaderCard = ({
  title,
  description,
  icon,
  action,
  children,
  showBackButton = false,
  backLabel = "Back",
  onBack,
  className = "",
  contentClassName = "",
}: PageHeaderCardProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    navigate(-1);
  };

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 dark:border-gray-800 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="flex shrink-0 text-gray-500 dark:text-gray-400">
                {icon}
              </span>
            )}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {title}
            </h3>
          </div>

          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {showBackButton && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleBack}
              startIcon={<IconArrowLeft className="size-4" />}
            >
              {backLabel}
            </Button>
          )}
          {action}
        </div>
      </div>

      {children && (
        <div className={`p-5 sm:p-6 ${contentClassName}`}>{children}</div>
      )}
    </div>
  );
};

export default PageHeaderCard;
