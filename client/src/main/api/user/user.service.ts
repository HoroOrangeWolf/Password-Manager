import UserRepository from './repository/user.repository';
import { ChangePasswordRequestType } from './types/changePasswordRequest.type';

const loginUser = async (username: string, password: string) => {
  await UserRepository.loginUser(username, password);
};

const logoutUser = async () => {
  await UserRepository.logout();
};

const changePassword = async (request: ChangePasswordRequestType) => {
  await UserRepository.changePassword(request);
};

const UserService = {
  loginUser,
  logoutUser,
  changePassword,
};

export default UserService;
