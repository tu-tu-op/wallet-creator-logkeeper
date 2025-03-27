
import { cn } from "@/lib/utils";

type AnimationProps = {
  index?: number;
  className?: string;
};

export const fadeIn = ({ index = 0, className = "" }: AnimationProps) => {
  return cn(
    "opacity-0 animate-fade-in",
    {
      "animation-delay-[0ms]": index === 0,
      "animation-delay-[100ms]": index === 1,
      "animation-delay-[200ms]": index === 2,
      "animation-delay-[300ms]": index === 3,
      "animation-delay-[400ms]": index === 4,
    },
    className
  );
};

export const slideUp = ({ index = 0, className = "" }: AnimationProps) => {
  return cn(
    "opacity-0 animate-slide-up",
    {
      "animation-delay-[0ms]": index === 0,
      "animation-delay-[100ms]": index === 1,
      "animation-delay-[200ms]": index === 2,
      "animation-delay-[300ms]": index === 3,
      "animation-delay-[400ms]": index === 4,
    },
    className
  );
};

export const scaleIn = ({ index = 0, className = "" }: AnimationProps) => {
  return cn(
    "opacity-0 animate-scale-in",
    {
      "animation-delay-[0ms]": index === 0,
      "animation-delay-[100ms]": index === 1,
      "animation-delay-[200ms]": index === 2,
      "animation-delay-[300ms]": index === 3,
      "animation-delay-[400ms]": index === 4,
    },
    className
  );
};

export const blurIn = ({ index = 0, className = "" }: AnimationProps) => {
  return cn(
    "opacity-0 animate-blur-in",
    {
      "animation-delay-[0ms]": index === 0,
      "animation-delay-[100ms]": index === 1,
      "animation-delay-[200ms]": index === 2,
      "animation-delay-[300ms]": index === 3,
      "animation-delay-[400ms]": index === 4,
    },
    className
  );
};
