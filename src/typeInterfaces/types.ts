export type Categories = {
  id: number;
  name: string;
};

export type TransactionCardProp = {
  title: string;
  category: Categories;
  value: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number, updatedData: EditionFormProps) => void;
};

export type EditionFormProps = {
  handleCancelEditing: () => void;
  transactionId: number;
  onApplyEditing: (object: Object) => void;
  transactionTitle: string;
  category: string;
  transactionValue: string;
};

export interface IAuthState {
  isLoggedIn: boolean;
  errorMessage: string;
}

export interface IRootState {
  auth: IAuthState;
}
