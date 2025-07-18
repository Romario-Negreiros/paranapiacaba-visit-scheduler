import React from 'react';
import { Button } from './button';
import { Delete } from 'lucide-react';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  isVisible: boolean;
  type?: 'numeric' | 'text';
}

export function VirtualKeyboard({ onKeyPress, onBackspace, isVisible, type = 'text' }: VirtualKeyboardProps) {
  if (!isVisible) return null;

  const numericKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0']
  ];

  const textKeys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const keys = type === 'numeric' ? numericKeys : textKeys;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t-4 border-primary p-6 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-3">
          {keys.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  size="lg"
                  className="min-w-[4rem] h-16 text-xl font-semibold hover:bg-primary hover:text-primary-foreground"
                  onClick={() => onKeyPress(key)}
                >
                  {key}
                </Button>
              ))}
            </div>
          ))}
          <div className="flex justify-center gap-4 mt-2">
            {type === 'text' && (
              <Button
                variant="outline"
                size="lg"
                className="min-w-[8rem] h-16 text-lg"
                onClick={() => onKeyPress(' ')}
              >
                Espaço
              </Button>
            )}
            <Button
              variant="destructive"
              size="lg"
              className="min-w-[8rem] h-16 text-lg"
              onClick={onBackspace}
            >
              <Delete className="w-6 h-6 mr-2" />
              Apagar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}