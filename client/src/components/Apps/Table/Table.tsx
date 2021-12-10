import { App, Category } from '../../../interfaces';
import { ContentType } from '../Apps';
import { AppsTable } from './AppsTable';
import { CategoryTable } from './CategoryTable';

interface Props {
  contentType: ContentType;
  openFormForUpdating: (data: Category | App) => void;
}

export const Table = (props: Props): JSX.Element => {
  const tableEl =
    props.contentType === ContentType.category ? (
      <CategoryTable openFormForUpdating={props.openFormForUpdating} />
    ) : (
      <AppsTable openFormForUpdating={props.openFormForUpdating} />
    );

  return tableEl;
};
