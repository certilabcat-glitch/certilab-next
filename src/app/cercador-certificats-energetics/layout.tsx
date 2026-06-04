import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cercador de Certificats Energètics a Catalunya | Certilab",
  description:
    "Guia per trobar un tècnic certificador habilitat a la teva província. Tot el que necessites saber sobre el certificat energètic a Catalunya.",
  alternates: {
    canonical: "https://www.certilab.cat/cercador-certificats-energetics/",
  },
  openGraph: {
    title: "Cercador de Certificats Energètics a Catalunya | Certilab",
    description:
      "Guia per trobar un tècnic certificador habilitat a la teva província.",
    url: "https://www.certilab.cat/cercador-certificats-energetics/",
  },
};

export default function CercadorLayout({ children }: { children: React.ReactNode }) {
  return children;
}