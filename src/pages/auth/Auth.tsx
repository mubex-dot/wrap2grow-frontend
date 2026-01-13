import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

const Auth = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="my-10">Welcome to Wrap2Grow</h1>
        <Tabs defaultValue="signin" className="w-64 sm:w-72 md:w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <RegisterForm />
          </TabsContent>

          <TabsContent value="signin">
            <LoginForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
