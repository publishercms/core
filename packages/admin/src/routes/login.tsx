import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { client } from "@/lib/client";
import { LoginForm } from "@/components/forms/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


export const LoginPage = () => {
  const router = useRouter();
  return (
    <div className="h-full w-full flex flex-col justify-center items-center max-w-xl mx-auto">
      <div className="text-center my-10">
        <h1 style={{ fontFamily: "Times New Roman", fontWeight: 600 }}>PublisherCMS</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <h3 className="text-3xl">
            Sign in
          </h3>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <LoginForm
            onSubmit={async (values) => {
              const token = await client.user.login(values);
              if (token != null) {
                router.invalidate();
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: ({ context }) => {
    if (context.user != null) {
      throw redirect({ to: '/' });
    }
  },
});
