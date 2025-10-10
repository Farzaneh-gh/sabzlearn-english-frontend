/**
 * Mock Settings Data
 * Contains default settings data for the admin settings page
 */

export const mockSettings = {
  profile: {
    name: "John Administrator",
    email: "admin@sabzlearn.com",
    bio: "Course platform administrator with 5+ years of experience in educational technology. Passionate about creating engaging learning experiences and empowering educators.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    timezone: "UTC-8",
    language: "English",
  },

  notifications: {
    // Email Notifications
    emailNewStudent: true,
    emailNewCourse: false,
    emailWeeklyReport: true,
    emailCourseCompletion: true,
    emailNewReview: false,
    emailSystemUpdates: true,

    // Push Notifications
    pushNewReview: true,
    pushLowEngagement: false,
    pushNewEnrollment: true,
    pushCoursePublished: true,

    // SMS Notifications (optional)
    smsImportant: false,
    smsSecurityAlerts: true,
  },

  security: {
    twoFactorEnabled: false,
    sessionTimeout: "24", // hours
    passwordPolicy: "strong", // basic, strong, very-strong
    loginAttempts: "5", // max failed attempts
    ipWhitelist: [],
    apiKeyRotation: "30", // days
    lastPasswordChange: "2025-09-15T10:30:00Z",
    activeSessions: 2,
  },

  platform: {
    // Site Information
    siteName: "SabzLearn Academy",
    siteDescription:
      "Professional course management platform for English learning and programming courses",
    contactEmail: "support@sabzlearn.com",
    supportEmail: "help@sabzlearn.com",
    siteUrl: "https://sabzlearn.com",

    // User Registration Settings
    allowRegistration: true,
    requireEmailVerification: true,
    defaultUserRole: "student", // student, instructor, admin
    autoApproveInstructors: false,

    // Course Settings
    allowFreeEnrollment: true,
    requireCourseApproval: true,
    defaultCourseVisibility: "public", // public, private, unlisted

    // Platform Features
    maintenanceMode: false,
    enableForums: true,
    enableChat: true,
    enableCertificates: true,
  },

  advanced: {
    // Theme & Appearance
    defaultTheme: "light", // light, dark, system
    customCss: "",

    // Performance
    cacheEnabled: true,
    cacheDuration: "3600", // seconds

    // API Configuration
    apiRateLimit: "100", // requests per minute
    apiVersion: "v1",

    // Database
    backupFrequency: "daily", // daily, weekly, monthly
    lastBackup: "2025-10-06T02:00:00Z",
    databaseSize: "2.4 GB",

    // Maintenance
    maintenanceSchedule: {
      enabled: false,
      startTime: "02:00",
      duration: "2", // hours
      frequency: "weekly", // daily, weekly, monthly
    },

    // Email Settings
    emailProvider: "sendgrid", // sendgrid, mailgun, ses, smtp
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpSecure: true,

    // Analytics
    analyticsEnabled: true,
    googleAnalyticsId: "",

    // Feature Flags
    betaFeatures: {
      aiRecommendations: false,
      liveStreaming: true,
      gamification: false,
    },
  },

  // System Information
  system: {
    version: "2.5.1",
    lastUpdate: "2025-09-28T14:30:00Z",
    environment: "production", // development, staging, production
    serverStatus: "healthy",
    uptime: "45 days",
    totalUsers: 12847,
    totalCourses: 325,
    totalInstructors: 48,
    storageUsed: "45.2 GB",
    storageLimit: "100 GB",
  },
};

/**
 * Timezone options for the platform
 */
