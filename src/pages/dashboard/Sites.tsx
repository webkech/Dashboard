import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, 
  Plus,
  Settings,
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Trash2,
  Edit
} from 'lucide-react';

const websites = [
  {
    id: 1,
    name: 'Main Website',
    url: 'https://webkech.com',
    status: 'active',
    healthScore: 95,
    lastScan: '2 hours ago',
    issues: 3,
    criticalIssues: 0,
    environment: 'production'
  },
  {
    id: 2,
    name: 'E-commerce Store',
    url: 'https://shop.webkech.com',
    status: 'active',
    healthScore: 87,
    lastScan: '4 hours ago',
    issues: 8,
    criticalIssues: 2,
    environment: 'production'
  },
  {
    id: 3,
    name: 'Blog Platform',
    url: 'https://blog.webkech.com',
    status: 'monitoring',
    healthScore: 92,
    lastScan: '1 hour ago',
    issues: 5,
    criticalIssues: 1,
    environment: 'production'
  },
  {
    id: 4,
    name: 'Staging Environment',
    url: 'https://staging.webkech.com',
    status: 'active',
    healthScore: 78,
    lastScan: '30 minutes ago',
    issues: 12,
    criticalIssues: 3,
    environment: 'staging'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'monitoring':
      return <BarChart3 className="w-4 h-4 text-blue-500" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case 'error':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    default:
      return <Globe className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'default';
    case 'monitoring': return 'secondary';
    case 'warning': return 'secondary';
    case 'error': return 'destructive';
    default: return 'outline';
  }
};

const getHealthScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-500';
  if (score >= 70) return 'text-yellow-500';
  return 'text-red-500';
};

const Sites = () => {
  const [selectedSite, setSelectedSite] = useState(websites[0]);
  const [isAddSiteOpen, setIsAddSiteOpen] = useState(false);
  const [newSite, setNewSite] = useState({
    name: '',
    url: '',
    environment: 'production'
  });

  const handleAddSite = () => {
    // Simulate adding a new site
    console.log('Adding new site:', newSite);
    setIsAddSiteOpen(false);
    setNewSite({ name: '', url: '', environment: 'production' });
  };

  const handleDeleteSite = (siteId: number) => {
    // Simulate deleting a site
    console.log('Deleting site:', siteId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Multi-Site Support</h1>
          <p className="text-muted-foreground">
            Manage and monitor multiple websites from a single dashboard
          </p>
        </div>
        <Dialog open={isAddSiteOpen} onOpenChange={setIsAddSiteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Website
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Website</DialogTitle>
              <DialogDescription>
                Add a new website to monitor with WebKech security dashboard
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Website Name</Label>
                <Input
                  id="name"
                  placeholder="My Website"
                  value={newSite.name}
                  onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={newSite.url}
                  onChange={(e) => setNewSite({ ...newSite, url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="environment">Environment</Label>
                <Select value={newSite.environment} onValueChange={(value) => setNewSite({ ...newSite, environment: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddSiteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSite}>
                  Add Website
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Site Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{websites.length}</p>
                    <p className="text-sm text-muted-foreground">Total Sites</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{websites.filter(s => s.status === 'active').length}</p>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">{websites.reduce((acc, site) => acc + site.criticalIssues, 0)}</p>
                    <p className="text-sm text-muted-foreground">Critical Issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.round(websites.reduce((acc, site) => acc + site.healthScore, 0) / websites.length)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Avg Health</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {websites.map((site, index) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:glow-primary transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <Globe className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{site.name}</CardTitle>
                          <CardDescription>{site.url}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(site.status)}
                        <Badge variant={getStatusColor(site.status)}>
                          {site.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Health Score</p>
                        <p className={`text-2xl font-bold ${getHealthScoreColor(site.healthScore)}`}>
                          {site.healthScore}%
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Issues</p>
                        <p className="text-2xl font-bold">
                          {site.issues}
                          {site.criticalIssues > 0 && (
                            <span className="text-sm text-red-500 ml-1">
                              ({site.criticalIssues} critical)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Last scan: {site.lastScan}</span>
                      <Badge variant="outline">{site.environment}</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Management</CardTitle>
              <CardDescription>
                Detailed view and management of your monitored websites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {websites.map((site, index) => (
                  <motion.div
                    key={site.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{site.name}</h4>
                        <p className="text-sm text-muted-foreground">{site.url}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground">
                            Health: <span className={getHealthScoreColor(site.healthScore)}>{site.healthScore}%</span>
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Issues: {site.issues}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Last scan: {site.lastScan}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(site.status)}>
                        {site.status}
                      </Badge>
                      <Badge variant="outline">{site.environment}</Badge>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteSite(site.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sites;