import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppInput } from '../design-system/AppInput';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [quietHours, setQuietHours] = useState(true);
  const [sameBlockFirst, setSameBlockFirst] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(true);
  const [monthlyBudget, setMonthlyBudget] = useState([150]);

  const currentSpend = 87;
  const budgetPercent = (currentSpend / monthlyBudget[0]) * 100;

  const handleDownloadStatement = (month: string) => {
    toast.success(`${month} statement downloaded`);
  };

  const handleDeleteData = () => {
    toast.error("This would permanently delete your account data");
  };

  const monthlyStatements = [
    { month: 'December 2024', amount: '$34.50' },
    { month: 'November 2024', amount: '$42.80' },
    { month: 'October 2024', amount: '$38.20' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-gray-900">Settings</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Trading Preferences */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold text-gray-900">Trading preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Quiet hours</p>
                <p className="text-sm text-gray-600">Pause trading 9pm–7am</p>
              </div>
              <AppInput
                type="toggle"
                checked={quietHours}
                onChange={setQuietHours}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Same block first</p>
                <p className="text-sm text-gray-600">Prioritize immediate neighbors</p>
              </div>
              <AppInput
                type="toggle"
                checked={sameBlockFirst}
                onChange={setSameBlockFirst}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Notifications</p>
                <p className="text-sm text-gray-600">Trade confirmations & alerts</p>
              </div>
              <AppInput
                type="toggle"
                checked={notifications}
                onChange={setNotifications}
              />
            </div>
          </div>
        </Card>

        {/* Budget Controls */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold text-gray-900">Budget controls</h3>
          
          <div className="space-y-4">
            <AppInput
              type="slider"
              label="Monthly spending cap"
              value={monthlyBudget}
              onChange={setMonthlyBudget}
              min={50}
              max={500}
              step={10}
              formatLabel={(value) => `$${value}`}
            />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current month</span>
                <span className="font-medium">${currentSpend} / ${monthlyBudget[0]}</span>
              </div>
              <Progress value={budgetPercent} className="h-2" />
              <p className="text-xs text-gray-500">
                {budgetPercent > 80 ? 'Approaching limit' : 'On track'}
              </p>
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold text-gray-900">Privacy</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show first name + street only</p>
              <p className="text-sm text-gray-600">Neighbors can't see your full address</p>
            </div>
            <AppInput
              type="toggle"
              checked={privacyMode}
              onChange={setPrivacyMode}
            />
          </div>
        </Card>

        {/* Data Export */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold text-gray-900">Monthly statements</h3>
          
          <div className="space-y-3">
            {monthlyStatements.map((statement) => (
              <div key={statement.month} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{statement.month}</p>
                  <p className="text-sm text-gray-600">{statement.amount}</p>
                </div>
                <AppButton
                  variant="tertiary"
                  size="sm"
                  icon={<Download className="w-4 h-4" />}
                  onClick={() => handleDownloadStatement(statement.month)}
                >
                  Download
                </AppButton>
              </div>
            ))}
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-4 space-y-4 border-red-200">
          <h3 className="font-semibold text-red-900">Danger zone</h3>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              This will permanently delete your account and all trading history.
            </p>
            <AppButton
              variant="tertiary"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={handleDeleteData}
              className="text-red-600 hover:bg-red-50"
            >
              Delete my data
            </AppButton>
          </div>
        </Card>
      </div>
    </div>
  );
}