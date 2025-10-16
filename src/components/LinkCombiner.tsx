"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const LinkCombiner: React.FC = () => {
  const [inputData, setInputData] = useState('Title1,Embed Link1,Thumbnail URL1,Category1\nTitle2,Embed Link2,Thumbnail URL2,Category2');
  const [separator, setSeparator] = useState('|');
  const [outputData, setOutputData] = useState('');

  const handleCombine = () => {
    const lines = inputData.split('\n').filter(line => line.trim() !== '');
    const result = lines.map(line => {
      const parts = line.split(',');
      return parts.join(separator);
    }).join('\n');
    setOutputData(result);
  };

  const handleClear = () => {
    setInputData('');
    setSeparator('|');
    setOutputData('');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Link & Word Combiner</CardTitle>
          <CardDescription>
            Combine multiple data points from each line into a single string using a custom separator.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="input-data">Input Data</Label>
            <Textarea
              id="input-data"
              placeholder="Paste your data here, with values separated by commas and each entry on a new line."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="h-48 font-mono text-sm"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="separator">Separator</Label>
            <Input
              id="separator"
              placeholder="Enter separator, e.g., |, :, -"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="output-data">Output</Label>
            <Textarea
              id="output-data"
              readOnly
              placeholder="Combined output will appear here."
              value={outputData}
              className="h-48 font-mono text-sm bg-gray-50 dark:bg-gray-900/50"
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={handleCombine}>Combine</Button>
          <Button variant="outline" onClick={handleClear}>Clear</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LinkCombiner;