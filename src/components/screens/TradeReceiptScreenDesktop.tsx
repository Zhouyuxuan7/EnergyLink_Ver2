import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Check, Download, Share, AlertCircle, Leaf, DollarSign, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TradeReceiptScreenDesktopProps {
  role: 'seller' | 'buyer';
  trade: any;
  onBack: () => void;
}

export function TradeReceiptScreenDesktop({ role, trade, onBack }: TradeReceiptScreenDesktopProps) {
  const [showDispute, setShowDispute] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const handleDownload = () => {
    toast.success("Statement downloaded as CSV");
  };

  const handleShare = () => {
    toast.success("Trade receipt shared");
  };

  const handleDispute = () => {
    if (disputeReason) {
      toast.success("Issue reported. We'll investigate within 24 hours.");
      setShowDispute(false);
    }
  };

  const transactionAmount = (trade.kWh * trade.price).toFixed(2);
  const platformFee = (trade.kWh * 0.01).toFixed(2);
  const total = (parseFloat(transactionAmount) + parseFloat(platformFee)).toFixed(2);
  const savings = ((0.20 - trade.price) * trade.kWh).toFixed(2);
  const extraEarnings = ((trade.price - 0.06) * trade.kWh).toFixed(2);
  const co2Avoided = (trade.kWh * 0.69).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Trade Receipt</h2>
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="col-span-8 space-y-6">
                {/* Success Header */}
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Trade completed successfully!</h3>
                  <p className="text-lg text-gray-600">
                    You {role === 'buyer' ? 'bought' : 'sold'} <span className="font-semibold">{trade.kWh} kWh</span> {role === 'buyer' ? 'from' : 'to'} <span className="font-semibold">{trade.neighbor}</span> at <span className="font-semibold">${trade.price}/kWh</span>
                  </p>
                </div>

                {/* Transaction Details */}
                <Card className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/api/placeholder/48/48?text=${trade.neighbor[0]}`} />
                        <AvatarFallback>{trade.neighbor[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{trade.neighbor}</p>
                        <p className="text-sm text-gray-600">{trade.street}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg text-gray-900">{trade.kWh} kWh</p>
                        <p className="text-sm text-gray-600">${trade.price}/kWh</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Energy ({trade.kWh} kWh @ ${trade.price})</span>
                          <span className="font-medium">${transactionAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Platform fee (${(trade.kWh * 0.01).toFixed(3)}/kWh)</span>
                          <span className="font-medium">${platformFee}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3">
                          <div className="flex justify-between text-lg">
                            <span className="font-semibold">Total {role === 'buyer' ? 'Paid' : 'Received'}</span>
                            <span className="font-bold text-[#2E7D32]">
                              {role === 'buyer' ? '-' : '+'}${total}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Benefits Cards */}
                <div className="grid grid-cols-2 gap-6">
                  {role === 'buyer' && (
                    <Card className="p-6 bg-green-50 border-green-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <h4 className="font-semibold text-green-900">Money Saved</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-green-800">
                          Utility rate: <span className="font-semibold">$0.20/kWh</span>
                        </p>
                        <p className="text-sm text-green-800">
                          Your rate: <span className="font-semibold">${trade.price}/kWh</span>
                        </p>
                        <p className="text-2xl font-bold text-green-900">
                          Saved ${savings}
                        </p>
                      </div>
                    </Card>
                  )}

                  {role === 'seller' && (
                    <Card className="p-6 bg-green-50 border-green-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <h4 className="font-semibold text-green-900">Extra Earnings</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-green-800">
                          Utility rate: <span className="font-semibold">$0.06/kWh</span>
                        </p>
                        <p className="text-sm text-green-800">
                          Your rate: <span className="font-semibold">${trade.price}/kWh</span>
                        </p>
                        <p className="text-2xl font-bold text-green-900">
                          +${extraEarnings} extra
                        </p>
                      </div>
                    </Card>
                  )}

                  <Card className="p-6 bg-blue-50 border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Leaf className="w-6 h-6 text-blue-600" />
                      <h4 className="font-semibold text-blue-900">Environmental Impact</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-blue-900">
                        {co2Avoided} kg CO₂
                      </p>
                      <p className="text-sm text-blue-800">avoided</p>
                      <p className="text-xs text-blue-700">
                        Equivalent to not driving 16.8 miles
                      </p>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Right Column - Actions */}
              <div className="col-span-4 space-y-6">
                <Card className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Actions</h4>
                  <div className="space-y-3">
                    <AppButton
                      variant="secondary"
                      size="sm"
                      icon={<Download className="w-4 h-4" />}
                      onClick={handleDownload}
                      className="w-full justify-start"
                    >
                      Download CSV
                    </AppButton>
                    <AppButton
                      variant="secondary"
                      size="sm"
                      icon={<Share className="w-4 h-4" />}
                      onClick={handleShare}
                      className="w-full justify-start"
                    >
                      Share Receipt
                    </AppButton>
                    <AppButton
                      variant="tertiary"
                      size="sm"
                      icon={<AlertCircle className="w-4 h-4" />}
                      onClick={() => setShowDispute(true)}
                      className="w-full justify-start text-red-600 hover:bg-red-50"
                    >
                      Report Issue
                    </AppButton>
                  </div>
                </Card>

                <Card className="p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-4">Trade Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">Dec 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">2:45 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trade ID:</span>
                      <span className="font-medium font-mono">#TXN-2024-1215-0245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-green-600">Completed</span>
                    </div>
                  </div>
                </Card>

                <AppButton
                  variant="primary"
                  onClick={onBack}
                  className="w-full"
                >
                  Back to Dashboard
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dispute Modal */}
      <Dialog open={showDispute} onOpenChange={setShowDispute}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Report an Issue</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              What issue would you like to report about this trade?
            </p>
            <RadioGroup value={disputeReason} onValueChange={setDisputeReason}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pricing" id="pricing" />
                <Label htmlFor="pricing">Incorrect pricing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="quantity" id="quantity" />
                <Label htmlFor="quantity">Wrong energy amount</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unauthorized" id="unauthorized" />
                <Label htmlFor="unauthorized">Unauthorized transaction</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="timing" id="timing" />
                <Label htmlFor="timing">Incorrect timing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other issue</Label>
              </div>
            </RadioGroup>
            <div className="flex space-x-3 pt-4">
              <AppButton
                variant="secondary"
                onClick={() => setShowDispute(false)}
                className="flex-1"
              >
                Cancel
              </AppButton>
              <AppButton
                variant="primary"
                onClick={handleDispute}
                disabled={!disputeReason}
                className="flex-1"
              >
                Submit Report
              </AppButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}