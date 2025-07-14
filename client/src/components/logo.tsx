import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo Icon - Modern AI Hand Design */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        
        {/* Background Circle with Gradient */}
        <circle cx="24" cy="24" r="23" fill="url(#gradient1)" />
        <circle cx="24" cy="24" r="21" fill="white" fillOpacity="0.1" />
        
        {/* Modern Hand Shape */}
        <g transform="translate(24, 24)">
          {/* Palm Base */}
          <path
            d="M-8 -4 C-8 -8, -4 -12, 0 -12 C4 -12, 8 -8, 8 -4 L8 4 C8 8, 4 12, 0 12 C-4 12, -8 8, -8 4 Z"
            fill="white"
            fillOpacity="0.95"
          />
          
          {/* Three Fingers representing "Third Hand" */}
          <rect x="-6" y="-12" width="3" height="8" rx="1.5" fill="white" />
          <rect x="-1.5" y="-14" width="3" height="10" rx="1.5" fill="white" />
          <rect x="3" y="-12" width="3" height="8" rx="1.5" fill="white" />
          
          {/* AI Neural Network Overlay */}
          <g opacity="0.8">
            {/* Nodes */}
            <circle cx="-4" cy="-2" r="2" fill="#3B82F6" />
            <circle cx="0" cy="2" r="2" fill="#3B82F6" />
            <circle cx="4" cy="-2" r="2" fill="#3B82F6" />
            <circle cx="0" cy="-6" r="1.5" fill="#60A5FA" />
            <circle cx="-3" cy="4" r="1.5" fill="#60A5FA" />
            <circle cx="3" cy="4" r="1.5" fill="#60A5FA" />
            
            {/* Connections */}
            <line x1="-4" y1="-2" x2="0" y2="2" stroke="#3B82F6" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="2" x2="4" y2="-2" stroke="#3B82F6" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="-6" x2="-4" y2="-2" stroke="#60A5FA" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="-6" x2="4" y2="-2" stroke="#60A5FA" strokeWidth="0.8" opacity="0.6" />
            <line x1="-3" y1="4" x2="0" y2="2" stroke="#60A5FA" strokeWidth="0.8" opacity="0.6" />
            <line x1="3" y1="4" x2="0" y2="2" stroke="#60A5FA" strokeWidth="0.8" opacity="0.6" />
          </g>
        </g>
        
        {/* Subtle "3" watermark */}
        <text
          x="24"
          y="36"
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontWeight="bold"
          opacity="0.2"
          fontFamily="Arial"
        >
          3
        </text>
      </svg>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-3xl font-heading font-bold text-slate-800">
            Third<span className="text-primary">Hand</span>
          </span>
          <span className="text-base font-heading text-slate-600 -mt-1">AI Agency</span>
        </div>
      )}
    </div>
  );
}