export const timezoneOptions = [
  { value: "UTC-12", label: "UTC-12 (Baker Island)" },
  { value: "UTC-11", label: "UTC-11 (American Samoa)" },
  { value: "UTC-10", label: "UTC-10 (Hawaii)" },
  { value: "UTC-9", label: "UTC-9 (Alaska)" },
  { value: "UTC-8", label: "UTC-8 (Pacific Time)" },
  { value: "UTC-7", label: "UTC-7 (Mountain Time)" },
  { value: "UTC-6", label: "UTC-6 (Central Time)" },
  { value: "UTC-5", label: "UTC-5 (Eastern Time)" },
  { value: "UTC-4", label: "UTC-4 (Atlantic Time)" },
  { value: "UTC-3", label: "UTC-3 (Buenos Aires)" },
  { value: "UTC-2", label: "UTC-2 (Mid-Atlantic)" },
  { value: "UTC-1", label: "UTC-1 (Azores)" },
  { value: "UTC+0", label: "UTC+0 (London, GMT)" },
  { value: "UTC+1", label: "UTC+1 (Paris, Berlin)" },
  { value: "UTC+2", label: "UTC+2 (Cairo, Athens)" },
  { value: "UTC+3", label: "UTC+3 (Moscow, Baghdad)" },
  { value: "UTC+3.5", label: "UTC+3:30 (Tehran)" },
  { value: "UTC+4", label: "UTC+4 (Dubai)" },
  { value: "UTC+4.5", label: "UTC+4:30 (Kabul)" },
  { value: "UTC+5", label: "UTC+5 (Karachi)" },
  { value: "UTC+5.5", label: "UTC+5:30 (Mumbai, Delhi)" },
  { value: "UTC+5.75", label: "UTC+5:45 (Kathmandu)" },
  { value: "UTC+6", label: "UTC+6 (Dhaka)" },
  { value: "UTC+6.5", label: "UTC+6:30 (Yangon)" },
  { value: "UTC+7", label: "UTC+7 (Bangkok, Jakarta)" },
  { value: "UTC+8", label: "UTC+8 (Beijing, Singapore)" },
  { value: "UTC+9", label: "UTC+9 (Tokyo, Seoul)" },
  { value: "UTC+9.5", label: "UTC+9:30 (Adelaide)" },
  { value: "UTC+10", label: "UTC+10 (Sydney, Melbourne)" },
  { value: "UTC+11", label: "UTC+11 (Solomon Islands)" },
  { value: "UTC+12", label: "UTC+12 (Auckland, Fiji)" },
];

/**
 * Language options for the platform
 */
export const languageOptions = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Chinese", label: "Chinese (Simplified)" },
  { value: "Japanese", label: "Japanese" },
  { value: "Korean", label: "Korean" },
  { value: "Arabic", label: "Arabic" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Russian", label: "Russian" },
  { value: "Hindi", label: "Hindi" },
  { value: "Italian", label: "Italian" },
];

/**
 * Password policy options
 */
export const passwordPolicyOptions = [
  {
    value: "basic",
    label: "Basic (8+ characters)",
    description: "Minimum 8 characters",
  },
  {
    value: "strong",
    label: "Strong (8+ chars, mixed case, numbers)",
    description: "8+ characters with uppercase, lowercase, and numbers",
  },
  {
    value: "very-strong",
    label: "Very Strong (12+ chars, symbols)",
    description:
      "12+ characters with uppercase, lowercase, numbers, and symbols",
  },
];

/**
 * User role options
 */
export const userRoleOptions = [
  {
    value: "student",
    label: "Student",
    description: "Can enroll in courses and access learning materials",
  },
  {
    value: "instructor",
    label: "Instructor",
    description: "Can create and manage courses",
  },
  {
    value: "admin",
    label: "Administrator",
    description: "Full access to all platform features",
  },
];

/**
 * Email provider options
 */
export const emailProviderOptions = [
  { value: "sendgrid", label: "SendGrid" },
  { value: "mailgun", label: "Mailgun" },
  { value: "ses", label: "Amazon SES" },
  { value: "smtp", label: "Custom SMTP" },
];

/**
 * Get settings data by section
 */
export const getSettingsBySection = (section) => {
  return mockSettings[section] || {};
};

/**
 * Get all settings
 */
export const getAllSettings = () => {
  return mockSettings;
};

/**
 * Update settings (mock function - replace with API call)
 */
export const updateSettings = async (section, data) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate successful update
  return {
    success: true,
    message: `${section} settings updated successfully`,
    data: { ...mockSettings[section], ...data },
  };
};

export default mockSettings;
