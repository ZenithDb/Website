'use client';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useState, useMemo } from 'react';

import Field from 'components/shared/field';
import ChevronIcon from 'icons/chevron-down.inline.svg';

const instancePrices = {
  prod: 2.25,
  staging: 1.125,
  testing: 0.0376,
  dev: 0.016,
};

const values = [
  {
    name: 'wasted_money',
    title: 'Dollars overpaid',
    valueClassName: 'bg-variable-value-1',
    period: 'month',
  },
  {
    name: 'saved_money',
    title: 'Bill that could be saved',
    period: 'month',
    valueClassName: 'bg-variable-value-2',
    text: 'With scale to zero and autoscaling',
  },
];

const variantsAnimation = {
  open: {
    opacity: 1,
    height: 'auto',
    pointerEvents: 'auto',
  },
  closed: {
    opacity: 0,
    height: 0,
    pointerEvents: 'none',
  },
};

const inputParamsBlock = [
  {
    title: 'Deployment',
    items: [
      {
        name: 'test_databases_num',
        title: 'Number of test databases',
        values: [1, 3, 5, 10],
      },
      {
        name: 'dev_databases_num',
        title: 'Number of dev databases',
        values: [1, 3, 5, 10],
      },
    ],
  },
  {
    title: 'Usage',
    items: [
      {
        name: 'test_databases_daily_hrs',
        title: 'How many hrs/day are test databases&nbsp;running?',
        values: [1, 2, 3, 5, 8],
      },
      {
        name: 'dev_databases_daily_hrs',
        title: 'How many hrs/day are dev databases&nbsp;running?',
        values: [1, 2, 3, 5, 8],
      },
      {
        name: 'staging_databases_daily_hrs',
        title: 'How many hrs/day is staging running?',
        values: [2, 5, 8],
      },
      {
        name: 'peak_traffic_hrs',
        title: 'How many hrs/ day do you hit&nbsp;peak&nbsp;traffic?',
        values: [0.5, 1, 3, 5],
      },
    ],
  },
];

const DashedBorder = () => (
  <>
    <span
      className="pointer-events-none relative z-20 block h-px w-full bg-[url('/images/pages/variable-load/dashed-border.png')] bg-[8px,1px] bg-repeat-x mix-blend-overlay"
      aria-hidden
    />
    <span
      className="pointer-events-none relative z-10 -mt-px block h-px w-full bg-[url('/images/pages/variable-load/dashed-border.png')] bg-[8px,1px] bg-repeat-x opacity-50 mix-blend-overlay"
      aria-hidden
    />
  </>
);

