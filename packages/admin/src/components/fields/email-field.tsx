import type { AnyFieldApi } from "@tanstack/react-form";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldInfo } from "./field-info";

export const EmailField = {
  name: "email",
  validators: {
    onChange: ({ value }: any) => {
      if (!value) {
        return 'Email is required'
      }

      if (value.length < 4) {
        return 'Email must be at least 3 characters';
      }

      return undefined;
    },
  },
  children: (field: AnyFieldApi) => (
    <div>
      <Label htmlFor={field.name}>
        Email
      </Label>

      <Input
        type="email"
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder="Email"
      />

      <FieldInfo field={field} />
    </div>
  ),
};
