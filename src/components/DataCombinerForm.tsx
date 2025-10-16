"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Trash2, PlusCircle, X, Copy } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { Field } from '@/pages/Index';

const INITIAL_FIELD_COUNT = 4;

interface DataCombinerFormProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  separator: string;
  setSeparator: React.Dispatch<React.SetStateAction<string>>;
  outputData: string;
  setOutputData: React.Dispatch<React.SetStateAction<string>>;
  onClear: () => void;
}

const DataCombinerForm: React.FC<DataCombinerFormProps> = ({
  fields,
  setFields,
  separator,
  setSeparator,
  outputData,
  setOutputData,
  onClear,
}) => {
  const handleFieldChange = (id: number, value: string) => {
    setFields(fields.map(field => field.id === id ? { ...field, value } : field));
  };

  const handleAddField = () => {
    const newId = fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : INITIAL_FIELD_COUNT;
    const newField: Field = {
      id: newId,
      label: `Field ${fields.length + 1}`,
      placeholder: `Data for field ${fields.length + 1}...`,
      value: '',
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (id: number) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleCombineData = () => {
    const allLinesByField = fields.map(field => field.value.split('\n'));
    const maxLength = Math.max(0, ...allLinesByField.map(lines => lines.length));

    if (maxLength === 0) {
      setOutputData('');
      return;
    }

    const combinedLines = [];
    for (let i = 0; i < maxLength; i++) {
      const lineParts = allLinesByField.map(lines => lines[i] || '');
      const nonEmptyParts = lineParts.filter(part => part.trim() !== '');
      combinedLines.push(nonEmptyParts.join(separator));
    }

    setOutputData(combinedLines.join('\n'));
  };

  const handleCopyToClipboard = (data: string) => {
    if (!data) return;
    navigator.clipboard.writeText(data).then(() => {
      showSuccess('Copied to clipboard!');
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Batch Data Combiner</CardTitle>
          <CardDescription>
            Paste your data into the fields below. Each line corresponds to the same line in other fields. Add or remove fields as needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(field => (
              <div key={field.id} className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
                  {field.id >= INITIAL_FIELD_COUNT && (
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveField(field.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Textarea
                  id={`field-${field.id}`}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="h-48"
                />
              </div>
            ))}
          </div>
          
          <Button variant="outline" onClick={handleAddField}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Field
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="grid gap-2 w-full sm:w-auto">
              <Label htmlFor="separator">Separator</Label>
              <Input
                id="separator"
                placeholder="e.g., ,, :, -"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-full sm:w-48"
              />
            </div>
            <Button onClick={handleCombineData} size="lg" className="w-full sm:w-auto mt-4 sm:mt-0 self-end">
                <Zap className="mr-2 h-4 w-4" /> Combine Data
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="output-data">Combined Output</Label>
            <div className="relative">
              <Textarea
                id="output-data"
                readOnly
                placeholder="Your combined data will appear here..."
                value={outputData}
                className="h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900/50 pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => handleCopyToClipboard(outputData)}
                disabled={!outputData}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={onClear}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear All & Reset Fields
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataCombinerForm;