"use client";

import type { MouseEvent } from "react";
import { sendGAEvent } from '@next/third-parties/google';
import { waUrl } from "@/lib/wa";

interface WhatsAppButtonProps {
  mensaje: string;
  label: string;
  className?: string;
}

export default function WhatsAppButton({ mensaje, label, className = "" }: WhatsAppButtonProps) {
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const finalUrl = waUrl(mensaje);

    sendGAEvent({ event: 'clic_whatsapp', value: 'lead_auditoria' });

    setTimeout(() => {
      window.location.href = finalUrl;
    }, 300);
  };

  return (
    <a 
      href={waUrl(mensaje)} 
      onClick={handleClick} 
      className={className} 
    >
      {label}
    </a>
  );
}