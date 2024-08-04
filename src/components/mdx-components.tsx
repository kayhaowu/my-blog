import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Callout } from "./callout";
import Pre from "./Pre";
import { CustomImage } from "./CustomImage";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  CustomImage,
  Callout,
  pre: Pre,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
