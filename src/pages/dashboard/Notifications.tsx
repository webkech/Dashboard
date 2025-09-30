import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Bell,
  AlertTriangle,
  Shield,
  Zap,
  Mail,
  Smartphone,
  Settings,
  Clock,
  CheckCircle,
  X,
  Filter
} from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'security',
    title: 'Critical Security Vulnerability Detected',
    message: 'SQL injection vulnerability found in contact form on webkech.com',
    timestamp: '2 minutes ago',
    read: false,
    severity: 'critical',
    site: 'webkech.com'
  },
  {
    id: 2,
    type: 'performance',
    title: 'Page Load Time Increased',
    message: 'Homepage load time increased by 40% compared to last week',
    timestamp: '15 minutes ago',
    read: false,
    severity: 'warning',
    site: 'shop.webkech.com'
  },
  {
    id: 3,
    type: 'security',
    title: 'SSL Certificate Expiring Soon',
    message: 'SSL certificate for blog.webkech.com expires in 7 days',
    timestamp: '1 hour ago',
    read: true,
    severity: 'medium',
    site: 'blog.webkech.com'
  },
  {
    id: 4,
    type: 'security',
    title: 'Suspicious Login Attempt',
    message: 'Multiple failed login attempts detected from IP 192.168.1.100',
    timestamp: '2 hours ago',
    read: true,
    severity: 'high',
    site: 'webkech.com'
  },
  {
    id: 5,
    type: 'performance',
    title: 'Database Query Optimization',
    message: 'Slow queries detected affecting user experience',
    timestamp: '4 hours ago',
    read: true,
    severity: 'medium',
    site: 'shop.webkech.com'
  }
];

const notificationSettings = {
  email: {
    enabled: true,
    critical: true,
    high: true,
    medium: false,
    low: false
  },
  push: {
    enabled: true,
    critical: true,
    high: false,
    medium: false,
    low: false
  },
  slack: {
    enabled: false,
    critical: false,
    high: false,
    medium: false,
    low: false
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'security': return <Shield className="w-4 h-4" />;
    case 'performance': return <Zap className="w-4 h-4" />;
    case 'maintenance': return <Settings className="w-4 h-4" />;
    default: return <Bell className="w-4 h-4" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'destructive';
    case 'high': return 'destructive';
    case 'warning': return 'secondary';
    case 'medium': return 'secondary';
    case 'low': return 'outline';
    default: return 'outline';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'security': return 'text-red-500';
    case 'performance': return 'text-yellow-500';
    case 'maintenance': return 'text-blue-500';
    default: return 'text-muted-foreground';
  }
};

const Notifications = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const [settings, setSettings] = useState(notificationSettings);
  const [filter, setFilter] = useState('all');

  const handleMarkAsRead = (id: number) => {
    setNotificationList(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id));
  };

  const handleSettingChange = (channel: string, severity: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel as keyof typeof prev],
        [severity]: value
      }
    }));
  };

  const filteredNotifications = filter === 'all' 
    ? notificationList 
    : notificationList.filter(notif => 
        filter === 'unread' ? !notif.read : notif.type === filter
      );

  const unreadCount = notificationList.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Security alerts and system notifications
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            {unreadCount} Unread
          </Badge>
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filter Tabs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Recent Notifications</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === 'unread' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('unread')}
                  >
                    Unread
                  </Button>
                  <Button
                    variant={filter === 'security' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('security')}
                  >
                    Security
                  </Button>
                  <Button
                    variant={filter === 'performance' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('performance')}
                  >
                    Performance
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      !notification.read 
                        ? 'bg-primary/5 border-primary/20 glow-primary' 
                        : 'bg-card/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          notification.severity === 'critical' 
                            ? 'bg-red-500/20 text-red-500'
                            : 'bg-primary/20'
                        }`}>
                          <div className={getTypeColor(notification.type)}>
                            {getTypeIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h4>
                            <Badge variant={getSeverityColor(notification.severity)}>
                              {notification.severity}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {notification.timestamp}
                            </span>
                            <span>{notification.site}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {!notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.email.enabled}
                    onCheckedChange={(value) => 
                      handleSettingChange('email', 'enabled', value)
                    }
                  />
                </div>
                {settings.email.enabled && (
                  <div className="ml-8 space-y-3">
                    {['critical', 'high', 'medium', 'low'].map(severity => (
                      <div key={severity} className="flex items-center justify-between">
                        <Label htmlFor={`email-${severity}`} className="capitalize">
                          {severity} Priority
                        </Label>
                        <Switch
                          id={`email-${severity}`}
                          checked={settings.email[severity as keyof typeof settings.email] as boolean}
                          onCheckedChange={(value) => 
                            handleSettingChange('email', severity, value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Push Notifications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time browser notifications
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.push.enabled}
                    onCheckedChange={(value) => 
                      handleSettingChange('push', 'enabled', value)
                    }
                  />
                </div>
                {settings.push.enabled && (
                  <div className="ml-8 space-y-3">
                    {['critical', 'high', 'medium', 'low'].map(severity => (
                      <div key={severity} className="flex items-center justify-between">
                        <Label htmlFor={`push-${severity}`} className="capitalize">
                          {severity} Priority
                        </Label>
                        <Switch
                          id={`push-${severity}`}
                          checked={settings.push[severity as keyof typeof settings.push] as boolean}
                          onCheckedChange={(value) => 
                            handleSettingChange('push', severity, value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Slack Integration */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-muted rounded flex items-center justify-center">
                      <span className="text-xs font-bold">S</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Slack Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Send notifications to Slack channels
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.slack.enabled}
                    onCheckedChange={(value) => 
                      handleSettingChange('slack', 'enabled', value)
                    }
                  />
                </div>
                {settings.slack.enabled && (
                  <div className="ml-8 space-y-3">
                    {['critical', 'high', 'medium', 'low'].map(severity => (
                      <div key={severity} className="flex items-center justify-between">
                        <Label htmlFor={`slack-${severity}`} className="capitalize">
                          {severity} Priority
                        </Label>
                        <Switch
                          id={`slack-${severity}`}
                          checked={settings.slack[severity as keyof typeof settings.slack] as boolean}
                          onCheckedChange={(value) => 
                            handleSettingChange('slack', severity, value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;