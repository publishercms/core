import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createFileRoute } from "@tanstack/react-router";

export const LoginPage = () => {
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
          <div>
            <Label htmlFor="input-email">
              Email
            </Label>

            <Input
              id="input-email"
              placeholder="Email"
            />
          </div>

          <div>
            <Label htmlFor="input-password">
              Password
            </Label>

            <Input
              id="input-password"
              placeholder="Password"
              type="password"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" size="lg">
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export const Route = createFileRoute('/login')({
  component: LoginPage,
});