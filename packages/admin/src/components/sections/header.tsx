import { userQueries } from "@/lib/queries/user";
import { useQuery } from "@tanstack/react-query";
import { DropDrawer, DropDrawerContent, DropDrawerItem, DropDrawerTrigger } from "../ui/dropdrawer";
import { Button } from "../ui/button";
import { ChevronDown, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useMemo } from "react";
import { useRouter } from "@tanstack/react-router";
import { client } from "@/lib/client";

export const Header = () => {
  const router = useRouter();
  const { data: user } = useQuery(userQueries.me());

  const signout = () => {
    client.user.logout();
    router.invalidate();
  };

  const initials = useMemo(() => {
    if (user == null) return "";
    const split = user.name.split(" ");
    return `${split[0][0]}${split.length > 1 ? `${split[1][0]}` : ""}`;
  }, [user]);

  return (
    <header className="flex items-center justify-between w-full flex-1">
      <div>
        {/* Something here */}
      </div>

      <div>
        <DropDrawer>
          <DropDrawerTrigger asChild>
            <Button variant="outline" className="group" size="lg">
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              {user?.name}

              <ChevronDown className="group-hover:rotate-180 transition-all group-aria-expanded:rotate-180" />
            </Button>
          </DropDrawerTrigger>

          <DropDrawerContent align="end">
            <DropDrawerItem onClick={signout} icon={<LogOutIcon className="size-4" />}>
              Sign out
            </DropDrawerItem>
          </DropDrawerContent>
        </DropDrawer>
      </div>
    </header>
  );
};
