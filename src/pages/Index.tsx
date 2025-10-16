import { MadeWithDyad } from "@/components/made-with-dyad";
import UrlParser from "@/components/UrlParser";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-6xl">
        <UrlParser />
      </div>
      <div className="absolute bottom-0">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;