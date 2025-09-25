import { schemaQueries } from "@/lib/queries/schema";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "../ui/menu-item";
import { DynamicIcon } from "lucide-react/dynamic";

export const NavigationMenu = () => {
  const { data: postTypes } = useQuery(schemaQueries.postTypes());

  return (
    <div className="flex flex-col gap-2">
      <MenuItem target="/">
        Home
      </MenuItem>

      <MenuItem target="/users">
        <DynamicIcon className="mr-1 size-4" name="user" />
        Users
      </MenuItem>

      <small>
        Post types
      </small>

      {postTypes?.map((type) => (
        <MenuItem target={`/posts/${type.name}`} key={type.name}>
          {type.admin?.icon != null && (
            <DynamicIcon className="mr-1 size-4" name={type.admin.icon as any} />
          )}

          {type.label.multiple ?? type.label.single}
        </MenuItem>
      ))}
    </div>
  );
};
