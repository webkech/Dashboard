import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User,
  Shield,
  Bell,
  Globe,
  Key,
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: user?.email || '',
    company: 'WebKech Security',
    timezone: 'UTC-5 (Eastern Time)',
    avatar: ''
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginNotifications: true
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    autoRefresh: true,
    refreshInterval: 30,
    compactView: false,
    soundAlerts: true
  });

  const handleProfileSave = () => {
    console.log('Saving profile:', profile);
  };

  const handleSecuritySave = () => {
    console.log('Saving security settings:', security);
  };

  const handlePreferencesSave = () => {
    console.log('Saving preferences:', preferences);
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and application preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile.avatar} alt="Profile" />
                    <AvatarFallback className="text-lg">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      value={profile.timezone}
                      onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleProfileSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div className="space-y-4">
                  <h4 className="font-medium">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter current password"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Key className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(value) => 
                        setSecurity({ ...security, twoFactorEnabled: value })
                      }
                    />
                  </div>
                  {security.twoFactorEnabled && (
                    <Button variant="outline" size="sm">
                      Configure 2FA
                    </Button>
                  )}
                </div>

                <Separator />

                {/* Session Settings */}
                <div className="space-y-4">
                  <h4 className="font-medium">Session Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        value={security.sessionTimeout}
                        onChange={(e) => setSecurity({ 
                          ...security, 
                          sessionTimeout: parseInt(e.target.value) 
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                      <Input
                        id="password-expiry"
                        type="number"
                        value={security.passwordExpiry}
                        onChange={(e) => setSecurity({ 
                          ...security, 
                          passwordExpiry: parseInt(e.target.value) 
                        })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Login Notifications</h5>
                      <p className="text-sm text-muted-foreground">
                        Get notified of new login attempts
                      </p>
                    </div>
                    <Switch
                      checked={security.loginNotifications}
                      onCheckedChange={(value) => 
                        setSecurity({ ...security, loginNotifications: value })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSecuritySave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Application Preferences</span>
                </CardTitle>
                <CardDescription>
                  Customize your dashboard experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Settings */}
                <div className="space-y-4">
                  <h4 className="font-medium">Appearance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Dark Mode</h5>
                        <p className="text-sm text-muted-foreground">
                          Use dark theme for the interface
                        </p>
                      </div>
                      <Switch
                        checked={preferences.darkMode}
                        onCheckedChange={(value) => 
                          setPreferences({ ...preferences, darkMode: value })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Compact View</h5>
                        <p className="text-sm text-muted-foreground">
                          Use compact layout for data tables
                        </p>
                      </div>
                      <Switch
                        checked={preferences.compactView}
                        onCheckedChange={(value) => 
                          setPreferences({ ...preferences, compactView: value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Dashboard Settings */}
                <div className="space-y-4">
                  <h4 className="font-medium">Dashboard</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Auto Refresh</h5>
                        <p className="text-sm text-muted-foreground">
                          Automatically refresh data
                        </p>
                      </div>
                      <Switch
                        checked={preferences.autoRefresh}
                        onCheckedChange={(value) => 
                          setPreferences({ ...preferences, autoRefresh: value })
                        }
                      />
                    </div>
                    {preferences.autoRefresh && (
                      <div className="space-y-2">
                        <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                        <Input
                          id="refresh-interval"
                          type="number"
                          value={preferences.refreshInterval}
                          onChange={(e) => setPreferences({ 
                            ...preferences, 
                            refreshInterval: parseInt(e.target.value) 
                          })}
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Sound Alerts</h5>
                        <p className="text-sm text-muted-foreground">
                          Play sounds for critical alerts
                        </p>
                      </div>
                      <Switch
                        checked={preferences.soundAlerts}
                        onCheckedChange={(value) => 
                          setPreferences({ ...preferences, soundAlerts: value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handlePreferencesSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Data & Privacy</span>
                </CardTitle>
                <CardDescription>
                  Manage your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Data Export */}
                <div className="space-y-4">
                  <h4 className="font-medium">Data Export</h4>
                  <p className="text-sm text-muted-foreground">
                    Download all your data including scan results, reports, and settings
                  </p>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                </div>

                <Separator />

                {/* Data Retention */}
                <div className="space-y-4">
                  <h4 className="font-medium">Data Retention</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      We keep your scan data for 90 days by default. You can request earlier deletion.
                    </p>
                    <Button variant="outline" size="sm">
                      Request Data Deletion
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Account Deletion */}
                <div className="space-y-4">
                  <h4 className="font-medium text-red-500">Danger Zone</h4>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50/10">
                    <h5 className="font-medium text-red-500 mb-2">Delete Account</h5>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;