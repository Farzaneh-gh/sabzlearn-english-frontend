import { Save, Key } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/admin/Card/Card";
import { Button } from "../../../components/admin/Button/Button";
import { Label } from "../../../components/admin/Label/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/admin/Select/Select";
import { Badge } from "../../../components/admin/Badge/Badge";
import { Alert, AlertDescription } from "../../../components/admin/Alert/Alert";
import { Separator } from "../../../components/admin/Separator/Separator";

export default function SecuritySettings({
  security,
  updateSecurity,
  handleSave,
  isSaving,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Security Settings</span>
        </CardTitle>
        <CardDescription>
          Manage your account security and authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={security.twoFactorEnabled ? "default" : "secondary"}
              >
                {security.twoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
              <Button variant="outline" size="sm">
                {security.twoFactorEnabled ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
              <Select
                value={security.sessionTimeout}
                onValueChange={(value) =>
                  updateSecurity("sessionTimeout", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="168">1 week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loginAttempts">Max Login Attempts</Label>
              <Select
                value={security.loginAttempts}
                onValueChange={(value) =>
                  updateSecurity("loginAttempts", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="10">10 attempts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passwordPolicy">Password Policy</Label>
            <Select
              value={security.passwordPolicy}
              onValueChange={(value) => updateSecurity("passwordPolicy", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                <SelectItem value="strong">
                  Strong (8+ chars, mixed case, numbers)
                </SelectItem>
                <SelectItem value="very-strong">
                  Very Strong (12+ chars, symbols)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Alert>
          <Key className="h-4 w-4" />
          <AlertDescription>
            Changes to security settings will require you to re-authenticate on
            your next login.
          </AlertDescription>
        </Alert>

        <div className="flex justify-end">
          <Button onClick={() => handleSave("security")} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Updating..." : "Update Security"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
