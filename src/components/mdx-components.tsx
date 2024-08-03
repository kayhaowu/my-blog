import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Callout } from "./callout";
import Pre from "./Pre";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  pre: Pre
  // pre: (props: any) => (
  //   <div className="flex flex-row gap-2 bg-[#0d1117]">
  //     <div className="w-full">{props.children}</div>
  //     <Pre {...props} />
  //   </div>
  // ),
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
