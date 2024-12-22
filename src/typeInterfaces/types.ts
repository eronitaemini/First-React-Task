export interface ICategories {
  id: number;
  name: string;
}

export interface ITransactionCard {
  title: string;
  category: ICategories;
  value: string;
  createdAt: string;
  updatedAt: string;
  id: number;
}
export interface ITransactionCardProps {
  title: string;
  category: ICategories;
  value: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedData: IEditionFormProps) => void;
}

export interface IEditionFormProps {
  handleCancelEditing: () => void;
  transactionId: number;
  onApplyEditing: (object: any) => void;
  transactionTitle: string;
  category: string;
  transactionValue: string;
}

// export interface editingObject {
//   title: string;
//   value: string;
//   category: string;
// }

export interface ITransactionObject {
  id: number;
  title: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  category: ICategories;
}

export interface IDeletionModalProps {
  onDeleteTransaction: (id: number) => void;
  transactionId: number;
  isDoneDeleting: () => void;
}

export interface IButtonProps {
  handleOnClick: () => void;
  style: React.CSSProperties;
  children: React.ReactNode;
}

export interface IAuthState {
  isLoggedIn: boolean;
  errorMessage: string;
}

export interface IRootState {
  auth: IAuthState;
}
