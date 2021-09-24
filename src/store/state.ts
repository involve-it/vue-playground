export type PhonebookItem = {
  id: number;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  editing: boolean;
};

export type State = {
  loading: boolean;
  items: PhonebookItem[];
  showCreateModal: boolean;
  showEditModal: boolean;
  showItemModal: boolean;
  editModalItemId: number | undefined;
  showItemId: number | undefined;
};

export const state: State = {
  loading: false,
  items: [],
  showCreateModal: false,
  showEditModal: false,
  showItemModal: false,
  editModalItemId: undefined,
  showItemId: undefined,
};
