import { MadeWithDyad } from "@/components/made-with-dyad";
import LinkSeparator from "@/components/LinkSeparator";

const Index = () => {
  const myLinks = [
    { label: "Google", url: "https://google.com" },
    { label: "GitHub", url: "https://github.com" },
    { label: "Dyad", url: "https://dyad.sh" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">My Links</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Here are some of my favorite websites.
        </p>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <LinkSeparator links={myLinks} separator="|" />
        </div>
      </div>
      <div className="absolute bottom-0">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;