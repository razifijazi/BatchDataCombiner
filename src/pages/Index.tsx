import { Footer } from "@/components/Footer";
import DataCombinerForm from "@/components/DataCombinerForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-8">
      <div className="w-full max-w-6xl px-4">
        <DataCombinerForm />
      </div>
      <div className="pt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Index;