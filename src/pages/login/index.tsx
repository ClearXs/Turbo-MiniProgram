import { View, Text, Form, Button, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Router from "tarojs-router-next";

const Login = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Text>Turbo-MiniProgram</Text>
      <Form
        onSubmit={({ detail: { value } }) => {
          Taro.setStorageSync("token", value);
          Router.navigate({ url: "/pages/home/index" });
        }}
      >
        <Text>用户名:</Text>
        <Input name="username" placeholder="请输入用户名"></Input>

        <Text>密码:</Text>
        <Input name="passowrd" placeholder="请输入密码" password></Input>

        <Button formType="submit">提交</Button>
      </Form>
    </View>
  );
};

export default Login;
