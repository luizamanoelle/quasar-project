export interface UserForm {
  name: string;
  email: string;
  password?: string;
  role: 'citizen' | 'admin';
}

export interface UserResponse extends UserForm {
  id: number;
}
