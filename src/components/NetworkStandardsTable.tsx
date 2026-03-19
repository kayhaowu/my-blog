'use client'

import React, { useState } from 'react';

const NetworkStandardsTable: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState('');

  const renderChannels = (channels: string) => {
    if (channels.includes('\n')) {
      return (
        <span 
          className="cursor-help underline dotted relative"
          onMouseEnter={() => setTooltipContent(channels.split('\n').join(', '))}
          onMouseLeave={() => setTooltipContent('')}
        >
          多頻段
          {tooltipContent && (
            <span className="absolute left-0 top-full mt-1 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
              {tooltipContent}
            </span>
          )}
        </span>
      );
    }
    return channels;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">標準</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">類型</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">發布年份</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">速率</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">頻段</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">通道數</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">主要特點</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* 有線以太網標準 */}
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">10BASE-T</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">有線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1990</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">10 Mbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
            <td className="px-4 py-4 text-sm text-gray-500">使用雙絞線，最大100米</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">100BASE-TX</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">有線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1995</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">100 Mbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
            <td className="px-4 py-4 text-sm text-gray-500">快速乙太網，Cat5線纜</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1000BASE-T</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">有線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1999</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1 Gbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
            <td className="px-4 py-4 text-sm text-gray-500">千兆乙太網，Cat5e或Cat6線纜</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">10GBASE-T</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">有線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2006</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">10 Gbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
            <td className="px-4 py-4 text-sm text-gray-500">10吉比特乙太網，Cat6a或Cat7線纜</td>
          </tr>
          {/* 無線802.11標準 */}
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">802.11</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">無線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1997</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2 Mbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2.4 GHz</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">14</td>
            <td className="px-4 py-4 text-sm text-gray-500">原始標準，使用FHSS或DSSS</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">802.11b</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">無線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1999</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">11 Mbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2.4 GHz</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">14</td>
            <td className="px-4 py-4 text-sm text-gray-500">使用DSSS，提高了傳輸速率</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">802.11a</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">無線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1999</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">54 Mbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">5 GHz</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">23</td>
            <td className="px-4 py-4 text-sm text-gray-500">使用OFDM，較少干擾但範圍較小</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">802.11g</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">無線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2003</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">54 Mbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2.4 GHz</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">14</td>
            <td className="px-4 py-4 text-sm text-gray-500">結合了a和b的優點，向後兼容b</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">802.11n</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">無線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2009</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">600 Mbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2.4/5 GHz</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {renderChannels("2.4 GHz: 14\n5 GHz: 23")}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500">引入MIMO技術，大幅提升速度和範圍</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">802.11ac</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">無線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2013</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">6.93 Gbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">5 GHz</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">25</td>
            <td className="px-4 py-4 text-sm text-gray-500">更寬的頻道、更高階的調變、MU-MIMO</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">802.11ax (Wi-Fi 6)</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">無線</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2019</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">9.6 Gbps</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2.4/5/6 GHz</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {renderChannels("2.4 GHz: 14\n5 GHz: 25\n6 GHz: 59")}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500">OFDMA、1024-QAM、更好的MIMO、節能</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NetworkStandardsTable;