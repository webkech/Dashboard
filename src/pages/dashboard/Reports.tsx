import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  FileText, 
  Calendar,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

const reportHistory = [
  {
    id: 1,
    name: 'Weekly Security Report',
    type: 'Security',
    date: '2024-01-15',
    status: 'completed',
    issues: 12,
    severity: 'high',
    size: '2.4 MB'
  },
  {
    id: 2,
    name: 'Performance Analysis',
    type: 'Performance',
    date: '2024-01-14',
    status: 'completed',
    issues: 8,
    severity: 'medium',
    size: '1.8 MB'
  },
  {
    id: 3,
    name: 'Comprehensive Site Audit',
    type: 'Full Audit',
    date: '2024-01-13',
    status: 'completed',
    issues: 34,
    severity: 'critical',
    size: '5.2 MB'
  },
  {
    id: 4,
    name: 'SEO Compliance Report',
    type: 'SEO',
    date: '2024-01-12',
    status: 'processing',
    issues: 6,
    severity: 'low',
    size: '-'
  }
];

const reportTemplates = [
  {
    name: 'Security Assessment',
    description: 'Comprehensive security vulnerability analysis',
    icon: Shield,
    features: ['Vulnerability scan', 'Threat analysis', 'Security recommendations'],
    estimatedTime: '15-20 minutes'
  },
  {
    name: 'Performance Audit',
    description: 'Website speed and performance optimization report',
    icon: TrendingUp,
    features: ['Page speed analysis', 'Resource optimization', 'Performance metrics'],
    estimatedTime: '10-15 minutes'
  },
  {
    name: 'Full Site Analysis',
    description: 'Complete website health and security check',
    icon: FileText,
    features: ['All security checks', 'Performance analysis', 'SEO evaluation'],
    estimatedTime: '25-30 minutes'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'processing': return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
    default: return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'destructive';
    case 'high': return 'destructive';
    case 'medium': return 'secondary';
    case 'low': return 'outline';
    default: return 'outline';
  }
};

const Reports = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = (reportType: string) => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would trigger the actual report generation
    }, 3000);
  };

  const handleDownload = (reportId: number, format: string) => {
    // Simulate download
    console.log(`Downloading report ${reportId} as ${format}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">
            Generate and download security and performance reports
          </p>
        </div>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportTemplates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:glow-primary transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <template.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Includes:</h4>
                      <ul className="space-y-1">
                        {template.features.map((feature, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        Est. time: {template.estimatedTime}
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1" 
                          onClick={() => handleGenerateReport(template.name)}
                          disabled={isGenerating}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          {isGenerating ? 'Generating...' : 'Generate PDF'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleGenerateReport(template.name)}
                          disabled={isGenerating}
                        >
                          CSV
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                View and download previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportHistory.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {report.date}
                          </span>
                          <span>{report.type}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(report.status)}
                        <span className="text-sm capitalize">{report.status}</span>
                      </div>
                      <Badge variant={getSeverityColor(report.severity)}>
                        {report.issues} issues
                      </Badge>
                      {report.status === 'completed' && (
                        <div className="flex space-x-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(report.id, 'pdf')}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            PDF
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(report.id, 'csv')}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            CSV
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
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

export default Reports;