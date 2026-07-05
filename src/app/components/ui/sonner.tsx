"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      expand={true}
      richColors={true}
      closeButton={true}
      toastOptions={{
        style: {
          background: theme === 'dark' ? '#1e4958' : '#1e4958',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          minWidth: '300px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        },
        className: 'shadow-2xl',
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
