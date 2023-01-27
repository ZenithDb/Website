import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookie, useLocation } from 'react-use';
import * as yup from 'yup';

import Button from 'components/shared/button';
import Field from 'components/shared/field';
import Link from 'components/shared/link';
import { HUBSPOT_CONTACT_SALES_FORM_ID, FORM_STATES } from 'constants/forms';
import { doNowOrAfterSomeTime, sendHubspotFormData } from 'utils/forms';

const schema = yup
  .object({
    name: yup.string().required('Your name is a required field'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email address is a required field'),
    message: yup.string().required('Message is a required field'),
  })
  .required();

const ContactForm = ({ formState, setFormState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [hubspotutk] = useCookie('hubspotutk');
  const { href } = useLocation();
  const [formError, setFormError] = useState('');

  const context = {
    hutk: hubspotutk,
    pageUri: href,
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { name, email, companyWebsite, companySize, message } = data;
    const loadingAnimationStartedTime = Date.now();

    setFormError('');
    setFormState(FORM_STATES.LOADING);

    try {
      const response = await sendHubspotFormData({
        formId: HUBSPOT_CONTACT_SALES_FORM_ID,
        context,
        values: [
          {
            name: 'full_name',
            value: name,
          },
          {
            name: 'email',
            value: email,
          },
          {
            name: 'company_website',
            value: companyWebsite,
          },
          {
            name: 'company_size',
            value: companySize,
          },
          {
            name: 'TICKET.subject',
            value: 'Contact sales',
          },
          {
            name: 'TICKET.content',
            value: message,
          },
        ],
      });

      if (response.ok) {
        doNowOrAfterSomeTime(() => {
          setFormState(FORM_STATES.SUCCESS);
          setFormError('');
        }, loadingAnimationStartedTime);
      } else {
        throw new Error('Something went wrong. Please reload the page and try again.');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        doNowOrAfterSomeTime(() => {
          setFormState(FORM_STATES.ERROR);
          setFormError(error?.message ?? error);
        }, 2000);
      }
    }
  };
  return (
    <form
      className="relative z-10 grid gap-y-10 rounded-[20px] bg-gray-1 p-12 pb-14 2xl:gap-y-9 2xl:p-10 2xl:pb-10 md:gap-y-5 md:p-6 md:pb-6"
      style={{ boxShadow: '0px 20px 40px rgba(26, 26, 26, 0.4)' }}
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Field
        name="name"
        label="Your name *"
        autoComplete="name"
        error={errors.name?.message}
        isDisabled={formState === FORM_STATES.LOADING}
        {...register('name')}
      />
      <Field
        name="email"
        label="Email address *"
        type="email"
        autoComplete="email"
        isDisabled={formState === FORM_STATES.LOADING}
        error={errors.email?.message}
        {...register('email')}
      />
      <div className="flex space-x-10 2xl:space-x-6 md:grid md:gap-y-5 md:space-x-0">
        <Field
          className="shrink-0 basis-[54%] 2xl:basis-[45%] lg:basis-[49%]"
          name="companyWebsite"
          label="Company website"
          isDisabled={formState === FORM_STATES.LOADING}
          {...register('companyWebsite')}
        />
        <Field
          className="grow"
          name="companySize"
          label="Company size"
          tag="select"
          defaultValue="hidden"
          isDisabled={formState === FORM_STATES.LOADING}
          {...register('companySize')}
        >
          <option value="hidden" disabled hidden>
            &nbsp;
          </option>
          <option value="1_4">1-4 employees</option>
          <option value="5_19">5-19 employees</option>
          <option value="20_99">20-99 employees</option>
          <option value="100_499">100-499 employees</option>
          <option value="500">&ge; 500 employees</option>
        </Field>
      </div>
      <Field
        name="message"
        label="Message *"
        tag="textarea"
        isDisabled={formState === FORM_STATES.LOADING}
        error={errors.message?.message}
        {...register('message')}
      />

      <div className="relative mt-2 flex items-center 2xl:mt-1 md:mt-0 md:flex-col md:items-start">
        <Button
          className="w-[194px] shrink-0 !px-9 !py-6 !text-lg md:order-1 md:mt-6 md:w-full"
          type="submit"
          loading={formState === FORM_STATES.LOADING}
          theme="primary"
          size="xs"
          disabled={formState === FORM_STATES.LOADING || formState === FORM_STATES.SUCCESS}
        >
          {formState === FORM_STATES.SUCCESS ? 'Sent!' : 'Send message'}
        </Button>
        <p className="ml-7 text-left leading-tight md:ml-0">
          By submitting you agree to{' '}
          <Link
            className="pb-1 !text-base 2xl:!text-base md:!inline"
            to="/privacy-policy"
            theme="underline-primary-1"
            size="xs"
          >
            Neon’s Privacy Policy
          </Link>
          .
        </p>
        {formError && (
          <span className="absolute left-1/2 top-[calc(100%+1rem)] w-full -translate-x-1/2 text-sm leading-none text-secondary-1">
            {formError}
          </span>
        )}
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  formState: PropTypes.oneOf(Object.values(FORM_STATES)).isRequired,
  setFormState: PropTypes.func.isRequired,
};

export default ContactForm;
