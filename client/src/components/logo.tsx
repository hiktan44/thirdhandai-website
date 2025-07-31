import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img 
        src="/logo.jpg" 
        alt="Third Hand AI Agency" 
        className="h-20 w-auto object-contain"
      />
      {showText && (
        <div className="flex flex-col">
          <span className="text-3xl font-heading font-bold text-white">
            Third<span className="text-blue-400">Hand</span>
          </span>
          <span className="text-base font-heading text-slate-300 -mt-1">AI Agency</span>
        </div>
      )}
    </div>
  );
}