import { useState } from "react";
import { Footer } from "@/components/Footer";
import DataCombinerForm from "@/components/DataCombinerForm";
import TitleParserForm from "@/components/TitleParserForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Field {
  id: number;
  label: string;
  placeholder: string;
  value: string;
}

const initialFieldsData: Omit<Field, 'id' | 'value'>[] = [
  { label: 'Field 1', placeholder: 'Data for field 1...' },
  { label: 'Field 2', placeholder: 'Data for field 2...' },
  { label: 'Field 3', placeholder: 'Data for field 3...' },
  { label: 'Field 4', placeholder: 'Data for field 4...' },
];

const createInitialFields = (): Field[] => 
  initialFieldsData.map((field, index) => ({
    ...field,
    id: index,
    value: '',
  }));

const Index = () => {
  // State for DataCombinerForm
  const [fields, setFields] = useState<Field[]>(createInitialFields());
  const [separator, setSeparator] = useState(',');
  const [outputData, setOutputData] = useState('');

  const handleCombinerClear = () => {
    setFields(createInitialFields());
    setOutputData('');
  };

  // State for TitleParserForm
  const [inputData, setInputData] = useState('');
  const [outputTitles, setOutputTitles] = useState('');
  const [outputUrls, setOutputUrls] = useState('');

  const handleParserClear = () => {
    setInputData('');
    setOutputTitles('');
    setOutputUrls('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-8">
      <div className="w-full max-w-6xl px-4">
        <Tabs defaultValue="combiner" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="combiner">Batch Data Combiner</TabsTrigger>
            <TabsTrigger value="parser">Title Parser</TabsTrigger>
          </TabsList>
          <TabsContent value="combiner">
            <DataCombinerForm 
              fields={fields}
              setFields={setFields}
              separator={separator}
              setSeparator={setSeparator}
              outputData={outputData}
              setOutputData={setOutputData}
              onClear={handleCombinerClear}
            />
          </TabsContent>
          <TabsContent value="parser">
            <TitleParserForm 
              inputData={inputData}
              setInputData={setInputData}
              outputTitles={outputTitles}
              setOutputTitles={setOutputTitles}
              outputUrls={outputUrls}
              setOutputUrls={setOutputUrls}
              onClear={handleParserClear}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="pt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Index;