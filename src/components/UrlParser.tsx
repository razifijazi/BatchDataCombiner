"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Terminal } from "lucide-react";

interface ParsedUrl {
  [key: string]: string | undefined;
}

const UrlParser: React.FC = () => {
  const [urlInput, setUrlInput] = useState('http://foo:bar@w1.superman.com/very/long/path.html?p1=v1&p2=v2#more-details');
  const [parsedUrl, setParsedUrl] = useState<ParsedUrl | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseUrl = (url: string) => {
    if (!url) {
      setParsedUrl(null);
      setError(null);
      return;
    }
    try {
      const urlObject = new URL(url);
      const hostnameParts = urlObject.hostname.split('.');
      
      const tld = hostnameParts.length > 1 ? hostnameParts.pop() || '' : '';
      const domain = hostnameParts.length > 0 ? hostnameParts.pop() || '' : '';
      const subdomain = hostnameParts.join('.');

      const parsed: ParsedUrl = {
        Scheme: urlObject.protocol.slice(0, -1),
        Protocol: urlObject.protocol.slice(0, -1),
        UserInfo: urlObject.username ? (urlObject.password ? `${urlObject.username}:${urlObject.password}` : urlObject.username) : undefined,
        UserName: urlObject.username || undefined,
        Password: urlObject.password || undefined,
        Authority: urlObject.host,
        Host: urlObject.host,
        HostName: urlObject.hostname,
        SubDomain: subdomain || undefined,
        Domain: domain,
        tld: tld,
        Resource: `${urlObject.pathname}${urlObject.search}${urlObject.hash}`,
        Directory: urlObject.pathname.substring(0, urlObject.pathname.lastIndexOf('/')) || undefined,
        File: urlObject.pathname.substring(urlObject.pathname.lastIndexOf('/') + 1) || undefined,
        QueryString: urlObject.search || undefined,
        Fragment: urlObject.hash || undefined,
      };
      
      urlObject.searchParams.forEach((value, key) => {
        parsed[`Query Param: ${key}`] = value;
      });

      setParsedUrl(parsed);
      setError(null);
    } catch (e) {
      setParsedUrl(null);
      setError("Invalid URL provided. Please check the format.");
    }
  };

  const handleConvert = () => {
    parseUrl(urlInput);
  };

  const handleClear = () => {
    setUrlInput('');
    setParsedUrl(null);
    setError(null);
  };

  useEffect(() => {
    handleConvert();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>URL Parser</CardTitle>
          <CardDescription>
            Enter a URL to see its components broken down into a readable format.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Textarea
              placeholder="Enter URL here..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="h-64 md:h-96 font-mono text-sm resize-none"
            />
            <div className="border rounded-md p-4 h-64 md:h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
              {error && (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {parsedUrl && !error && (
                <div className="text-sm font-mono space-y-1">
                  {Object.entries(parsedUrl)
                    .filter(([, value]) => value)
                    .map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="font-semibold w-32 shrink-0 text-gray-600 dark:text-gray-400">{key}:</span>
                        <span className="break-all">{value}</span>
                      </div>
                    ))}
                </div>
              )}
              {!parsedUrl && !error && (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Parsed URL components will appear here.
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            <Button onClick={handleConvert}>Convert</Button>
            <Button variant="outline" onClick={handleClear}>Clear</Button>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Info className="h-4 w-4 mr-2" />
            Your data won't be stored by us.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UrlParser;