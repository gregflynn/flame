import { Fragment } from 'react';

// UI
import { SettingsHeadline } from '../../UI';
import { AuthForm } from './AuthForm/AuthForm';

export const AppDetails = (): JSX.Element => {
  return (
    <Fragment>
      <SettingsHeadline text="Authentication" />
      <AuthForm />
    </Fragment>
  );
};
