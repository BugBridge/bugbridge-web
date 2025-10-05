import React from "react";
import { cn } from "../../lib/utils";

const Form = ({ className, ...props }) => (
  <form className={cn("space-y-6", className)} {...props} />
);

const FormGroup = ({ className, ...props }) => (
  <div className={cn("space-y-2", className)} {...props} />
);

const FormLabel = ({ className, ...props }) => (
  <label className={cn("text-sm font-medium text-slate-300", className)} {...props} />
);

const FormInput = ({ className, ...props }) => (
  <input
    className={cn(
      "shadow-input flex h-12 w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200",
      className
    )}
    {...props}
  />
);

const FormError = ({ className, ...props }) => (
  <p className={cn("text-sm text-red-400", className)} {...props} />
);

export { Form, FormGroup, FormLabel, FormInput, FormError };
