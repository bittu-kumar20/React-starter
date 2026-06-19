import PageHeader from "../../../components/common/PageHeader";
import Badge from "../../../components/ui/badge/Badge";
import { IconPlus } from "@tabler/icons-react";
import PageMeta from "../../../components/common/PageMeta";
import ComponentCard from "../../../components/common/Card";

export default function Badges() {
  return (
    <div>
      <PageMeta
        title="React.js Badges Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Badges Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageHeader pageTitle="Badges" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="With Light Background">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Light Variant */}
            <Badge variant="light" color="primary">
              Primary
            </Badge>
            <Badge variant="light" color="success">
              Success
            </Badge>{" "}
            <Badge variant="light" color="error">
              Error
            </Badge>{" "}
            <Badge variant="light" color="warning">
              Warning
            </Badge>{" "}
            <Badge variant="light" color="info">
              Info
            </Badge>
            <Badge variant="light" color="light">
              Light
            </Badge>
            <Badge variant="light" color="dark">
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="With Solid Background">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Light Variant */}
            <Badge variant="solid" color="primary">
              Primary
            </Badge>
            <Badge variant="solid" color="success">
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error">
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning">
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info">
              Info
            </Badge>
            <Badge variant="solid" color="light">
              Light
            </Badge>
            <Badge variant="solid" color="dark">
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Light Background with Left Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="light" color="primary" startIcon={<IconPlus />}>
              Primary
            </Badge>
            <Badge variant="light" color="success" startIcon={<IconPlus />}>
              Success
            </Badge>{" "}
            <Badge variant="light" color="error" startIcon={<IconPlus />}>
              Error
            </Badge>{" "}
            <Badge variant="light" color="warning" startIcon={<IconPlus />}>
              Warning
            </Badge>{" "}
            <Badge variant="light" color="info" startIcon={<IconPlus />}>
              Info
            </Badge>
            <Badge variant="light" color="light" startIcon={<IconPlus />}>
              Light
            </Badge>
            <Badge variant="light" color="dark" startIcon={<IconPlus />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Solid Background with Left Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="solid" color="primary" startIcon={<IconPlus />}>
              Primary
            </Badge>
            <Badge variant="solid" color="success" startIcon={<IconPlus />}>
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error" startIcon={<IconPlus />}>
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning" startIcon={<IconPlus />}>
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info" startIcon={<IconPlus />}>
              Info
            </Badge>
            <Badge variant="solid" color="light" startIcon={<IconPlus />}>
              Light
            </Badge>
            <Badge variant="solid" color="dark" startIcon={<IconPlus />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Light Background with Right Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="light" color="primary" endIcon={<IconPlus />}>
              Primary
            </Badge>
            <Badge variant="light" color="success" endIcon={<IconPlus />}>
              Success
            </Badge>{" "}
            <Badge variant="light" color="error" endIcon={<IconPlus />}>
              Error
            </Badge>{" "}
            <Badge variant="light" color="warning" endIcon={<IconPlus />}>
              Warning
            </Badge>{" "}
            <Badge variant="light" color="info" endIcon={<IconPlus />}>
              Info
            </Badge>
            <Badge variant="light" color="light" endIcon={<IconPlus />}>
              Light
            </Badge>
            <Badge variant="light" color="dark" endIcon={<IconPlus />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Solid Background with Right Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="solid" color="primary" endIcon={<IconPlus />}>
              Primary
            </Badge>
            <Badge variant="solid" color="success" endIcon={<IconPlus />}>
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error" endIcon={<IconPlus />}>
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning" endIcon={<IconPlus />}>
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info" endIcon={<IconPlus />}>
              Info
            </Badge>
            <Badge variant="solid" color="light" endIcon={<IconPlus />}>
              Light
            </Badge>
            <Badge variant="solid" color="dark" endIcon={<IconPlus />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
