import axios from 'axios';
import UserRepository from './repository/user.repository';
import AppStorageService from '../../storage/appStorage.service';

const loginUser = async (username: string, password: string) => {
  await UserRepository.loginUser(username, password);
};

const logoutUser = async () => {
  await UserRepository.logout();
};

const UserService = {
  loginUser,
  logoutUser,
};

export default UserService;
