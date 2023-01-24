export interface UserI {
  msg:     string;
  user:    User;
}
interface User {
  nombre_usuario: string;
  cedula_usuario: string;
  email_usuario:  string;
  rol:            string;
}
