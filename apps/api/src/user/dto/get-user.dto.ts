export class GetUserDto {
  _id: string;
  email: string;
  name: string;
  username: string;
  avatar: string | null;
  isAdmin: boolean;
}
