/**
 * Application Constants and System Configuration
 */

import { AppConfig } from '../types';

export const APP_CONFIG: AppConfig = {
  name: 'SEB-XRIF Platform',
  version: '0.1.0',
  environment: (import.meta.env.MODE as 'development' | 'production') || 'development',
};

export const SYSTEM_MODULES = [
  { id: 'config', name: 'Environment & Config', status: 'ready', description: 'Vite + React 19 + TypeScript + Tailwind 4' },
  { id: 'layout', name: 'Layout Shell & Design System', status: 'ready', description: 'Modular Header, Card, and Button primitives' },
  { id: 'state', name: 'State & Custom Hooks', status: 'ready', description: 'Type-safe local state & storage abstractions' },
  { id: 'api', name: 'API & Services Layer', status: 'pending', description: 'Awaiting your feature specifications' },
] as const;