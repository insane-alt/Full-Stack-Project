export type UserRole =
  | 'student'
  | 'mentor'
  | 'admin'
  | 'collaborator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  designation?: string;
  profileImage?: string;
  rollNumber?: string;
  organization?: string;
}

export interface StudentUser extends User {
  role: 'student';
  rollNumber: string;
  department: string;
}



export interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}
