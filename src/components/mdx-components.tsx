import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Callout } from "./callout";
import Pre from "./Pre";
import { CustomImage } from "./CustomImage";
import ComparisonTable from "./ComparisonTable";
import IPv6AddressTable from "./IPv6AddressTable";
import IPv6ConfigTable from "./IPv6ConfigTable";
import IEEE80211Table from "./NetworkStandardsTable";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  CustomImage,
  Callout,
  pre: Pre,
  ComparisonTable, 
  IPv6AddressTable,
  IPv6ConfigTable,
  IEEE80211Table,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
