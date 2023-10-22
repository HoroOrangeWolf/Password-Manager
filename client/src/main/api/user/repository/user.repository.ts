import axios from 'axios';
import { UserType } from '../types/user.type';
import BackendConstant from '../../constant/backend.constant';

const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await axios.get<UserType>(`${BackendConstant.BACKEND_URL}/user/me`);

  return response.data;
};

const loginUser = async () => {

};

const UserRepository = {
  fetchCurrentUser,
};

export default UserRepository;
