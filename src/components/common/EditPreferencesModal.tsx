import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppInput } from '../design-system/AppInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Settings, Clock, Battery } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EditPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: 'seller' | 'buyer';
  currentPreferences: {
    price: number;
    dailyLimit: number;
    sameBlockFirst: boolean;
    quietHours: boolean;
    batteryGuard?: number; // For sellers only
  };
  onSave: (preferences: any) => void;
}

export function EditPreferencesModal({ 
  open, 
  onOpenChange, 
  role, 
  currentPreferences, 
  onSave 
}: EditPreferencesModalProps) {
  const [price, setPrice] = useState([currentPreferences.price * 100]); // Convert to cents
  const [dailyLimit, setDailyLimit] = useState(currentPreferences.dailyLimit);
  const [sameBlockFirst, setSameBlockFirst] = useState(currentPreferences.sameBlockFirst);
  const [quietHours, setQuietHours] = useState(currentPreferences.quietHours);
  const [quietStart, setQuietStart] = useState('21:00');
  const [quietEnd, setQuietEnd] = useState('07:00');
  const [batteryGuard, setBatteryGuard] = useState([currentPreferences.batteryGuard || 20]);

  const handleSave = () => {
    const preferences = {
      price: price[0] / 100, // Convert back to dollars
      dailyLimit,
      sameBlockFirst,
      quietHours,
      quietStart,
      quietEnd,
      ...(role === 'seller' && { batteryGuard: batteryGuard[0] })
    };
    
    onSave(preferences);
    toast.success("Preferences saved successfully!");
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset to current values
    setPrice([currentPreferences.price * 100]);
    setDailyLimit(currentPreferences.dailyLimit);
    setSameBlockFirst(currentPreferences.sameBlockFirst);
    setQuietHours(currentPreferences.quietHours);
    setBatteryGuard([currentPreferences.batteryGuard || 20]);
    onOpenChange(false);
  };

  const isFormValid = dailyLimit >= 0.5 && dailyLimit <= 50;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-[#2E7D32]" />
            <span>Edit Trading Preferences</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          {/* Price Band */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {role === 'seller' ? 'Minimum sell price' : 'Maximum buy price'}
            </h3>
            
            <div className="space-y-4">
              <AppInput
                type="slider"
                value={price}
                onChange={setPrice}
                min={role === 'seller' ? 8 : 10}
                max={role === 'seller' ? 18 : 22}
                step={1}
                formatLabel={(value) => `$${(value / 100).toFixed(2)}`}
              />
              
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <AppInput
                    type="number"
                    label="Price ($/kWh)"
                    value={(price[0] / 100).toFixed(2)}
                    onChange={(value) => setPrice([Math.round(parseFloat(value) * 100)])}
                    min={role === 'seller' ? 0.08 : 0.10}
                    max={role === 'seller' ? 0.18 : 0.22}
                    step={0.01}
                  />
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Current utility rate</p>
                  <p className="font-semibold text-gray-900">
                    {role === 'seller' ? '$0.06/kWh' : '$0.20/kWh'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Limit */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Daily energy limit</h3>
            
            <AppInput
              type="number-stepper"
              label={`Maximum kWh to ${role === 'seller' ? 'sell' : 'buy'} per day`}
              value={dailyLimit}
              onChange={setDailyLimit}
              min={0.5}
              max={50}
              step={0.5}
              suffix="kWh"
            />
            
            {(dailyLimit < 0.5 || dailyLimit > 50) && (
              <p className="text-sm text-red-600">
                Daily limit must be between 0.5 and 50 kWh
              </p>
            )}
          </div>

          {/* Matching Preferences */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Matching preferences</h3>
            
            <div className="space-y-4">
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
                  <p className="font-medium text-gray-900">Quiet hours</p>
                  <p className="text-sm text-gray-600">Pause trading during specified hours</p>
                </div>
                <AppInput
                  type="toggle"
                  checked={quietHours}
                  onChange={setQuietHours}
                />
              </div>

              {quietHours && (
                <div className="grid grid-cols-2 gap-4 pl-4">
                  <AppInput
                    type="time"
                    label="Start time"
                    value={quietStart}
                    onChange={setQuietStart}
                  />
                  <AppInput
                    type="time"
                    label="End time"
                    value={quietEnd}
                    onChange={setQuietEnd}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Battery Safeguard (Sellers only) */}
          {role === 'seller' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Battery className="w-5 h-5 text-[#2E7D32]" />
                <h3 className="text-lg font-semibold text-gray-900">Battery safeguard</h3>
              </div>
              
              <p className="text-sm text-gray-600">
                Keep this percentage of battery charge for your own use during outages
              </p>
              
              <AppInput
                type="slider"
                value={batteryGuard}
                onChange={setBatteryGuard}
                min={10}
                max={80}
                step={5}
                formatLabel={(value) => `${value}%`}
              />
              
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Battery will stop selling when charge drops below <span className="font-semibold">{batteryGuard[0]}%</span>
                </p>
              </div>
            </div>
          )}

          {/* Estimated Impact */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">Estimated daily impact</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-green-800">Energy: <span className="font-semibold">{dailyLimit} kWh</span></p>
              </div>
              <div>
                <p className="text-green-800">
                  {role === 'seller' ? 'Earnings:' : 'Cost:'} 
                  <span className="font-semibold"> ${(dailyLimit * (price[0] / 100)).toFixed(2)}</span>
                </p>
              </div>
              <div>
                <p className="text-green-800">
                  vs Utility: 
                  <span className="font-semibold"> 
                    {role === 'seller' 
                      ? `+$${(dailyLimit * ((price[0] / 100) - 0.06)).toFixed(2)}`
                      : `-$${(dailyLimit * (0.20 - (price[0] / 100))).toFixed(2)}`
                    }
                  </span>
                </p>
              </div>
              <div>
                <p className="text-green-800">CO₂ avoided: <span className="font-semibold">{(dailyLimit * 0.69).toFixed(1)} kg</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6 border-t border-gray-200">
          <AppButton
            variant="secondary"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </AppButton>
          <AppButton
            variant="primary"
            onClick={handleSave}
            disabled={!isFormValid}
            className="flex-1"
          >
            Save
          </AppButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}