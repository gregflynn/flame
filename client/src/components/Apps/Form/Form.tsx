import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { State } from '../../../store/reducers';
import { appCategoryTemplate, appTemplate } from '../../../utility';
import { ContentType } from '../Apps';
import { AppsForm } from './AppsForm';
import { CategoryForm } from './CategoryForm';

// Typescript
// Utils
interface Props {
  modalHandler: () => void;
  contentType: ContentType;
  inUpdate?: boolean;
}

export const Form = (props: Props): JSX.Element => {
  const { categoryInEdit, appInEdit } = useSelector(
    (state: State) => state.apps
  );

  const { modalHandler, contentType, inUpdate } = props;

  return (
    <Fragment>
      {!inUpdate ? (
        // form: add new
        <Fragment>
          {contentType === ContentType.category ? (
            <CategoryForm modalHandler={modalHandler} />
          ) : (
            <AppsForm modalHandler={modalHandler} />
          )}
        </Fragment>
      ) : (
        // form: update
        <Fragment>
          {contentType === ContentType.category ? (
            <CategoryForm
              modalHandler={modalHandler}
              category={categoryInEdit || appCategoryTemplate}
            />
          ) : (
            <AppsForm
              modalHandler={modalHandler}
              app={appInEdit || appTemplate}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
