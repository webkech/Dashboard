import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Zap, 
  Globe, 
  Search,
  Filter,
  TrendingUp,
  Shield,
  Eye
} from 'lucide-react';

const issueCategories = [
  {
    id: 'performance',
    title: 'Performance Issues',
    icon: Zap,
    count: 23,
    severity: 'high',
    description: 'Issues affecting site speed and user experience',
    issues: [
      { name: 'Large image files not optimized', severity: 'high', affected: 15 },
      { name: 'Slow server response time', severity: 'critical', affected: 8 },
      { name: 'JavaScript bundle too large', severity: 'medium', affected: 12 }
    ]
  },
  {
    id: 'security',
    title: 'Security Issues',
    icon: Shield,
    count: 7,
    severity: 'critical',
    description: 'Security vulnerabilities and threats detected',
    issues: [
      { name: 'Outdated SSL certificate', severity: 'critical', affected: 3 },
      { name: 'Cross-site scripting vulnerability', severity: 'high', affected: 2 },
      { name: 'Weak password policies', severity: 'medium', affected: 2 }
    ]
  },
  {
    id: 'compatibility',
    title: 'Compatibility Issues',
    icon: Globe,
    count: 12,
    severity: 'medium',
    description: 'Browser and device compatibility problems',
    issues: [
      { name: 'IE11 layout breaking', severity: 'low', affected: 5 },
      { name: 'Mobile responsive issues', severity: 'high', affected: 4 },
      { name: 'Safari font rendering', severity: 'medium', affected: 3 }
    ]
  },
  {
    id: 'seo',
    title: 'SEO Warnings',
    icon: TrendingUp,
    count: 18,
    severity: 'warning',
    description: 'Search engine optimization improvements needed',
    issues: [
      { name: 'Missing meta descriptions', severity: 'medium', affected: 8 },
      { name: 'Duplicate title tags', severity: 'high', affected: 5 },
      { name: 'Missing alt attributes', severity: 'low', affected: 5 }
    ]
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'destructive';
    case 'high': return 'destructive';
    case 'medium': return 'secondary';
    case 'warning': return 'secondary';
    case 'low': return 'outline';
    default: return 'outline';
  }
};

const Issues = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Issue Categories</h1>
          <p className="text-muted-foreground">
            Categorized issues detected across your websites
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed View</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {issueCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:glow-primary transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <category.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant={getSeverityColor(category.severity)}>
                        {category.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Severity Level
                        </span>
                        <Badge variant={getSeverityColor(category.severity)}>
                          {category.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <Button variant="outline" className="w-full" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <div className="space-y-6">
            {issueCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <category.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="flex items-center space-x-2">
                          <span>{category.title}</span>
                          <Badge variant={getSeverityColor(category.severity)}>
                            {category.count} issues
                          </Badge>
                        </CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.issues.map((issue, issueIndex) => (
                        <div
                          key={issueIndex}
                          className="flex items-center justify-between p-3 rounded-lg border bg-card/50"
                        >
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{issue.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {issue.affected} pages affected
                              </p>
                            </div>
                          </div>
                          <Badge variant={getSeverityColor(issue.severity)}>
                            {issue.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Issues;