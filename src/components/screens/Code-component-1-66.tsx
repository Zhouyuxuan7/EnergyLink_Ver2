import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { ArrowLeft, Check, Download, Share, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TradeReceiptScreenProps {
  role: 'seller' | 'buyer';
  trade: any;
  onBack: () => void;
  onCommunity: () => void;
}

export function TradeReceiptScreen({ role, trade, onBack, onCommunity }: TradeReceiptScreenProps) {
  const [showDispute, setShowDispute] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const handleDownload = () => {
    toast.success("Statement saved to downloads");
  };

  const handleShare = () => {
    toast.success("Statement shared");
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
  const co2Avoided = (trade.kWh * 0.69).toFixed(1); // 0.69 kg CO2 per kWh avoided

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-gray-900">Trade Receipt</h1>
        <div className="w-10" />
      </div>

      <div className="p-6 space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Trade completed!</h2>
            <p className="text-gray-600">
              You {role === 'buyer' ? 'bought' : 'sold'} {trade.kWh} kWh {role === 'buyer' ? 'from' : 'to'} {trade.neighbor} at ${trade.price}/kWh
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <Card className="p-4 space-y-3">
          <h3 className="font-semibold text-gray-900">Transaction details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Energy ({trade.kWh} kWh)</span>
              <span className="font-medium">${transactionAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform fee</span>
              <span className="font-medium">${platformFee}</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Savings Comparison */}
        {role === 'buyer' && (
          <Card className="p-4 bg-green-50 border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Money saved</h3>
            <p className="text-sm text-green-800">
              Utility price would have been $0.20/kWh
            </p>
            <p className="text-lg font-semibold text-green-900">
              You saved ${savings} today
            </p>
          </Card>
        )}

        {role === 'seller' && (
          <Card className="p-4 bg-green-50 border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Extra earnings</h3>
            <p className="text-sm text-green-800">
              Utility export rate is only $0.06/kWh
            </p>
            <p className="text-lg font-semibold text-green-900">
              You earned ${((trade.price - 0.06) * trade.kWh).toFixed(2)} extra
            </p>
          </Card>
        )}

        {/* Environmental Impact */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Environmental impact</h3>
          <p className="text-blue-800">
            CO₂ avoided: <span className="font-semibold">{co2Avoided} kg</span>
          </p>
          <p className="text-sm text-blue-700">
            Equivalent to not driving 7.2 miles
          </p>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <div className="flex space-x-3">
            <AppButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={handleDownload}
              className="flex-1"
            >
              Download CSV
            </AppButton>
            <AppButton
              variant="secondary"
              size="sm"
              icon={<Share className="w-4 h-4" />}
              onClick={handleShare}
              className="flex-1"
            >
              Share
            </AppButton>
          </div>

          <AppButton
            variant="tertiary"
            size="sm"
            icon={<AlertCircle className="w-4 h-4" />}
            onClick={() => setShowDispute(true)}
            className="w-full"
          >
            Report issue
          </AppButton>

          <AppButton
            variant="primary"
            onClick={onCommunity}
            className="w-full"
          >
            View community
          </AppButton>
        </div>
      </div>

      {/* Dispute Modal */}
      <Dialog open={showDispute} onOpenChange={setShowDispute}>
        <DialogContent className="mx-4 rounded-xl">
          <DialogHeader>
            <DialogTitle>Report an issue</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
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
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other issue</Label>
              </div>
            </RadioGroup>
            <div className="flex space-x-3">
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
                Submit
              </AppButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}