import { BubblesIcon, Loader2Icon, LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

export default function PageLoader() {
  const {theme}=useThemeStore();
  return (
    <div className="min-h-screen flex items-center justify-center" data-theme={theme}>
      <BubblesIcon className="animate-bounce size-10 text-primary" />
    </div>
  );
}