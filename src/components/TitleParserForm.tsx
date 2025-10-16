"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Wand2, Trash2 } from 'lucide-react';

const TitleParserForm: React.FC = () => {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');

  const handleParse = () => {
    const lines = inputData.split('\n');
    const parsedLines = lines.map(line => {
      if (line.trim() === '') return '';
      const parts = line.split(' and ');
      if (parts.length === 2) {
        const title = parts[0].trim();
        const url = parts[1].trim();
        return `▶️${title}\n${url}`;
      }
      return line; // Return original line if format is not as expected
    });
    setOutputData(parsedLines.join('\n\n'));
  };

  const handleClear = () => {
    setInputData('');
    setOutputData('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Title Parser</CardTitle>
        <CardDescription>
          Paste your data in the format "Title and URL" per line. The tool will format it for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-2">
          <Label htmlFor="input-data">Input Data</Label>
          <Textarea
            id="input-data"
            placeholder="e.g., KobelMemekHijabSquirtAhh.mp4 and https://videy.tv/s/tYYLZ3Ow"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="h-64"
          />
        </div>

        <div className="flex justify-center">
          <Button onClick={handleParse} size="lg">
            <Wand2 className="mr-2 h-4 w-4" /> Parse Titles
          </Button>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="output-data">Parsed Output</Label>
          <Textarea
            id="output-data"
            readOnly
            placeholder="Your parsed titles will appear here..."
            value={outputData}
            className="h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900/50"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={handleClear}>
          <Trash2 className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TitleParserForm;