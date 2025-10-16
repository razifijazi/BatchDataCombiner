"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Trash2 } from 'lucide-react';

const DataCombinerForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [embedLink, setEmbedLink] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [category, setCategory] = useState('');
  const [separator, setSeparator] = useState('|');
  const [outputData, setOutputData] = useState('');

  const handleAddEntry = () => {
    if (!title && !embedLink && !thumbnailUrl && !category) {
      return; // Don't add empty entries
    }
    const newEntry = [title, embedLink, thumbnailUrl, category].join(separator);
    setOutputData(prev => prev ? `${prev}\n${newEntry}` : newEntry);

    // Clear input fields after adding
    setTitle('');
    setEmbedLink('');
    setThumbnailUrl('');
    setCategory('');
  };

  const handleClearAll = () => {
    setTitle('');
    setEmbedLink('');
    setThumbnailUrl('');
    setCategory('');
    setOutputData('');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Data Combiner</CardTitle>
          <CardDescription>
            Fill in the fields, add them to the list, and see the combined output below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="embed-link">Embed Link</Label>
              <Input id="embed-link" placeholder="Enter embed link" value={embedLink} onChange={(e) => setEmbedLink(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
              <Input id="thumbnail-url" placeholder="Enter thumbnail URL" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
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
             <Button onClick={handleAddEntry}>
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
              className="h-48 font-mono text-sm bg-gray-50 dark:bg-gray-900/50"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={handleClearAll}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataCombinerForm;