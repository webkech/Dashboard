import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Github, 
  Slack, 
  Globe,
  Database,
  Mail,
  Webhook,
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Plug
} from 'lucide-react';

const integrations = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect your repositories for automated security scanning',
    icon: Github,
    status: 'connected',
    category: 'Development',
    features: ['Automatic vulnerability scanning', 'Pull request analysis', 'Security alerts'],
    setupTime: '2 minutes'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Receive real-time security notifications in your workspace',
    icon: Slack,
    status: 'connected',
    category: 'Communication',
    features: ['Real-time alerts', 'Custom channels', 'Report summaries'],
    setupTime: '1 minute'
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    description: 'Monitor WordPress sites for security vulnerabilities',
    icon: Globe,
    status: 'available',
    category: 'CMS',
    features: ['Plugin vulnerability scan', 'Theme security check', 'Core updates monitoring'],
    setupTime: '5 minutes'
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    description: 'Enhanced security monitoring with Cloudflare integration',
    icon: Database,
    status: 'available',
    category: 'Security',
    features: ['DDoS protection monitoring', 'SSL certificate tracking', 'DNS security'],
    setupTime: '3 minutes'
  },
  {
    id: 'email',
    name: 'Email Notifications',
    description: 'Customizable email alerts for security events',
    icon: Mail,
    status: 'connected',
    category: 'Communication',
    features: ['Daily summaries', 'Critical alerts', 'Weekly reports'],
    setupTime: 'Instant'
  },
  {
    id: 'webhooks',
    name: 'Custom Webhooks',
    description: 'Send security data to your custom endpoints',
    icon: Webhook,
    status: 'available',
    category: 'API',
    features: ['Real-time data push', 'Custom payloads', 'Retry logic'],
    setupTime: '10 minutes'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'available':
      return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected': return 'default';
    case 'available': return 'secondary';
    case 'error': return 'destructive';
    default: return 'secondary';
  }
};

const Integrations = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState(
    integrations.filter(i => i.status === 'connected').map(i => i.id)
  );

  const handleToggleIntegration = (integrationId: string) => {
    setConnectedIntegrations(prev => 
      prev.includes(integrationId) 
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    );
  };

  const handleConnect = (integrationId: string) => {
    // Simulate connection process
    console.log(`Connecting to ${integrationId}...`);
  };

  const categories = [...new Set(integrations.map(i => i.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground">
            Connect WebKech with your favorite tools and platforms
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            {connectedIntegrations.length} Connected
          </Badge>
        </div>
      </div>

      {/* Connected Integrations Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plug className="w-5 h-5" />
            <span>Active Integrations</span>
          </CardTitle>
          <CardDescription>
            Currently connected services and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {integrations
              .filter(integration => connectedIntegrations.includes(integration.id))
              .map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border bg-card/50"
                >
                  <div className="p-2 rounded-lg bg-primary/20">
                    <integration.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">{integration.category}</p>
                  </div>
                  {getStatusIcon('connected')}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Integrations by Category */}
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
              <CardDescription>
                {category === 'Development' && 'Tools for developers and code repositories'}
                {category === 'Communication' && 'Notification and messaging platforms'}
                {category === 'CMS' && 'Content management systems'}
                {category === 'Security' && 'Security and infrastructure services'}
                {category === 'API' && 'Custom integrations and webhooks'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations
                  .filter(integration => integration.category === category)
                  .map((integration, index) => (
                    <motion.div
                      key={integration.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border rounded-lg p-4 space-y-4 hover:glow-primary transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-primary/20">
                            <integration.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{integration.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {integration.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(integration.status)}
                          <Badge variant={getStatusColor(integration.status)}>
                            {integration.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Features:</h5>
                        <ul className="space-y-1">
                          {integration.features.map((feature, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Setup time: {integration.setupTime}
                        </span>
                        <div className="flex items-center space-x-2">
                          {integration.status === 'connected' ? (
                            <>
                              <Switch
                                checked={connectedIntegrations.includes(integration.id)}
                                onCheckedChange={() => handleToggleIntegration(integration.id)}
                              />
                              <Button variant="outline" size="sm">
                                <Settings className="w-3 h-3 mr-1" />
                                Configure
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleConnect(integration.id)}
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Integrations;