import React from 'react';

const ComparisonTable: React.FC = () => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">特性</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">IPv4</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">IPv6</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">地址長度</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">32 位</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">128 位</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">地址格式</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">點分十進制（例：192.168.1.1）</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">冒號分隔的十六進制（例：2001:0db8:85a3::8a2e:0370:7334）</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">地址空間</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">約 43 億（2^32）</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">約 340 澗（2^128）</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">標頭格式</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">可變長度</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">固定長度</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">標頭大小</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">20-60 字節</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">40 字節</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">安全性</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">IPsec 可選</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">內建 IPsec 支持</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">QoS 支持</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">有限（Type of Service 字段）</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">增強（Flow Label 和 Traffic Class 字段）</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">配置</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">手動或 DHCP</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">SLAAC、有狀態 DHCPv6、無狀態 DHCPv6</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">分片處理</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">路由器可分片</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">只有源節點可分片</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">廣播</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">支持</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">不支持（使用多播替代）</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">多播</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">可選支持</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">內建支持</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">任播</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">不原生支持</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">原生支持</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">地址類型</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">主要區分公網和私網地址</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">多種類型（全球單播、鏈路本地、唯一本地等）</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">地址自動配置</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">需要 DHCP</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">支持 SLAAC</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">NAT（網絡地址轉換）</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">廣泛使用</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">通常不需要</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">DNS 記錄</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">主要使用 A 記錄</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">主要使用 AAAA 記錄</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">移動性</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">有限支持</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">內建支持（Mobile IPv6）</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">端到端連接</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">受 NAT 限制</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">原生支持</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">擴展性</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">有限</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">更好（擴展頭部）</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ComparisonTable;