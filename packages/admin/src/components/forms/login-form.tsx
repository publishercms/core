import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

import { EmailField } from "../fields/email-field";
import { PasswordField } from "../fields/password-field";

export const LoginForm = ({ onSubmit }: {
  onSubmit: (values: {
    email: string;
    password: string;
  }) => void;
}) => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    defaultState: {
      canSubmit: false,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="flex flex-col gap-2">
        <form.Field
          name={EmailField.name}
          validators={EmailField.validators}
          children={EmailField.children}
        />

        <form.Field
          name={PasswordField.name}
          validators={PasswordField.validators}
          children={PasswordField.children}
        />
      </div>

      <div className="mt-4">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="w-full cursor-pointer disabled:cursor-not-allowed" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? (
                <Spinner className="size-6" variant="infinite" />
              ) : 'Sign in'}
            </Button>
          )}
        />
      </div>
    </form>
  );
}