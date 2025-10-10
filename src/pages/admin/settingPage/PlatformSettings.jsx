import { Save, Database } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/admin/Card/Card";
import { Button } from "../../../components/admin/Button/Button";
import { Input } from "../../../components/admin/Input/Input";
import { Label } from "../../../components/admin/Label/Label";
import { Textarea } from "../../../components/admin/Textarea/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/admin/Select/Select";
import { Switch } from "../../../components/admin/Switch/Switch";
import { Separator } from "../../../components/admin/Separator/Separator";
import { Alert, AlertDescription } from "../../../components/admin/Alert/Alert";

export default function PlatformSettings({
  platform,
  updatePlatform,
  handleSave,
  isSaving,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Platform Configuration</span>
        </CardTitle>
        <CardDescription>Configure global platform settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={platform.siteName}
              onChange={(e) => updatePlatform("siteName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={platform.contactEmail}
              onChange={(e) => updatePlatform("contactEmail", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="siteDescription">Site Description</Label>
          <Textarea
            id="siteDescription"
            value={platform.siteDescription}
            onChange={(e) => updatePlatform("siteDescription", e.target.value)}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">User Registration</h4>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow New Registrations</Label>
              <p className="text-sm text-muted-foreground">
                Allow new users to create accounts
              </p>
            </div>
            <Switch
              checked={platform.allowRegistration}
              onCheckedChange={(checked) =>
                updatePlatform("allowRegistration", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require Email Verification</Label>
              <p className="text-sm text-muted-foreground">
                Users must verify their email before accessing courses
              </p>
            </div>
            <Switch
              checked={platform.requireEmailVerification}
              onCheckedChange={(checked) =>
                updatePlatform("requireEmailVerification", checked)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultRole">Default User Role</Label>
            <Select
              value={platform.defaultUserRole}
              onValueChange={(value) =>
                updatePlatform("defaultUserRole", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Alert>
          <Database className="h-4 w-4" />
          <AlertDescription>
            Platform changes may take a few minutes to take effect across all
            services.
          </AlertDescription>
        </Alert>

        <div className="flex justify-end">
          <Button onClick={() => handleSave("platform")} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
