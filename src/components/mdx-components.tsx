import NextImage, { type ImageProps as NextImageProps } from "next/image";
import * as runtime from "react/jsx-runtime";
// import { cn } from "@/lib/utils"; // 如果下面的組件需要，可以取消註解
import { Callout } from "./callout";
import Pre from "./Pre";
import { CustomImage } from "./CustomImage"; // 假設這個是你已有的組件
import ComparisonTable from "./ComparisonTable";
import IPv6AddressTable from "./IPv6AddressTable";
import IPv6ConfigTable from "./IPv6ConfigTable";
import IEEE80211Table from "./NetworkStandardsTable";
import Link from "next/link";

const useMDXComponent = (code: string) => {
  // 將 runtime 作為參數傳入，確保 MDX 編譯後的程式碼能正確訪問 JSX 運行時
  const fn = new Function("runtime", code);
  return fn(runtime).default;
};

interface MdxImageProps extends NextImageProps {
  // 可在此添加額外 props，例如從 markdown 獲取的圖片標題 (caption)
}

const MdxNextImage = (props: MdxImageProps) => {
  // 預設寬高，可根據部落格圖片常見尺寸調整
  // 理想情況：Velite/MDX 流程能獲取圖片的實際尺寸並傳入 props
  const width = typeof props.width === 'number' ? props.width : 700;
  const height = typeof props.height === 'number' ? props.height : 450;

  return (
    <span className="block my-6 rounded-lg overflow-hidden shadow-md">
      <NextImage
        {...props}
        width={width}
        height={height}
        className={`w-full h-auto ${props.className || ''}`} // 確保響應式並保留原有 class
        alt={props.alt || "文章圖片"} // 提供預設 alt
      />
      {/* 若想在圖片下方顯示 alt 文字作為 caption:
      {props.alt && <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">{props.alt}</figcaption>}
      */}
    </span>
  );
};

const MdxLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} {...props} className={`text-primary hover:underline ${props.className || ''}`}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} className={`text-primary hover:underline ${props.className || ''}`} />;
};

const components = {
  // MDX 內容中的 <img> 和 <Image /> (若 MDX 解析器支持) 都會使用 MdxNextImage
  img: MdxNextImage,
  Image: MdxNextImage,
  CustomImage, // 若 CustomImage 有特殊用途，可以保留
  Callout,
  pre: Pre, // Pre 組件應處理語法高亮
  ComparisonTable,
  IPv6AddressTable,
  IPv6ConfigTable,
  IEEE80211Table,
  a: MdxLink, // MDX 中的 <a> 標籤會使用 MdxLink
  // 可根據需要自定義其他 HTML 元素的渲染器
  // 例如：
  // h2: (props) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary" {...props} />,
  // blockquote: (props) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props} />,
};

interface MdxProps {
  code: string;
  // components?: Record<string, React.ComponentType<any>>; // 若需傳入頁面特定 MDX 組件
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
