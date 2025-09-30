import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Play,
  Pause,
  Activity,
  Eye,
  Lock,
  Unlock,
  Globe,
  Server
} from 'lucide-react';

interface SecurityIssue {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'warning' | 'safe';
  status: 'active' | 'resolved' | 'monitoring';
  lastDetected: string;
  description: string;
  affectedPages: number;
}

const SecurityMonitoring = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [securityIssues] = useState<SecurityIssue[]>([
    {
      id: '1',
      title: 'SQL Injection Vulnerability',
      severity: 'critical',
      status: 'active',
      lastDetected: '2 minutes ago',
      description: 'Potential SQL injection in user input form',
      affectedPages: 3
    },
    {
      id: '2',
      title: 'Weak SSL Configuration',
      severity: 'high',
      status: 'monitoring',
      lastDetected: '1 hour ago',
      description: 'SSL certificate uses weak encryption',
      affectedPages: 1
    },
    {
      id: '3',
      title: 'Suspicious Login Attempts',
      severity: 'warning',
      status: 'active',
      lastDetected: '30 minutes ago',
      description: 'Multiple failed login attempts from same IP',
      affectedPages: 1
    },
    {
      id: '4',
      title: 'Security Headers Missing',
      severity: 'warning',
      status: 'resolved',
      lastDetected: '6 hours ago',
      description: 'Missing X-Frame-Options header',
      affectedPages: 5
    }
  ]);

  const [realtimeEvents, setRealtimeEvents] = useState([
    { time: '14:32:15', event: 'Firewall blocked suspicious IP', type: 'blocked' },
    { time: '14:31:20', event: 'SSL certificate validated', type: 'success' },
    { time: '14:30:05', event: 'DDoS attempt detected', type: 'warning' },
    { time: '14:29:45', event: 'User authentication verified', type: 'success' }
  ]);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Add new event
          setRealtimeEvents(prev => [
            { time: new Date().toLocaleTimeString(), event: 'Security scan completed', type: 'success' },
            ...prev.slice(0, 9)
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <Shield className="w-4 h-4" />;
      case 'warning': return <Eye className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-critical';
      case 'monitoring': return 'text-warning';
      case 'resolved': return 'text-safe';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="heading-primary text-3xl text-foreground mb-2">
          Security Monitoring
        </h1>
        <p className="text-muted-foreground">
          Real-time security threat detection and vulnerability assessment
        </p>
      </motion.div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-safe/20 text-safe">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Secure</h3>
                <p className="text-sm text-muted-foreground">All systems protected</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-warning/20 text-warning">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Monitoring</h3>
                <p className="text-sm text-muted-foreground">2 items under watch</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-critical/20 text-critical">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Critical</h3>
                <p className="text-sm text-muted-foreground">1 urgent issue</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Security Scan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Security Scan</h2>
            <Button 
              onClick={startScan} 
              disabled={isScanning}
              className="btn-primary"
            >
              {isScanning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Scanning...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Scan
                </>
              )}
            </Button>
          </div>
          
          {isScanning && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Scanning progress</span>
                <span className="text-foreground">{scanProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div 
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
          
          <p className="text-muted-foreground">
            Run comprehensive security analysis to detect vulnerabilities and threats.
          </p>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Issues */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Security Issues</h2>
            <div className="space-y-4">
              {securityIssues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 rounded-lg bg-accent/30 border border-border/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={
                        issue.severity === 'critical' ? 'text-critical' :
                        issue.severity === 'high' ? 'text-high' :
                        issue.severity === 'warning' ? 'text-warning' : 'text-safe'
                      }>
                        {getSeverityIcon(issue.severity)}
                      </span>
                      <h3 className="font-medium text-foreground">{issue.title}</h3>
                    </div>
                    <Badge 
                      className={`${
                        issue.severity === 'critical' ? 'badge-critical' :
                        issue.severity === 'high' ? 'badge-high' :
                        issue.severity === 'warning' ? 'badge-warning' : 'badge-safe'
                      }`}
                    >
                      {issue.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Last detected: {issue.lastDetected}</span>
                    <span className={getStatusColor(issue.status)}>
                      {issue.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Real-time Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-primary animate-pulse-glow" />
              <h2 className="text-xl font-semibold text-foreground">Real-time Events</h2>
            </div>
            <div className="space-y-3">
              {realtimeEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-accent/20"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === 'blocked' ? 'bg-critical' :
                    event.type === 'warning' ? 'bg-warning' : 'bg-safe'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{event.event}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SecurityMonitoring;