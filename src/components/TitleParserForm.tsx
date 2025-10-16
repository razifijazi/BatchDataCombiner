"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Wand2, Trash2, Copy } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface TitleParserFormProps {
  inputData: string;
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  outputTitles: string;
  setOutputTitles: React.Dispatch<React.SetStateAction<string>>;
  outputUrls: string;
  setOutputUrls: React.Dispatch<React.SetStateAction<string>>;
  onClear: () => void;
}

const TitleParserForm: React.FC<TitleParserFormProps> = ({
  inputData,
  setInputData,
  outputTitles,
  setOutputTitles,
  outputUrls,
  setOutputUrls,
  onClear,
}) => {
  const handleParse = () => {
    const entries = inputData.split('▶️').filter(entry => entry.trim() !== '');
    const titles: string[] = [];
    const urls: string[] = [];

    entries.forEach(entry => {
      const lines = entry.trim().split('\n').map(line => line.trim()).filter(line => line !== '');
      if (lines.length > 0) {
        const lastLine = lines[lines.length - 1];
        if (lastLine.startsWith('http')) {
          const url = lines.pop();
          const title = lines.join(' ');
          urls.push(url || '');
          titles.push(title);
        } else {
          // No URL found, treat the whole entry as a title
          titles.push(lines.join(' '));
          urls.push('');
        }
      }
    });

    setOutputTitles(titles.join('\n'));
    setOutputUrls(urls.join('\n'));
  };

  const handleCopyToClipboard = (data: string) => {
    if (!data) return;
    navigator.clipboard.writeText(data).then(() => {
      showSuccess('Copied to clipboard!');
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Title Parser</CardTitle>
        <CardDescription>
          Paste your data below. Each title should be prefixed with '▶️' and followed by its URL.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-2">
          <Label htmlFor="input-data">Input Data</Label>
          <Textarea
            id="input-data"
            placeholder={`e.g.,\n▶️ KobelMemekHijabSquirtAhh.mp4\nhttps://videy.tv/s/tYYLZ3Ow`}
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
            <div className="relative">
              <Textarea
                id="output-titles"
                readOnly
                placeholder="Parsed titles will appear here..."
                value={outputTitles}
                className="h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900/50 pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => handleCopyToClipboard(outputTitles)}
                disabled={!outputTitles}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="output-urls">URLs</Label>
            <div className="relative">
              <Textarea
                id="output-urls"
                readOnly
                placeholder="Parsed URLs will appear here..."
                value={outputUrls}
                className="h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900/50 pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => handleCopyToClipboard(outputUrls)}
                disabled={!outputUrls}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={onClear}>
          <Trash2 className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TitleParserForm;