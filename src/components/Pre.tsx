// components/Pre.tsx
'use client'; // 保持 'use client' 指令
import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

// 為 props 定義更明確的型別
interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
  // rehype-pretty-code 等工具會在 <pre> 標籤上添加 'data-language'
  'data-language'?: string;
  // 如果你的高亮插件會添加 'data-theme'，也可以在這裡定義
  // 'data-theme'?: string;
}

const Pre: React.FC<PreProps> = ({ children, 'data-language': dataLanguage, className, ...props }) => {
  // 將 ref 的型別設為 HTMLPreElement
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | undefined>(undefined);

  useEffect(() => {
    // 優先使用 'data-language' 屬性來確定語言
    let lang = dataLanguage;
    if (!lang && className) {
      // 如果 'data-language' 不存在，則嘗試從 className (例如 'language-javascript') 中解析
      const langMatch = className.match(/language-(\w+)/);
      if (langMatch && langMatch[1]) {
        lang = langMatch[1];
      }
    }
    setDetectedLanguage(lang);
  }, [dataLanguage, className]);

  const onCopy = async () => {
    if (preRef.current) {
      // 嘗試找到 <pre> 標籤內部的 <code> 標籤，這通常是語法高亮插件放置程式碼的地方
      const codeElement = preRef.current.querySelector('code');
      let textToCopy = '';

      if (codeElement) {
        textToCopy = codeElement.innerText;
      } else {
        // 如果沒有 <code> 標籤，則回退到直接獲取 <pre> 的 textContent
        // 這在你之前的版本中是 textInput?.current?.textContent
        textToCopy = preRef.current.textContent || '';
      }
      
      if (textToCopy.trim()) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        } catch (err) {
          console.error('無法複製程式碼: ', err);
          // 可以在此處添加面向用戶的錯誤提示，例如一個小的 toast 通知
        }
      } else {
        console.warn('沒有偵測到可複製的程式碼內容。');
      }
    }
  };

  // 合併傳入的 className 和我們需要的基礎樣式
  // py-4 pl-4 pr-12: 上下左右內邊距，右側留出空間給按鈕
  // overflow-x-auto: 允許水平滾動
  // rounded-md: 圓角
  // bg-gray-800 dark:bg-gray-900: 預設背景色 (如果語法高亮插件沒有提供背景)
  // text-white: 預設文字顏色 (如果語法高亮插件沒有提供文字顏色)
  // 你的 'code-block' class 會被保留
  const preClassName = `
    code-block 
    py-4 pl-4 pr-14 
    overflow-x-auto 
    rounded-md 
    bg-gray-800 dark:bg-gray-900 
    text-gray-200 
    ${className || ''}
  `.replace(/\s+/g, ' ').trim(); // 清理多餘空格

  return (
    // 使用 group 使得內部元素可以響應外部容器的 hover 狀態
    <div className='relative group my-6 rounded-md'> {/* 為整個程式碼區塊容器添加外邊距和圓角 */}
      {/* 語言標示 */}
      {detectedLanguage && (
        <div className="absolute top-0 right-[4.25rem] sm:right-[4.5rem] text-xs text-gray-400 bg-gray-700/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-0.5 rounded-b-md z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100 pointer-events-none">
          {detectedLanguage.toUpperCase()}
        </div>
      )}
      {/* 複製按鈕 */}
      <button
        aria-label={copied ? '已複製!' : '複製程式碼'}
        title={copied ? '已複製!' : '複製程式碼'}
        type='button'
        // 樣式調整：更精緻的背景、邊框、hover 效果，並僅在 group-hover 時顯示
        className='absolute top-1.5 right-1.5 p-1.5 bg-gray-700/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md text-gray-300 hover:text-white hover:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-800 dark:focus:ring-offset-black focus:ring-sky-500 transition-all z-20 opacity-0 group-hover:opacity-100'
        onClick={onCopy}
      >
        {copied ? (
          <Check className='h-4 w-4 text-emerald-400' /> // 使用你之前的顏色
        ) : (
          <Copy className='h-4 w-4 text-gray-300 group-hover:text-white' /> // 調整預設圖標顏色
        )}
      </button>
      <pre ref={preRef} {...props} className={preClassName}>
        {children}
      </pre>
    </div>
  );
};

export default Pre;
