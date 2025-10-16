"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Trash2, X } from 'lucide-react';

interface Field {
  id: number;
  value: string;
  placeholder: string;
}

let nextId = 5; // Start after initial fields

const initialFields: Field[] = [
  { id: 1, value: '', placeholder: 'Title' },
  { id: 2, value: '', placeholder: 'Embed Link' },
  { id: 3, value: '', placeholder: 'Thumbnail URL' },
  { id: 4, value: '', placeholder: 'Category' },
];

const DataCombinerForm: React.FC = () => {
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [separator, setSeparator] = useState('|');
  const [outputData, setOutputData] = useState('');

  const handleFieldValueChange = (id: number, newValue: string) => {
    setFields(fields.map(field => field.id === id ? { ...field, value: newValue } : field));
  };

  const handleAddField = () => {
    setFields([...fields, { id: nextId++, value: '', placeholder: `Field ${fields.length + 1}` }]);
  };

  const handleRemoveField = (id: number) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleAddEntry = () => {
    const newEntry = fields.map(field => field.value).join(separator);
    if (newEntry.replace(new RegExp(`\\${separator}`, 'g'), '').trim() === '') {
      return; // Don't add empty entries
    }
    setOutputData(prev => prev ? `${prev}\n${newEntry}` : newEntry);

    // Clear input fields after adding
    setFields(fields.map(field => ({ ...field, value: '' })));
  };

  const handleClearAll = () => {
    setFields(initialFields);
    setOutputData('');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Customizable Data Combiner</CardTitle>
          <CardDescription>
            Add, remove, and fill in your own fields. Combine them into a list with a custom separator.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <Label>Input Fields</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveField(field.id)} disabled={fields.length <= 1}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={handleAddField}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Field
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="separator">Separator</Label>
            <Input
              id="separator"
              placeholder="e.g., |, :, -"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>
          
          <div className="flex justify-center">
             <Button onClick={handleAddEntry} size="lg">
                <PlusCircle className="mr-2 h-4 w-4" /> Add to List
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="output-data">Combined Output</Label>
            <Textarea
              id="output-data"
              readOnly
              placeholder="Your combined data will appear here..."
              value={outputData}
              className="h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900/50"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={handleClearAll}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear All & Reset Fields
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataCombinerForm;