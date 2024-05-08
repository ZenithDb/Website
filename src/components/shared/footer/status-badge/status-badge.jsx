'use client';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Link from 'components/shared/link';

const statusData = {
  UP: {
    color: 'bg-green-45',
    text: 'All systems operational',
  },
  HASISSUES: {
    color: 'bg-yellow-70',
    text: 'Experiencing issues',
  },
  UNDERMAINTENANCE: {
    color: 'bg-yellow-70',
    text: 'Active maintenance',
  },
};

const fetchStatus = async () => {
  const res = await fetch('https://neonstatus.com/api/v1/summary');
  const response = await res.json();
  const data = response.subpages;

  const hasOngoingIncidents = data.some((subpage) => subpage.summary.ongoing_incidents.length > 0);
  const hasInProgressMaintenances = data.some(
    (subpage) => subpage.summary.in_progress_maintenances.length > 0
  );

  if (hasOngoingIncidents) {
    return 'HASISSUES';
  }
  if (hasInProgressMaintenances) {
    return 'UNDERMAINTENANCE';
  }
  return 'UP';
};

const StatusBadge = ({ isDocPage = false, inView = false }) => {
  const [currentStatus, setCurrentStatus] = useState(null);

  useEffect(() => {
    if (inView) {
      fetchStatus()
        .then((status) => {
          setCurrentStatus(status);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [inView]);

  return (
    <Link
      to="https://neonstatus.com/"
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'flex items-center justify-center gap-x-1.5',
        isDocPage ? 'mt-12 lg:mt-10' : 'mt-[100px] lg:mt-16 md:mt-8'
      )}
    >
      <span
        className={clsx(
          'h-1.5 w-1.5 rounded-full',
          currentStatus ? statusData[currentStatus].color : 'bg-gray-new-50'
        )}
      />
      <span className="whitespace-nowrap text-sm leading-none tracking-[0.02em]">
        {currentStatus ? statusData[currentStatus].text : 'All systems operational'}
      </span>
    </Link>
  );
};

StatusBadge.propTypes = { isDocPage: PropTypes.bool, inView: PropTypes.bool };

export default StatusBadge;
