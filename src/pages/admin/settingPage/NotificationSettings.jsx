import { Save } from "lucide-react";
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

export default function NotificationSettings({
  notifications,
  updateNotifications,
  handleSave,
  isSaving,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Notification Preferences</span>
        </CardTitle>
        <CardDescription>
          Configure how you want to receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Email Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Student Registration</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when new students join
                </p>
              </div>
              <Switch
                checked={notifications.emailNewStudent}
                onCheckedChange={(checked) =>
                  updateNotifications("emailNewStudent", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Course Completions</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates when courses are completed
                </p>
              </div>
              <Switch
                checked={notifications.emailNewCourse}
                onCheckedChange={(checked) =>
                  updateNotifications("emailNewCourse", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly analytics summaries
                </p>
              </div>
              <Switch
                checked={notifications.emailWeeklyReport}
                onCheckedChange={(checked) =>
                  updateNotifications("emailWeeklyReport", checked)
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Push Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Reviews</Label>
                <p className="text-sm text-muted-foreground">
                  Instant notifications for new course reviews
                </p>
              </div>
              <Switch
                checked={notifications.pushNewReview}
                onCheckedChange={(checked) =>
                  updateNotifications("pushNewReview", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Engagement Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Alerts when course engagement drops
                </p>
              </div>
              <Switch
                checked={notifications.pushLowEngagement}
                onCheckedChange={(checked) =>
                  updateNotifications("pushLowEngagement", checked)
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => handleSave("notifications")}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
