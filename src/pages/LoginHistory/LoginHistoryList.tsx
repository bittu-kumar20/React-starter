import { useState } from "react";
import { IconClock, IconDeviceDesktop, IconMapPin, IconShield } from "@tabler/icons-react";
import PageHeader from "../../components/common/PageHeader";
import PageHeaderCard from "../../components/global/PageHeaderCard";
import Button from "../../components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

// Mock data for login history
const mockLoginHistory = [
  {
    id: 1,
    email: "admin@gmail.com",
    loginTime: "2024-01-15 10:30:45",
    logoutTime: "2024-01-15 18:45:22",
    ipAddress: "192.168.1.100",
    device: "Chrome / Windows 11",
    location: "New Delhi, India",
    status: "success",
    duration: "8h 14m",
  },
  {
    id: 2,
    email: "admin@gmail.com",
    loginTime: "2024-01-14 09:15:30",
    logoutTime: "2024-01-14 17:30:15",
    ipAddress: "192.168.1.105",
    device: "Firefox / Windows 11",
    location: "Mumbai, India",
    status: "success",
    duration: "8h 14m",
  },
  {
    id: 3,
    email: "admin@gmail.com",
    loginTime: "2024-01-13 14:20:10",
    logoutTime: null,
    ipAddress: "192.168.1.110",
    device: "Safari / macOS",
    location: "Bangalore, India",
    status: "active",
    duration: "Active",
  },
  {
    id: 4,
    email: "admin@gmail.com",
    loginTime: "2024-01-12 11:45:55",
    logoutTime: "2024-01-12 12:30:40",
    ipAddress: "192.168.1.115",
    device: "Chrome / Android",
    location: "Chennai, India",
    status: "failed",
    duration: "45m",
  },
  {
    id: 5,
    email: "admin@gmail.com",
    loginTime: "2024-01-11 08:30:20",
    logoutTime: "2024-01-11 16:45:10",
    ipAddress: "192.168.1.120",
    device: "Edge / Windows 10",
    location: "Pune, India",
    status: "success",
    duration: "8h 14m",
  },
];

const LoginHistoryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredHistory = mockLoginHistory.filter((history) => {
    const matchesSearch = history.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         history.ipAddress.includes(searchTerm) ||
                         history.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         history.device.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || history.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <IconShield className="size-4 text-green-600 dark:text-green-400" />;
      case "active":
        return <IconClock className="size-4 text-blue-600 dark:text-blue-400" />;
      case "failed":
        return <IconShield className="size-4 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageHeader pageTitle="Login History" />

      <PageHeaderCard
        title="Login History"
        description="Track user login sessions and activity"
        showBackButton={false}
      >
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-4">
              <input
                type="text"
                placeholder="Search by email, IP, location, device..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="active">Active</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <Button
              variant="primary"
              className="flex items-center gap-2"
            >
              Export CSV
            </Button>
          </div>

          {/* Login History Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Login Time
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Logout Time
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      IP Address
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Device
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Location
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Duration
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {filteredHistory.map((history) => (
                    <TableRow key={history.id}>
                      <TableCell className="px-5 py-4 text-start text-theme-sm dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <IconShield className="size-4 text-gray-400" />
                          <span className="font-medium text-gray-800 dark:text-white/90">
                            {history.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <IconClock className="size-4 text-gray-400" />
                          {history.loginTime}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {history.logoutTime || (
                          <span className="text-blue-600 dark:text-blue-400">Active Session</span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 font-mono">
                        {history.ipAddress}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <IconDeviceDesktop className="size-4 text-gray-400" />
                          {history.device}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <IconMapPin className="size-4 text-gray-400" />
                          {history.location}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 font-medium">
                        {history.duration}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(history.status)}
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(history.status)}`}>
                            {history.status}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </PageHeaderCard>
    </>
  );
};

export default LoginHistoryList;
