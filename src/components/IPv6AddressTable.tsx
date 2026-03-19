import React from 'react';

const IPv6AddressTable: React.FC = () => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">地址類型</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">範圍</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">介紹</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">全球單播地址（Global Unicast Address）</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">2000::/3 到 3fff::/3</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">類似於 IPv4 的公共 IP 地址，可在全球範圍內路由。</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">鏈路本地地址（Link-Local Address）</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">fe80::/10</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">僅在同一網段內有效，用於鄰居發現和自動配置。</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">唯一本地地址（Unique Local Address）</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">fc00::/7</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">類似於 IPv4 的私有 IP 地址，用於本地通信，不在全球範圍內路由。</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">回環地址（Loopback Address）</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">::1/128</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">等同於 IPv4 的 127.0.0.1，用於本機通信。</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">未指定地址（Unspecified Address）</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">::/128</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">表示缺少地址，類似於 IPv4 的 0.0.0.0。</td>
        </tr>
      </tbody>
    </table>
  );
};

export default IPv6AddressTable;