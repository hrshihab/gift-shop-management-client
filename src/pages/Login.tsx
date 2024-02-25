import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const [login, { error }] = useLoginMutation();
  //console.log("data => ", data);
  //console.log("error => ", error);
  const onSubmit = async (data) => {
    //console.log(data);
    const userInfo = {
      id: data.id,
      password: data.password,
    };

    const result = await login(userInfo).unwrap();
    const user = verifyToken(result.data.accessToken) as TUser;
    dispatch(setUser({ user: user, token: result.data.accessToken }));
    console.log(result.data.accessToken);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
