import { Footer } from "@/components/Footer";
import DataCombinerForm from "@/components/DataCombinerForm";
import TitleParserForm from "@/components/TitleParserForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-8">
      <div className="w-full max-w-6xl px-4">
        <Tabs defaultValue="combiner" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="combiner">Batch Data Combiner</TabsTrigger>
            <TabsTrigger value="parser">Title Parser</TabsTrigger>
          </TabsList>
          <TabsContent value="combiner">
            <DataCombinerForm />
          </TabsContent>
          <TabsContent value="parser">
            <TitleParserForm />
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