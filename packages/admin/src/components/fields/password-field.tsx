import type { AnyFieldApi } from "@tanstack/react-form";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldInfo } from "./field-info";

export const PasswordField = {
  name: "password",
  validators: {
    onChange: ({ value }: any) => {
      if (!value) {
        return 'Password is required'
      }

      if (value.length < 6) {
        return 'Password must be at least 6 characters';
      }

      return undefined;
    },
  },
  children: (field: AnyFieldApi) => (
    <div>
      <Label htmlFor={field.name}>
        Password
      </Label>

      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder="Password"
        type="password"
      />

      <FieldInfo field={field} />
    </div>
  ),
};
