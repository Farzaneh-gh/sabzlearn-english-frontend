import { useState } from "react";
import { Alert, AlertDescription } from "../../../components/admin/Alert/Alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/admin/Tabs/Tabs";
import { mockSettings } from "../../../data/mockSettings";
import ProfileSettings from "./ProfileSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import PlatformSettings from "./PlatformSettings";
import AdvancedSettings from "./AdvancedSettings";

export default function SettingsPage() {
  // Initialize state from mock data
  const [profile, setProfile] = useState(mockSettings.profile);
  const [notifications, setNotifications] = useState(
    mockSettings.notifications
  );
  const [platform, setPlatform] = useState(mockSettings.platform);
  const [security, setSecurity] = useState(mockSettings.security);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(null);

  const handleSave = async (section) => {
    setIsSaving(true);
    setSaveSuccess(null);

    // Simulate API call
    setTimeout(() => {
      console.log(
        `Saving ${section} settings:`,
        {
          profile,
          notifications,
          platform,
          security,
        }[section]
      );

      setIsSaving(false);
      setSaveSuccess(section);

      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(null), 3000);
    }, 500);
  };

  // Helper function to update state
  const updateField = (setState) => (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const updateProfile = updateField(setProfile);
  const updateNotifications = updateField(setNotifications);
  const updatePlatform = updateField(setPlatform);
  const updateSecurity = updateField(setSecurity);

  return (
    <div className="w-full max-w-full space-y-8 p-8 bg-white dark:bg-gray-900 mt-8 rounded-t-2xl ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-300">
            Settings
          </h2>
          <p className="mt-1 text-zinc-700 dark:text-zinc-400">
            {" "}
            Manage your account and platform configuration
          </p>
        </div>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <AlertDescription className="text-green-800 dark:text-green-200">
            {saveSuccess.charAt(0).toUpperCase() + saveSuccess.slice(1)}{" "}
            settings saved successfully!
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className=" flex flex-col xs:grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileSettings
            profile={profile}
            updateProfile={updateProfile}
            handleSave={handleSave}
            isSaving={isSaving}
          />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings
            notifications={notifications}
            updateNotifications={updateNotifications}
            handleSave={handleSave}
            isSaving={isSaving}
          />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettings
            security={security}
            updateSecurity={updateSecurity}
            handleSave={handleSave}
            isSaving={isSaving}
          />
        </TabsContent>

        <TabsContent value="platform" className="space-y-6">
          <PlatformSettings
            platform={platform}
            updatePlatform={updatePlatform}
            handleSave={handleSave}
            isSaving={isSaving}
          />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <AdvancedSettings
            platform={platform}
            updatePlatform={updatePlatform}
            handleSave={handleSave}
            isSaving={isSaving}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
