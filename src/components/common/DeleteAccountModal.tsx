import React, { useState } from 'react';
import { AppButton } from '../design-system/AppButton';
import { AppInput } from '../design-system/AppInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DeleteAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteComplete: () => void;
}

export function DeleteAccountModal({ open, onOpenChange, onDeleteComplete }: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirmText === 'DELETE') {
      setIsDeleting(true);
      
      // Simulate deletion process
      setTimeout(() => {
        toast.success("Account deleted successfully");
        onDeleteComplete();
      }, 2000);
    }
  };

  const handleCancel = () => {
    setConfirmText('');
    setIsDeleting(false);
    onOpenChange(false);
  };

  const canDelete = confirmText === 'DELETE' && !isDeleting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-red-900">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <span>Delete Account & Data</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Warning */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold text-red-900">This action cannot be undone</p>
                <p className="text-sm text-red-800">
                  Deleting your account will permanently remove all your data from EnergyLink.
                </p>
              </div>
            </div>
          </div>

          {/* Consequences */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">What will be deleted:</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Your account profile and contact information</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>All trading history and transaction records</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Saved preferences and settings</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Community participation and badges</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Access to the EnergyLink platform</span>
              </li>
            </ul>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">Important:</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Any pending trades will be cancelled</li>
              <li>• Outstanding payments will be processed</li>
              <li>• You can create a new account anytime</li>
              <li>• Historical energy data cannot be recovered</li>
            </ul>
          </div>

          {/* Confirmation Input */}
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              To confirm deletion, type <span className="font-mono font-bold bg-gray-100 px-1 rounded">DELETE</span> in the field below:
            </p>
            
            <AppInput
              type="text"
              value={confirmText}
              onChange={setConfirmText}
              placeholder="Type DELETE to confirm"
              className="font-mono"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <AppButton
              variant="secondary"
              onClick={handleCancel}
              disabled={isDeleting}
              className="flex-1"
            >
              Cancel
            </AppButton>
            <AppButton
              variant="tertiary"
              onClick={handleDelete}
              disabled={!canDelete}
              className="flex-1 bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300"
              icon={isDeleting ? undefined : <Trash2 className="w-4 h-4" />}
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </AppButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}