'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatDate, cn } from '@/utils';

export default function Home() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [storedName, setStoredName] = useLocalStorage<string>('username', '');
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Next.js 14 Template</h1>
          <p className="text-gray-600">React + TypeScript + Tailwind CSS + App Router</p>
        </header>

        <Card padding="lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Button 组件</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-gray-500 w-20">Primary:</span>
              <Button variant="primary">Primary Button</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-gray-500 w-20">Secondary:</span>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="secondary" disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-gray-500 w-20">Outline:</span>
              <Button variant="outline">Outline Button</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-gray-500 w-20">Ghost:</span>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Card 组件</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card padding="sm" className={cn(theme === 'dark' && 'bg-gray-800')}>
              <h3 className={cn('font-medium', theme === 'dark' ? 'text-white' : 'text-gray-900')}>Small Padding</h3>
              <p className={cn('text-sm mt-1', theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>Card content with small padding</p>
            </Card>
            <Card padding="md" className={cn(theme === 'dark' && 'bg-gray-800')}>
              <h3 className={cn('font-medium', theme === 'dark' ? 'text-white' : 'text-gray-900')}>Medium Padding</h3>
              <p className={cn('text-sm mt-1', theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>Card content with medium padding</p>
            </Card>
            <Card padding="lg" className={cn(theme === 'dark' && 'bg-gray-800')}>
              <h3 className={cn('font-medium', theme === 'dark' ? 'text-white' : 'text-gray-900')}>Large Padding</h3>
              <p className={cn('text-sm mt-1', theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>Card content with large padding</p>
            </Card>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Input 组件</h2>
          <div className="space-y-4">
            <Input
              label="普通输入框"
              placeholder="请输入内容..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="带错误提示"
              placeholder="请输入内容..."
              error="这是一个错误提示"
            />
            <Input
              type="email"
              label="邮箱"
              placeholder="example@email.com"
            />
            <Input
              type="password"
              label="密码"
              placeholder="请输入密码"
            />
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">useLocalStorage Hook</h2>
          <div className="space-y-6">
            <div>
              <Input
                label="存储用户名"
                placeholder="输入用户名"
                value={storedName}
                onChange={(e) => setStoredName(e.target.value)}
              />
              {storedName && (
                <p className="mt-2 text-sm text-gray-600">已存储: {storedName}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">主题:</span>
              <Button
                variant={theme === 'light' ? 'primary' : 'ghost'}
                onClick={() => setTheme('light')}
              >
                浅色
              </Button>
              <Button
                variant={theme === 'dark' ? 'primary' : 'ghost'}
                onClick={() => setTheme('dark')}
              >
                深色
              </Button>
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">工具函数</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">formatDate:</span>
              <code className="px-3 py-1 bg-gray-100 rounded text-sm">{formatDate(new Date())}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">计数器:</span>
              <div className="flex items-center gap-3">
                <Button variant="secondary" onClick={() => setCount((c) => c - 1)}>-</Button>
                <span className="w-12 text-center font-semibold">{count}</span>
                <Button variant="primary" onClick={() => setCount((c) => c + 1)}>+</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
