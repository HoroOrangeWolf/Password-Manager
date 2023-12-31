import axios from 'axios';
import { UserType } from '../types/user.type';
import BackendConstant from '../../constant/backend.constant';
import { RegisterRequestType } from '../types/registerRequest.type';
import { ChangePasswordRequestType } from '../types/changePasswordRequest.type';

const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await axios.get<UserType>(`${BackendConstant.BACKEND_URL}/user/me`);

  return response.data;
};

const loginUser = async (username: string, password: string) => {
  const form = new FormData();

  form.append('username', username);
  form.append('password', password);

  return axios.post(`${BackendConstant.BACKEND_URL}/login`, form);
};

const changePassword = async (request: ChangePasswordRequestType) => {
  await axios.post(`${BackendConstant.BACKEND_URL}/user/changePassword`, request);
};

const registerUser = async (req: RegisterRequestType) => {
  await axios.post(`${BackendConstant.BACKEND_URL}/register`, req);
};

const logout = async () => {
  await axios.post(`${BackendConstant.BACKEND_URL}/logout`);
};

const UserRepository = {
  logout,
  loginUser,
  registerUser,
  changePassword,
  fetchCurrentUser,
};

export default UserRepository;
