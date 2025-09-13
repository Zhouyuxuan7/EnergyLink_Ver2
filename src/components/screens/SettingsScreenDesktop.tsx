import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppInput } from '../design-system/AppInput';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DeleteAccountModal } from '../common/DeleteAccountModal';
import { Download, Trash2, Settings, Shield, DollarSign, FileText, Bell } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SettingsScreenDesktopProps {
  // No props needed for this component
}

export function SettingsScreenDesktop({}: SettingsScreenDesktopProps) {
  const [quietHours, setQuietHours] = useState(true);
  const [sameBlockFirst, setSameBlockFirst] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(true);
  const [monthlyBudget, setMonthlyBudget] = useState([150]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const currentSpend = 87;
  const budgetPercent = (currentSpend / monthlyBudget[0]) * 100;

  const handleDownloadStatement = (month: string) => {
    toast.success(`${month} statement downloaded`);
  };

  const handleDeleteData = () => {
    setShowDeleteModal(true);
  };

  const handleSaveBudget = () => {
    toast.success("Budget saved successfully!");
  };

  const handleDeleteComplete = () => {
    // Navigate back to home screen (this would be handled by parent component)
    window.location.href = '/';
  };

  const monthlyStatements = [
    { month: 'December 2024', amount: '$34.50', trades: 23, kWh: '47.2' },
    { month: 'November 2024', amount: '$42.80', trades: 31, kWh: '52.1' },
    { month: 'October 2024', amount: '$38.20', trades: 28, kWh: '44.8' },
    { month: 'September 2024', amount: '$41.60', trades: 29, kWh: '49.3' },
    { month: 'August 2024', amount: '$45.90', trades: 34, kWh: '56.7' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-lg text-gray-600">Manage your trading preferences, privacy, and account settings</p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Settings */}
          <div className="col-span-8">
            <Tabs defaultValue="trading" className="space-y-6">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="trading" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Trading</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Privacy</span>
                </TabsTrigger>
                <TabsTrigger value="budget" className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Budget</span>
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Data & Export</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trading" className="space-y-6">
                <Card className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Trading Preferences</h3>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Quiet hours</p>
                            <p className="text-sm text-gray-600">Pause all trading 9pm–7am daily</p>
                          </div>
                          <AppInput
                            type="toggle"
                            checked={quietHours}
                            onChange={setQuietHours}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Same block priority</p>
                            <p className="text-sm text-gray-600">Match with immediate neighbors first</p>
                          </div>
                          <AppInput
                            type="toggle"
                            checked={sameBlockFirst}
                            onChange={setSameBlockFirst}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Push notifications</p>
                            <p className="text-sm text-gray-600">Trade confirmations and important alerts</p>
                          </div>
                          <AppInput
                            type="toggle"
                            checked={notifications}
                            onChange={setNotifications}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <Bell className="w-6 h-6 text-blue-600" />
                        <h4 className="font-semibold text-blue-900">Notification Settings</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-blue-800">Trade completions</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-blue-800">Price alerts</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-blue-800">Budget warnings</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-blue-800">Community updates</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-blue-800">Weekly summaries</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Privacy & Security</h3>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Limited profile visibility</p>
                          <p className="text-sm text-gray-600">Show only first name + street to neighbors</p>
                        </div>
                        <AppInput
                          type="toggle"
                          checked={privacyMode}
                          onChange={setPrivacyMode}
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">What neighbors can see:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">First name:</span>
                            <span className="font-medium">✓ Visible</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Street name:</span>
                            <span className="font-medium">✓ Visible</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Exact address:</span>
                            <span className="text-red-600">✗ Hidden</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone/email:</span>
                            <span className="text-red-600">✗ Hidden</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Trade history:</span>
                            <span className="text-red-600">✗ Hidden</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <Shield className="w-6 h-6 text-green-600" />
                        <h4 className="font-semibold text-green-900">Security Features</h4>
                      </div>
                      <div className="space-y-3 text-sm text-green-800">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>Address verification required</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>End-to-end encrypted communications</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>Secure payment processing</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>Regular security audits</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>GDPR compliant data handling</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="budget" className="space-y-6">
                <Card className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Budget Controls</h3>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <AppInput
                        type="slider"
                        label="Monthly spending limit"
                        value={monthlyBudget}
                        onChange={setMonthlyBudget}
                        min={50}
                        max={500}
                        step={10}
                        formatLabel={(value) => `$${value}`}
                      />
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Current month progress</span>
                          <span className="font-semibold">${currentSpend} / ${monthlyBudget[0]}</span>
                        </div>
                        <Progress value={budgetPercent} className="h-3" />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>$0</span>
                          <span className={budgetPercent > 80 ? 'text-amber-600 font-medium' : ''}>
                            {budgetPercent > 80 ? 'Approaching limit' : 'On track'}
                          </span>
                          <span>${monthlyBudget[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-amber-900 mb-4">Budget Alerts</h4>
                      <div className="space-y-3 text-sm">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-amber-800">Alert at 75% of budget</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-amber-800">Alert at 90% of budget</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-amber-800">Auto-pause at 100% of budget</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-amber-800">Weekly spending summaries</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <AppButton
                      variant="primary"
                      onClick={handleSaveBudget}
                      className="px-8"
                    >
                      Save
                    </AppButton>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <Card className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Data Export & Management</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Monthly Statements</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Trades</TableHead>
                            <TableHead>Energy (kWh)</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {monthlyStatements.map((statement) => (
                            <TableRow key={statement.month}>
                              <TableCell className="font-medium">{statement.month}</TableCell>
                              <TableCell>{statement.amount}</TableCell>
                              <TableCell>{statement.trades}</TableCell>
                              <TableCell>{statement.kWh}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <AppButton
                                    variant="tertiary"
                                    size="sm"
                                    icon={<Download className="w-4 h-4" />}
                                    onClick={() => handleDownloadStatement(statement.month)}
                                  >
                                    CSV
                                  </AppButton>
                                  <AppButton
                                    variant="tertiary"
                                    size="sm"
                                    icon={<Download className="w-4 h-4" />}
                                    onClick={() => handleDownloadStatement(statement.month)}
                                  >
                                    PDF
                                  </AppButton>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h4 className="font-semibold text-red-900 mb-4">Danger Zone</h4>
                        <p className="text-sm text-red-800 mb-4">
                          This action will permanently delete your account and all associated data. 
                          This cannot be undone.
                        </p>
                        <AppButton
                          variant="tertiary"
                          size="sm"
                          icon={<Trash2 className="w-4 h-4" />}
                          onClick={handleDeleteData}
                          className="text-red-600 hover:bg-red-100"
                        >
                          Delete Account & Data
                        </AppButton>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Account Summary */}
            <Card className="p-6 bg-gradient-to-br from-[#2E7D32] to-green-600 text-white">
              <h4 className="font-semibold mb-4">Account Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="opacity-90">Member since:</span>
                  <span className="font-medium">Oct 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Total trades:</span>
                  <span className="font-medium">145</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Energy traded:</span>
                  <span className="font-medium">249.8 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">CO₂ avoided:</span>
                  <span className="font-medium">172.4 kg</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <AppButton variant="secondary" size="sm" className="w-full justify-start">
                  Download all data
                </AppButton>
                <AppButton variant="secondary" size="sm" className="w-full justify-start">
                  Update payment method
                </AppButton>
                <AppButton variant="secondary" size="sm" className="w-full justify-start">
                  Change password
                </AppButton>
                <AppButton variant="tertiary" size="sm" className="w-full justify-start">
                  Contact support
                </AppButton>
              </div>
            </Card>

            {/* Support */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-4">Need Help?</h4>
              <div className="space-y-3 text-sm text-blue-800">
                <p>Our support team is here to help with any questions about your account or trading preferences.</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> support@energylink.com</p>
                  <p><strong>Hours:</strong> Mon-Fri 9AM-6PM PST</p>
                  <p><strong>Response time:</strong> Within 24 hours</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onDeleteComplete={handleDeleteComplete}
      />
    </div>
  );
}