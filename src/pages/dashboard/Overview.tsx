import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface AlertSummary {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

const Overview = () => {
  const [threatLevel, setThreatLevel] = useState(0);
  const [healthScore, setHealthScore] = useState(0);
  const [alertSummary] = useState<AlertSummary>({
    critical: 3,
    high: 8,
    medium: 15,
    low: 23
  });

  // Animate counters on mount
  useEffect(() => {
    const threatTimer = setTimeout(() => setThreatLevel(76), 500);
    const healthTimer = setTimeout(() => setHealthScore(89), 800);
    
    return () => {
      clearTimeout(threatTimer);
      clearTimeout(healthTimer);
    };
  }, []);

  const ThreatGauge = ({ value }: { value: number }) => {
    const radius = 80;
    const strokeWidth = 12;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    const getColor = (val: number) => {
      if (val <= 30) return 'hsl(var(--safe))';
      if (val <= 60) return 'hsl(var(--warning))';
      if (val <= 80) return 'hsl(var(--high))';
      return 'hsl(var(--critical))';
    };

    return (
      <div className="relative">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="hsl(var(--muted))"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={getColor(value)}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-3xl font-bold text-foreground"
            >
              {value}%
            </motion.div>
            <div className="text-sm text-muted-foreground">Threat Level</div>
          </div>
        </div>
      </div>
    );
  };

  const HealthScore = ({ score }: { score: number }) => (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`w-12 h-12 rounded-full flex items-center justify-center
              ${score >= 80 ? 'bg-safe/20 text-safe' : 
                score >= 60 ? 'bg-warning/20 text-warning' : 'bg-critical/20 text-critical'}`}
          >
            {score >= 80 ? <CheckCircle className="w-6 h-6" /> : 
             score >= 60 ? <AlertCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          </motion.div>
        </div>
      </div>
      <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="text-2xl font-bold text-foreground"
        >
          {score}%
        </motion.div>
        <div className="text-muted-foreground">Website Health</div>
      </div>
    </div>
  );

  const AlertCard = ({ 
    icon: Icon, 
    count, 
    label, 
    variant 
  }: { 
    icon: any; 
    count: number; 
    label: string; 
    variant: 'critical' | 'high' | 'warning' | 'safe' 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="glass-card p-6 cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${
          variant === 'critical' ? 'bg-critical/20 text-critical' :
          variant === 'high' ? 'bg-high/20 text-high' :
          variant === 'warning' ? 'bg-warning/20 text-warning' :
          'bg-safe/20 text-safe'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">{count}</div>
          <div className="text-muted-foreground">{label}</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="heading-primary text-3xl text-foreground mb-2">
          Security Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor your website's security status and performance metrics
        </p>
      </motion.div>

      {/* Main metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Threat Level Gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card p-8 text-center">
            <h3 className="text-xl font-manrope font-semibold mb-6 text-foreground">
              Threat Level Analysis
            </h3>
            <ThreatGauge value={threatLevel} />
            <div className="mt-4">
              <Badge 
                className={`${
                  threatLevel <= 30 ? 'badge-safe' :
                  threatLevel <= 60 ? 'badge-warning' :
                  threatLevel <= 80 ? 'badge-high' : 'badge-critical'
                }`}
              >
                {threatLevel <= 30 ? 'Low Risk' :
                 threatLevel <= 60 ? 'Medium Risk' :
                 threatLevel <= 80 ? 'High Risk' : 'Critical Risk'}
              </Badge>
            </div>
          </Card>
        </motion.div>

        {/* Health Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card p-8">
            <h3 className="text-xl font-manrope font-semibold mb-6 text-foreground">
              Website Health Score
            </h3>
            <HealthScore score={healthScore} />
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Performance</span>
                <span className="text-safe">94%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Security</span>
                <span className="text-warning">78%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accessibility</span>
                <span className="text-safe">96%</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Alert Summary */}
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl font-manrope font-semibold mb-6 text-foreground"
        >
          Alert Summary
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AlertCard
            icon={XCircle}
            count={alertSummary.critical}
            label="Critical"
            variant="critical"
          />
          <AlertCard
            icon={AlertTriangle}
            count={alertSummary.high}
            label="High Priority"
            variant="high"
          />
          <AlertCard
            icon={AlertCircle}
            count={alertSummary.medium}
            label="Medium Priority"
            variant="warning"
          />
          <AlertCard
            icon={Info}
            count={alertSummary.low}
            label="Low Priority"
            variant="safe"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="glass-card p-6">
          <h3 className="text-xl font-manrope font-semibold mb-4 text-foreground">
            Recent Security Events
          </h3>
          <div className="space-y-4">
            {[
              { time: '2 minutes ago', event: 'SQL injection attempt blocked', severity: 'critical' },
              { time: '15 minutes ago', event: 'SSL certificate renewed', severity: 'safe' },
              { time: '1 hour ago', event: 'Unusual login pattern detected', severity: 'high' },
              { time: '3 hours ago', event: 'Firewall rules updated', severity: 'safe' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-lg bg-accent/50"
              >
                <div className={`w-2 h-2 rounded-full ${
                  item.severity === 'critical' ? 'bg-critical' :
                  item.severity === 'high' ? 'bg-high' :
                  item.severity === 'warning' ? 'bg-warning' : 'bg-safe'
                }`} />
                <div className="flex-1">
                  <p className="text-foreground font-medium">{item.event}</p>
                  <p className="text-muted-foreground text-sm">{item.time}</p>
                </div>
                <Activity className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Overview;