const Calculator = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggler = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const [inputParams, setInputParams] = useState({
    test_databases_num: 10,
    dev_databases_num: 10,
    test_databases_daily_hrs: 1,
    dev_databases_daily_hrs: 1,
    staging_databases_daily_hrs: 2,
    peak_traffic_hrs: 0.5,
  });

  const handleSelect = (e, name) => {
    setInputParams({ ...inputParams, [name]: e.target.value });
  };

  const instanceCost = useMemo(
    () => ({
      production: instancePrices.prod * 730,
      staging: instancePrices.staging * 730,
      testing: instancePrices.testing * 730 * inputParams.test_databases_num,
      development: instancePrices.dev * 730 * inputParams.dev_databases_num,
    }),
    [inputParams]
  );

  const totalCost = useMemo(
    () => Object.values(instanceCost).reduce((acc, cost) => acc + cost, 0),
    [instanceCost]
  );

  const userCost = useMemo(
    () => ({
      production:
        (inputParams.peak_traffic_hrs * instancePrices.prod +
          (24 - inputParams.peak_traffic_hrs) * 0.3 * instancePrices.prod) *
        30.4166,
      testing:
        instancePrices.testing *
        inputParams.test_databases_daily_hrs *
        inputParams.test_databases_num *
        30.4166,
      development:
        instancePrices.dev *
        inputParams.dev_databases_daily_hrs *
        inputParams.dev_databases_num *
        30.4166,
    }),
    [inputParams]
  );

  const wastedMoney = useMemo(
    () => ({
      production: instanceCost.production - userCost.production,
      testing: instanceCost.testing - userCost.testing,
      development: instanceCost.development - userCost.development,
    }),
    [instanceCost, userCost]
  );

  const totalWastedMoney = useMemo(
    () => Object.values(wastedMoney).reduce((acc, cost) => acc + cost, 0),
    [wastedMoney]
  );

  const totalSavedMoney = useMemo(
    () => (totalWastedMoney / totalCost) * 100,
    [totalCost, totalWastedMoney]
  );

  const totals = useMemo(
    () => ({
      wasted_money: `$${totalWastedMoney.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      saved_money: `${totalSavedMoney.toFixed(0)}%`,
    }),
    [totalWastedMoney, totalSavedMoney]
  );

  return (
    <>
      <DashedBorder />
      <div className="relative z-10 py-[18px] sm:py-4">
        <button
          className="flex items-center justify-between"
          type="button"
          aria-expanded={isOpen}
          onClick={handleToggler}
        >
          <h3 className="text-2xl font-medium leading-snug tracking-tighter xl:text-xl sm:text-lg">
            Input parameters
            <ChevronIcon
              className={clsx(
                'ml-2.5 inline-block h-auto w-3 transition-transform duration-300',
                isOpen && 'rotate-180'
              )}
            />
          </h3>
        </button>

        <LazyMotion features={domAnimation}>
          <m.div
            className="overflow-hidden"
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            variants={variantsAnimation}
            transition={{
              opacity: { duration: 0.2 },
              height: { duration: 0.3 },
            }}
          >
            <div className="space-y-6 pt-6">
              {inputParamsBlock.map(({ title, items }) => (
                <div key={title}>
                  <p className="mb-3.5 font-medium uppercase leading-none tracking-extra-tight text-gray-new-40 sm:text-sm">
                    {title}
                  </p>
                  <ul className="space-y-1.5 sm:space-y-4">
                    {items.map(({ name, title, values }) => (
                      <li
                        className="flex items-center justify-between gap-2 sm:flex-col sm:items-start"
                        key={title}
                      >
                        <p
                          className="text-lg leading-none tracking-extra-tight text-gray-new-90 sm:text-base sm:leading-tight"
                          dangerouslySetInnerHTML={{ __html: title }}
                        />
                        <Field
                          className="w-[98px] sm:w-full"
                          name={title}
                          labelClassName="hidden"
                          inputClassName="remove-autocomplete-styles !m-0 !h-8 !px-3 !border-[1px] !border-gray-new-15 !bg-[#0D0E10] !text-base text-white placeholder:tracking-extra-tight focus:outline-none !focus:border-white sm:placeholder:text-sm !bg-[center_right_12px]"
                          tag="select"
                          defaultValue={inputParams[name]}
                          onChange={(e) => handleSelect(e, name)}
                        >
                          {values?.map((option, index) => (
                            <option value={option} key={index}>
                              {option}
                            </option>
                          ))}
                        </Field>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </m.div>
        </LazyMotion>
      </div>
      <DashedBorder />
      <div className="relative z-10 flex justify-between pt-6 sm:flex-col sm:gap-6">
        {values.map(({ name, title, valueClassName, period, text }) => (
          <div key={title} className="min-w-[239px]">
            <p className="mb-2.5 leading-dense tracking-extra-tight lg:mb-2">{title}</p>
            <div className="flex items-end gap-1.5">
              <span
                className={clsx(
                  'bg-clip-text pr-1 font-title text-6xl font-medium leading-none tracking-tighter text-transparent xl:text-[56px] lg:pr-0.5 lg:text-5xl sm:text-4xl',
                  valueClassName
                )}
              >
                {totals[name]}
              </span>
              <span className="mb-1 text-xl text-[#7485A9] xl:mb-0 sm:text-lg">/{period}</span>
            </div>
            {text && (
              <p className="bg-variable-value-text bg-clip-text text-sm font-light leading-dense tracking-extra-tight text-transparent">
                {text}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Calculator;
