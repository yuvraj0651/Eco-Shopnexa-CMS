import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Settings,
  Globe,
  ShieldCheck,
  Mail,
  Building2,
  Save,
  Upload,
  Activity,
  Users,
  Plug,
} from "lucide-react";

import {
  Card,
  CardContent,
  Button,
  Input,
  Label,
  Switch,
  Badge,
  Textarea,
} from "@/components/UI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSettingsData,
  updateSettings,
} from "@/components/services/SettingsApi";
import { getDatabaseData } from "@/components/services/DatabaseApi";
import { addNewBackup, getBackupData } from "@/components/services/BackupsApi";
import { toast } from "sonner";

const SettingsManagement = () => {
  const { data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const { data: backups } = useQuery({
    queryKey: ["backups"],
    queryFn: getBackupData,
  });

  const [formData, setFormData] = useState({});

  const activeIntegrations = Object.values(formData?.integrations || {}).filter(
    Boolean,
  ).length;

  const totalRoles = formData?.roles?.length || 0;

  const securitySettings = [
    formData?.security?.twoFactorAuth,
    formData?.security?.loginNotifications,
    formData?.security?.strongPasswords,
  ];

  const enabledSecuritySettings = securitySettings.filter(Boolean).length;

  const securityScore = Math.round(
    (enabledSecuritySettings / securitySettings.length) * 100,
  );

  const latestBackup = backups?.[backups.length - 1];

  const systemStatus = formData?.system?.maintenanceMode
    ? "Maintenance"
    : "Healthy";

  useEffect(() => {
    if (settingsData) {
      setFormData(settingsData);
    }
  }, [settingsData]);

  const stats = [
    {
      title: "Active Integrations",
      value: activeIntegrations,
      icon: Plug,
    },
    {
      title: "Admin Users",
      value: totalRoles,
      icon: Users,
    },
    {
      title: "Security Score",
      value: `${securityScore}%`,
      icon: ShieldCheck,
    },
    {
      title: "System Status",
      value: systemStatus,
      icon: Activity,
    },
  ];

  const queryClient = useQueryClient();

  const changeHandler = (section, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const switchHandler = (section, field, checked) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: checked,
      },
    }));
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedItem }) => updateSettings({ id, updatedItem }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });

  const updateSettingsHandler = () =>
    updateMutation.mutate({
      updatedItem: formData,
    });

  const createBackupMutation = useMutation({
    mutationFn: addNewBackup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["backups"],
      });
      toast.success("Backup Created Successfully");
    },
    onError: () => {
      toast.error("Something went wrong while creating backup");
    },
  });

  const createBackupHandler = async () => {
    try {
      const database = await getDatabaseData();
      const { backups, ...restDatabase } = database;

      const backupData = {
        name: `Backup ${new Date().toLocaleString()}`,
        createdAt: new Date().toISOString(),
        data: restDatabase,
      };

      createBackupMutation.mutate(backupData);

      console.log(database);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadBackupHandler = (backup) => {
    const blob = new Blob([JSON.stringify(backup.data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${backup.name}.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Settings Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Configure global CMS settings and system preferences.
          </p>
        </div>

        <Button
          onClick={updateSettingsHandler}
          disabled={updateMutation.isPending}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Save className="mr-2 h-4 w-4" />
          {updateMutation.isPending ? "Saving Changes..." : "Save Changes"}
        </Button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.08,
              }}
            >
              <Card className="rounded-3xl cursor-pointer hover:-translate-y-1 dark:hover:bg-slate-800 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.title}
                      </p>

                      <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
                    </div>

                    <div className="rounded-2xl bg-emerald-500/10 p-3">
                      <Icon className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* General Settings */}

      <Card className="rounded-3xl">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-emerald-600" />

            <h3 className="text-lg font-semibold">General Settings</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Website Name</Label>

              <Input
                placeholder="Eco Shopnexa CMS"
                name="websiteName"
                value={formData?.general?.websiteName || ""}
                onChange={(e) => changeHandler("general", e)}
              />
            </div>

            <div className="space-y-2">
              <Label>Website URL</Label>

              <Input
                placeholder="https://ecoshopnexa.com"
                name="websiteUrl"
                value={formData?.general?.websiteUrl || ""}
                onChange={(e) => changeHandler("general", e)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Website Description</Label>

            <Textarea
              rows={4}
              placeholder="Modern Ecommerce CMS Platform"
              name="description"
              value={formData?.general?.description || ""}
              onChange={(e) => changeHandler("general", e)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Branding */}

      <Card className="rounded-3xl">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-violet-600" />

            <h3 className="text-lg font-semibold">Branding Settings</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Name</Label>

              <Input
                placeholder="Eco Shopnexa"
                name="companyName"
                value={formData?.branding?.companyName || ""}
                onChange={(e) => changeHandler("branding", e)}
              />
            </div>

            <div className="space-y-2">
              <Label>Support Email</Label>

              <Input
                placeholder="support@example.com"
                name="supportEmail"
                value={formData?.branding?.supportEmail || ""}
                onChange={(e) => changeHandler("branding", e)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Logo
            </Button>

            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Favicon
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SEO Defaults */}

      <Card className="rounded-3xl">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-blue-600" />

            <h3 className="text-lg font-semibold">SEO Default Settings</h3>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Default Meta Title"
              name="metaTitle"
              value={formData?.seoDefaults?.metaTitle || ""}
              onChange={(e) => changeHandler("seoDefaults", e)}
            />

            <Input
              placeholder="Default Meta Keywords"
              name="metaKeywords"
              value={formData?.seoDefaults?.metaKeywords || ""}
              onChange={(e) => changeHandler("seoDefaults", e)}
            />

            <Textarea
              rows={4}
              placeholder="Default Meta Description"
              name="metaDescription"
              value={formData?.seoDefaults?.metaDescription || ""}
              onChange={(e) => changeHandler("seoDefaults", e)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}

      <Card className="rounded-3xl">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-orange-600" />

            <h3 className="text-lg font-semibold">Email / SMTP Settings</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="SMTP Host"
              name="smtpHost"
              value={formData?.email?.smtpHost || ""}
              onChange={(e) => changeHandler("email", e)}
            />

            <Input
              placeholder="SMTP Port"
              name="smtpPort"
              value={formData?.email?.smtpPort || ""}
              onChange={(e) => changeHandler("email", e)}
            />

            <Input
              placeholder="SMTP Username"
              name="smtpUser"
              value={formData?.email?.smtpUser || ""}
              onChange={(e) => changeHandler("email", e)}
            />

            <Input
              placeholder="SMTP Password"
              name="smtpPass"
              value={formData?.email?.smtpPass || ""}
              onChange={(e) => changeHandler("email", e)}
            />
          </div>

          <Button variant="outline">Test SMTP Connection</Button>
        </CardContent>
      </Card>
      {/* Security Settings */}

      <Card className="rounded-3xl">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />

            <h3 className="text-lg font-semibold">Security Settings</h3>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-2xl border p-4">
              <div>
                <h4 className="font-medium">Two Factor Authentication</h4>

                <p className="text-sm text-muted-foreground">
                  Require 2FA for admin accounts
                </p>
              </div>

              <Switch
                name="twoFactorAuth"
                checked={formData?.security?.twoFactorAuth ?? false}
                onCheckedChange={(checked) =>
                  switchHandler("security", "twoFactorAuth", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border p-4">
              <div>
                <h4 className="font-medium">Login Notifications</h4>

                <p className="text-sm text-muted-foreground">
                  Notify users on login attempts
                </p>
              </div>

              <Switch
                name="loginNotifications"
                checked={formData?.security?.loginNotifications ?? false}
                onCheckedChange={(checked) =>
                  switchHandler("security", "loginNotifications", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border p-4">
              <div>
                <h4 className="font-medium">Strong Password Policy</h4>

                <p className="text-sm text-muted-foreground">
                  Force secure passwords
                </p>
              </div>

              <Switch
                name="strongPasswords"
                checked={formData?.security?.strongPasswords ?? false}
                onCheckedChange={(checked) =>
                  switchHandler("security", "strongPasswords", checked)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roles & Permissions */}

      <Card className="rounded-3xl">
        <CardContent className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-600" />

            <h3 className="text-lg font-semibold">Roles & Permissions</h3>
          </div>

          <div className="space-y-4">
            {[
              "Super Admin",
              "Admin",
              "Editor",
              "Content Manager",
              "SEO Manager",
            ].map((role) => (
              <div
                key={role}
                className="flex items-center justify-between rounded-2xl border p-4"
              >
                <span className="font-medium">{role}</span>

                <Badge variant="outline">Active</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integrations */}

      <Card className="rounded-3xl">
        <CardContent className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <Plug className="h-5 w-5 text-violet-600" />

            <h3 className="text-lg font-semibold">Connected Integrations</h3>
          </div>

          <div className="space-y-4">
            {[
              "Google Analytics",
              "Google Search Console",
              "Meta Pixel",
              "Stripe",
              "Mailchimp",
              "Cloudinary",
            ].map((integration) => (
              <div
                key={integration}
                className="flex items-center justify-between rounded-2xl border p-4"
              >
                <span>{integration}</span>

                <Badge className="bg-emerald-500/10 text-emerald-600">
                  Connected
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Settings */}

      <Card className="rounded-3xl">
        <CardContent className="space-y-5 p-6">
          <h3 className="text-lg font-semibold">Analytics Settings</h3>

          <Input
            placeholder="Google Analytics Tracking ID"
            name="gaTrackingId"
            value={formData?.analytics?.gaTrackingId || ""}
            onChange={(e) => changeHandler("analytics", e)}
          />

          <Input
            placeholder="Google Tag Manager ID"
            name="gtmId"
            value={formData?.analytics?.gtmId || ""}
            onChange={(e) => changeHandler("analytics", e)}
          />

          <Input
            placeholder="Meta Pixel ID"
            name="metaPixelId"
            value={formData?.analytics?.metaPixelId || ""}
            onChange={(e) => changeHandler("analytics", e)}
          />
        </CardContent>
      </Card>

      {/* Maintenance Mode */}

      <Card className="rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between rounded-2xl border p-4">
            <div>
              <h4 className="font-semibold">Maintenance Mode</h4>

              <p className="text-sm text-muted-foreground">
                Temporarily disable public access
              </p>
            </div>

            <Switch
              name="maintenanceMode"
              checked={formData?.system?.maintenanceMode ?? false}
              onCheckedChange={(checked) =>
                switchHandler("security", "maintenanceMode", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Backup & Restore */}

      <Card className="rounded-3xl">
        <CardContent className="space-y-5 p-6">
          <h3 className="text-lg font-semibold">Backup & Restore</h3>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              disabled={createBackupMutation.isPending}
              onClick={createBackupHandler}
            >
              {createBackupMutation.isPending
                ? "Creating Backup"
                : "Create Backup"}
            </Button>

            <div className="space-y-3">
              {backups?.map((backup) => (
                <div
                  key={backup.id}
                  className="flex items-center justify-between rounded-xl border p-4 gap-2"
                >
                  <div>
                    <p className="font-medium">{backup.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(backup.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => downloadBackupHandler(latestBackup)}
                  >
                    Download Backup
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="outline">Restore Backup</Button>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="font-medium">Last Backup</p>

            <p className="text-sm text-muted-foreground">
              10 June 2026 - 02:45 AM
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent System Activity */}

      <Card className="rounded-3xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-lg font-semibold">Recent System Activity</h3>

          <div className="space-y-4">
            {[
              "SEO settings updated",
              "New admin invited",
              "Backup created successfully",
              "SMTP settings changed",
              "Maintenance mode disabled",
              "Cloudinary integration connected",
            ].map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-4 rounded-2xl border p-4"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500" />

                <div className="flex-1">
                  <p className="font-medium">{activity}</p>

                  <span className="text-xs text-muted-foreground">
                    2 hours ago
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManagement;
