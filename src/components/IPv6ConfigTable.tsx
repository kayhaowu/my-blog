import React from 'react';

const IPv6ConfigTable: React.FC = () => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">配置方式</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">描述</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">優點</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">無狀態地址自動配置（SLAAC）</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">
            • 設備自動生成 IPv6 地址，無需 DHCP 服務器。<br />
            • 結合路由器通告和 EUI-64 或隨機生成的接口標識符。
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">簡單，無需額外配置。</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">有狀態 DHCPv6</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">
            • 類似於 IPv4 的 DHCP。<br />
            • DHCPv6 服務器分配地址和其他網絡配置。
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">集中管理，可提供更多網絡參數。</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">無狀態 DHCPv6</td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">
            • 結合 SLAAC 和 DHCPv6。<br />
            • 地址通過 SLAAC 獲得，其他配置（如 DNS）通過 DHCPv6 獲得。
          </td>
          <td className="px-4 py-2 text-sm text-gray-900 border-b">結合了 SLAAC 的簡便性和 DHCPv6 的靈活性。</td>
        </tr>
      </tbody>
    </table>
  );
};

export default IPv6ConfigTable;