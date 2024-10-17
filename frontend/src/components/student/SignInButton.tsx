import { GoogleLogin } from "@react-oauth/google";

const SignInButton = () => {
  return (
    <GoogleLogin
      onSuccess={(CredentialsResponse) => {
				console.log('Login Success', CredentialsResponse);
			}}
      onError={() => console.log('Login Failed')}
    />
  );
};

export default SignInButton;
