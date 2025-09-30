import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  AlertTriangle,
  XCircle,
  AlertCircle,
  Info,
  Calendar,
  Globe
} from 'lucide-react';

interface ErrorLog {
  id: string;
  timestamp: string;
  errorCode: string;
  page: string;
  severity: 'critical' | 'high' | 'warning' | 'info';
  status: 'new' | 'investigating' | 'resolved';
  message: string;
  userAgent: string;
  ip: string;
}

const ErrorLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const mockLogs: ErrorLog[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      errorCode: '500',
      page: '/api/user/profile',
      severity: 'critical',
      status: 'new',
      message: 'Internal Server Error - Database connection timeout',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ip: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:15',
      errorCode: '404',
      page: '/products/invalid-item',
      severity: 'high',
      status: 'investigating',
      message: 'Page not found - User tried to access non-existent product',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      ip: '10.0.0.50'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:10',
      errorCode: '403',
      page: '/admin/dashboard',
      severity: 'warning',
      status: 'resolved',
      message: 'Forbidden access - Unauthorized admin panel access attempt',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      ip: '203.0.113.45'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:15:05',
      errorCode: '200',
      page: '/api/health',
      severity: 'info',
      status: 'resolved',
      message: 'API health check completed successfully',
      userAgent: 'WebKech-Monitor/1.0',
      ip: '127.0.0.1'
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:10:30',
      errorCode: '429',
      page: '/api/search',
      severity: 'high',
      status: 'new',
      message: 'Rate limit exceeded - Too many requests from single IP',
      userAgent: 'python-requests/2.28.1',
      ip: '198.51.100.30'
    }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'badge-critical';
      case 'high': return 'badge-high';
      case 'warning': return 'badge-warning';
      default: return 'badge-safe';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return 'bg-critical/20 text-critical border-critical/30';
      case 'investigating': return 'bg-warning/20 text-warning border-warning/30';
      case 'resolved': return 'bg-safe/20 text-safe border-safe/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.errorCode.includes(searchTerm);
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="heading-primary text-3xl text-foreground mb-2">
          Error Logs
        </h1>
        <p className="text-muted-foreground">
          Monitor and analyze website errors and issues in real-time
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-card p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search logs by message, page, or error code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center space-x-4 text-sm text-muted-foreground"
      >
        <span>Showing {filteredLogs.length} of {mockLogs.length} logs</span>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Last 24 hours</span>
        </div>
      </motion.div>

      {/* Error Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/20 border-b border-border">
                <tr>
                  <th className="text-left p-4 text-foreground font-medium">Timestamp</th>
                  <th className="text-left p-4 text-foreground font-medium">Code</th>
                  <th className="text-left p-4 text-foreground font-medium">Page</th>
                  <th className="text-left p-4 text-foreground font-medium">Severity</th>
                  <th className="text-left p-4 text-foreground font-medium">Status</th>
                  <th className="text-left p-4 text-foreground font-medium">Message</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-b border-border/50 hover:bg-accent/20 transition-colors"
                  >
                    <td className="p-4 text-muted-foreground font-mono text-sm">
                      {log.timestamp}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="font-mono">
                        {log.errorCode}
                      </Badge>
                    </td>
                    <td className="p-4 text-foreground font-mono text-sm max-w-48 truncate">
                      {log.page}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className={
                          log.severity === 'critical' ? 'text-critical' :
                          log.severity === 'high' ? 'text-high' :
                          log.severity === 'warning' ? 'text-warning' : 'text-safe'
                        }>
                          {getSeverityIcon(log.severity)}
                        </span>
                        <Badge className={getSeverityBadge(log.severity)}>
                          {log.severity}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(log.status)}`}
                      >
                        {log.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-foreground max-w-md truncate">
                      {log.message}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* No results message */}
      {filteredLogs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-12"
        >
          <div className="glass-card p-8">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No logs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or severity filter.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ErrorLogs;