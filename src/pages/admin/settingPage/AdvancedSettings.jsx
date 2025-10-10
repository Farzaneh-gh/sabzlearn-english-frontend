import { Save, Mail, Database } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/admin/Card/Card";
import { Button } from "../../../components/admin/Button/Button";
import { Label } from "../../../components/admin/Label/Label";
import { Switch } from "../../../components/admin/Switch/Switch";
import { Separator } from "../../../components/admin/Separator/Separator";
import { Alert, AlertDescription } from "../../../components/admin/Alert/Alert";

export default function AdvancedSettings({
  platform,
  updatePlatform,
  handleSave,
  isSaving,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Advanced Settings</span>
        </CardTitle>
        <CardDescription>Advanced configuration options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Temporarily disable access for system maintenance
              </p>
            </div>
            <Switch
              checked={platform.maintenanceMode}
              onCheckedChange={(checked) =>
                updatePlatform("maintenanceMode", checked)
              }
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Data Management</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Test Email
            </Button>
          </div>
        </div>

        <Alert>
          <AlertDescription>
            These settings should only be modified by experienced
            administrators. Changes may affect platform functionality.
          </AlertDescription>
        </Alert>

        <div className="flex justify-end">
          <Button onClick={() => handleSave("advanced")} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Advanced Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
