import { Save } from "lucide-react";
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/admin/Avatar/Avatar";

export default function ProfileSettings({
  profile,
  updateProfile,
  handleSave,
  isSaving,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Profile Information</span>
        </CardTitle>
        <CardDescription>
          Update your personal information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline">Change Avatar</Button>
            <p className="text-sm text-muted-foreground">JPG, PNG up to 2MB</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => updateProfile("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => updateProfile("email", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => updateProfile("bio", e.target.value)}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={profile.timezone}
              onValueChange={(value) => updateProfile("timezone", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC-12">UTC-12 (Baker Island)</SelectItem>
                <SelectItem value="UTC-8">UTC-8 (PST)</SelectItem>
                <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                <SelectItem value="UTC+8">UTC+8 (CST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={profile.language}
              onValueChange={(value) => updateProfile("language", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="German">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => handleSave("profile")} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
