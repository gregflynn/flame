import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Category, NewCategory } from '../../../interfaces';
import { actionCreators } from '../../../store';
import { inputHandler, newAppCategoryTemplate } from '../../../utility';
import { Button, InputGroup, ModalForm } from '../../UI';

// Redux
// Typescript
// UI
// Utils
interface Props {
  modalHandler: () => void;
  category?: Category;
}

export const CategoryForm = ({
  category,
  modalHandler,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { addCategory, updateCategory } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [formData, setFormData] = useState<NewCategory>(newAppCategoryTemplate);

  // Load category data if provided for editing
  useEffect(() => {
    if (category) {
      setFormData({ ...category });
    } else {
      setFormData(newAppCategoryTemplate);
    }
  }, [category]);

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: { isNumber?: boolean; isBool?: boolean }
  ) => {
    inputHandler<NewCategory>({
      e,
      options,
      setStateHandler: setFormData,
      state: formData,
    });
  };

  // Category form handler
  const formSubmitHandler = (e: FormEvent): void => {
    e.preventDefault();

    if (!category) {
      addCategory(formData);
    } else {
      updateCategory(category.id, formData);
      modalHandler();
    }

    setFormData(newAppCategoryTemplate);
  };

  return (
    <ModalForm modalHandler={modalHandler} formHandler={formSubmitHandler}>
      <InputGroup>
        <label htmlFor="name">Category Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Social Media"
          required
          value={formData.name}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      <InputGroup>
        <label htmlFor="isPublic">Category visibility</label>
        <select
          id="isPublic"
          name="isPublic"
          value={formData.isPublic ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>Visible (anyone can access it)</option>
          <option value={0}>Hidden (authentication required)</option>
        </select>
      </InputGroup>

      <Button>{category ? 'Update category' : 'Add new category'}</Button>
    </ModalForm>
  );
};
