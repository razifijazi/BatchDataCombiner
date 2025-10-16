"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Wand2, Trash2 } from 'lucide-react';

const TitleParserForm: React.FC = () => {
  const [inputData, setInputData] = useState('');
  const [outputTitles, setOutputTitles] = useState('');
  const [outputUrls, setOutputUrls] = useState('');

  const handleParse = () => {
    const lines = inputData.split('\n');
    const titles: string[] = [];
    const urls: string[] = [];
    
    lines.forEach(line => {
      if (line.trim() === '') return;
      const parts = line.split(' and ');
      if (parts.length === 2) {
        titles.push(parts[0].trim());
        urls.push(parts[1].trim());
      } else {
        titles.push(line);
        urls.push('');
      }
    });

    setOutputTitles(titles.join('\n'));
    setOutputUrls(urls.join('\n'));
  };

  const handleClear = () => {
    setInputData('');
    setOutputTitles('');
    setOutputUrls('');
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="output-titles">Titles</Label>
            <Textarea
              id="output-titles"
              readOnly
              placeholder="Parsed titles will appear here..."
              value={outputTitles}
              className="h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900/50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="output-urls">URLs</Label>
            <Textarea
              id="output-urls"
              readOnly
              placeholder="Parsed URLs will appear here..."
              value={outputUrls}
              className="h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900/50"
            />
          </div>
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