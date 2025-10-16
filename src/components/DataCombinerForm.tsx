"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Trash2 } from 'lucide-react';

const DataCombinerForm: React.FC = () => {
  const [titles, setTitles] = useState('');
  const [embedLinks, setEmbedLinks] = useState('');
  const [thumbnailUrls, setThumbnailUrls] = useState('');
  const [categories, setCategories] = useState('');
  const [separator, setSeparator] = useState('|');
  const [outputData, setOutputData] = useState('');

  const handleCombineData = () => {
    const titlesArr = titles.split('\n').filter(t => t.trim() !== '');
    const embedLinksArr = embedLinks.split('\n').filter(t => t.trim() !== '');
    const thumbnailUrlsArr = thumbnailUrls.split('\n').filter(t => t.trim() !== '');
    const categoriesArr = categories.split('\n').filter(t => t.trim() !== '');

    const maxLength = Math.max(titlesArr.length, embedLinksArr.length, thumbnailUrlsArr.length, categoriesArr.length);
    if (maxLength === 0) {
      setOutputData('');
      return;
    }

    const newEntries = [];
    for (let i = 0; i < maxLength; i++) {
      const entryParts = [
        titlesArr[i] || '',
        embedLinksArr[i] || '',
        thumbnailUrlsArr[i] || '',
        categoriesArr[i] || ''
      ];
      newEntries.push(entryParts.join(separator));
    }

    setOutputData(newEntries.join('\n'));
  };

  const handleClearAll = () => {
    setTitles('');
    setEmbedLinks('');
    setThumbnailUrls('');
    setCategories('');
    setOutputData('');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Batch Data Combiner</CardTitle>
          <CardDescription>
            Paste your data into the fields below. Each line in a field corresponds to the same line in other fields.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="titles">Titles</Label>
              <Textarea id="titles" placeholder="Title 1&#10;Title 2&#10;Title 3" value={titles} onChange={(e) => setTitles(e.target.value)} className="h-48" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="embed-links">Embed Links</Label>
              <Textarea id="embed-links" placeholder="Link 1&#10;Link 2&#10;Link 3" value={embedLinks} onChange={(e) => setEmbedLinks(e.target.value)} className="h-48" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnail-urls">Thumbnail URLs</Label>
              <Textarea id="thumbnail-urls" placeholder="URL 1&#10;URL 2&#10;URL 3" value={thumbnailUrls} onChange={(e) => setThumbnailUrls(e.target.value)} className="h-48" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categories">Categories</Label>
              <Textarea id="categories" placeholder="Category 1&#10;Category 2&#10;Category 3" value={categories} onChange={(e) => setCategories(e.target.value)} className="h-48" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="grid gap-2 w-full sm:w-auto">
              <Label htmlFor="separator">Separator</Label>
              <Input
                id="separator"
                placeholder="e.g., |, :, -"
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
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataCombinerForm;