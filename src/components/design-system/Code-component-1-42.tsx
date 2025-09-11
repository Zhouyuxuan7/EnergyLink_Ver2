import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { cn } from '../ui/utils';
import { Minus, Plus } from 'lucide-react';

interface BaseInputProps {
  label?: string;
  error?: string;
  className?: string;
}

interface TextInputProps extends BaseInputProps {
  type: 'text';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface NumberStepperProps extends BaseInputProps {
  type: 'number-stepper';
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}

interface SliderInputProps extends BaseInputProps {
  type: 'slider';
  value: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  formatLabel?: (value: number) => string;
}

interface ToggleInputProps extends BaseInputProps {
  type: 'toggle';
  checked: boolean;
  onChange: (checked: boolean) => void;
}

type AppInputProps = TextInputProps | NumberStepperProps | SliderInputProps | ToggleInputProps;

export function AppInput(props: AppInputProps) {
  const { label, error, className } = props;

  const renderInput = () => {
    switch (props.type) {
      case 'text':
        return (
          <Input
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            className={cn("min-h-[44px]", error && "border-red-500")}
          />
        );

      case 'number-stepper':
        return (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => props.onChange(Math.max((props.min ?? 0), props.value - (props.step ?? 1)))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex-1 text-center font-medium">
              {props.value}{props.suffix && ` ${props.suffix}`}
            </div>
            <button
              type="button"
              onClick={() => props.onChange(Math.min((props.max ?? 100), props.value + (props.step ?? 1)))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-4">
            <Slider
              value={props.value}
              onValueChange={props.onChange}
              min={props.min ?? 0}
              max={props.max ?? 100}
              step={props.step ?? 1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{props.formatLabel ? props.formatLabel(props.min ?? 0) : props.min ?? 0}</span>
              <span>{props.formatLabel ? props.formatLabel(props.value[0]) : props.value[0]}</span>
              <span>{props.formatLabel ? props.formatLabel(props.max ?? 100) : props.max ?? 100}</span>
            </div>
          </div>
        );

      case 'toggle':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={props.checked}
              onCheckedChange={props.onChange}
            />
            {label && <Label htmlFor="toggle">{label}</Label>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && props.type !== 'toggle' && (
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}