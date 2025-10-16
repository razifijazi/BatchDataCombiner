"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link, Trash2, Copy } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface LinkChangerFormProps {
  inputLinks: string;
  setInputLinks: React.Dispatch<React.SetStateAction<string>>;
  outputIframes: string;
  setOutputIframes: React.Dispatch<React.SetStateAction<string>>;
  onClear: () => void;
}

const LinkChangerForm: React.FC<LinkChangerFormProps> = ({
  inputLinks,
  setInputLinks,
  outputIframes,
  setOutputIframes,
  onClear,
}) => {
  const handleChangeLinks = () => {
    const links = inputLinks.split('\n').filter(link => link.trim() !== '');
    const iframes = links.map(link => {
      const changedLink = link.replace('/s/', '/e/');
      return `<iframe width="1280" height="720" src="${changedLink}" frameborder="0" allowfullscreen></iframe>`;
    });
    setOutputIframes(iframes.join('\n'));
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
        <CardTitle>Link Changer</CardTitle>
        <CardDescription>
          Paste your links below to convert them into iframe embed codes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-2">
          <Label htmlFor="input-links">Input Links</Label>
          <Textarea
            id="input-links"
            placeholder="Paste links here, one per line..."
            value={inputLinks}
            onChange={(e) => setInputLinks(e.target.value)}
            className="h-64"
          />
        </div>

        <div className="flex justify-center">
          <Button onClick={handleChangeLinks} size="lg">
            <Link className="mr-2 h-4 w-4" /> Change Links
          </Button>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="output-iframes">iFrame Output</Label>
          <div className="relative">
            <Textarea
              id="output-iframes"
              readOnly
              placeholder="Your iframe codes will appear here..."
              value={outputIframes}
              className="h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900/50 pr-12"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => handleCopyToClipboard(outputIframes)}
              disabled={!outputIframes}
            >
              <Copy className="h-4 w-4" />
            </Button>
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

export default LinkChangerForm;