'use client';

import clsx from 'clsx';
import { useState } from 'react';

const LatencyParts = () => {
  const [roundtripLatency, setRoundtripLatency] = useState(10); // Default 10ms
  const [processingTime, setprocessingTime] = useState(1); // Default 10ms
  const [longLivedConnections, setLongLivedConnections] = useState(false);

  const connectionTime = 4 * roundtripLatency * (longLivedConnections ? 0 : 1);
  const queryTime = 0.5 * roundtripLatency;
  const responseTime = 0.5 * roundtripLatency;

  const totalLatency = connectionTime + queryTime + processingTime + responseTime;

  const getWidthPercentage = (time) => (time / totalLatency) * 100;

  return (
    <figure
      className={clsx(
        'doc-cta not-prose my-5 rounded-[10px] border border-gray-new-94 bg-gray-new-98 px-7 py-6 sm:p-6',
        'dark:border-gray-new-15 dark:bg-gray-new-10'
      )}
    >
      <span className="text-lg font-semibold">Neon Query Latency Factors</span>

      <div className="my-4 flex w-full gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="longLivedConnections"
            checked={longLivedConnections}
            onChange={() => {
              setLongLivedConnections(!longLivedConnections);
            }}
          />
          <label
            htmlFor="longLivedConnections"
            className="text-gray-700 mb-1 block text-sm font-medium"
          >
            Long-lived Connections
          </label>
        </div>
        <div>
          <label htmlFor="latency-slider" className="text-gray-700 mb-1 block text-sm font-medium">
            Client-DB Roundtrip Latency: {roundtripLatency}ms
          </label>
          <input
            type="range"
            id="latency-slider"
            min={0}
            max={200}
            step={1}
            defaultValue={roundtripLatency}
            className="w-full"
            onChange={(e) => setRoundtripLatency(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label
            htmlFor="processingTime-slider"
            className="text-gray-700 mb-1 block text-sm font-medium"
          >
            Postgres Processing Time: {processingTime}ms
          </label>
          <input
            type="range"
            id="processingTime-slider"
            min={0}
            max={20}
            step={1}
            defaultValue={processingTime}
            className="w-full"
            onChange={(e) => setprocessingTime(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="mb-2 flex h-10">
        <div
          style={{ width: `${getWidthPercentage(connectionTime)}%` }}
          className="bg-secondary-5"
          title="Connection Time"
        />
        <div
          style={{ width: `${getWidthPercentage(queryTime)}%` }}
          className="bg-secondary-4"
          title="Query Time"
        />
        <div
          style={{ width: `${getWidthPercentage(processingTime)}%` }}
          className="bg-primary-1"
          title="Postgres Processing Time"
        />
        <div
          style={{ width: `${getWidthPercentage(responseTime)}%` }}
          className="bg-secondary-6"
          title="Response Time"
        />
      </div>

      <div className="flex justify-between text-sm">
        <span>0ms</span>
        <span className="font-bold">Total Latency: {totalLatency.toFixed(1)}ms</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 bg-secondary-5" />
          <span>Connection Time: {connectionTime.toFixed(1)}ms</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 bg-secondary-4" />
          <span>Query Time: {queryTime.toFixed(1)}ms</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 bg-primary-1" />
          <span>Postgres Processing Time: {processingTime.toFixed(1)}ms</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 bg-secondary-6" />
          <span>Response Time: {responseTime.toFixed(1)}ms</span>
        </div>
      </div>
    </figure>
  );
};

export default LatencyParts;
