import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import SideBanner from "./components/SideBanner";
import connectedLogo from "@/assets/icons/connected_icon.png";

const Auth = () => {
  return (
    <div className="h-screen p-6 overflow-scroll">
      <div className="flex flex-col lg:flex-row justify-between items-center h-full ">
        <div className="w-4/9 h-full hidden lg:block">
          <SideBanner />
        </div>
        <div className="w-5/9 h-full flex flex-col justify-center items-center">
          <div className="">
            <img
              src={connectedLogo}
              alt="ConnectED Logo"
              className="lg:hidden w-64"
            />
          </div>
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
    </div>
  );
};

export default Auth;
