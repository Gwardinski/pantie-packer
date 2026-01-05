import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
} from "@/components/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

const formSchema = z.object({
  daysAway: z.number().refine((val) => val >= 0, {
    message: "Time traveller huh?",
  }),
  ibs: z.boolean(),
});

const MAX_DAYS = 18;

function App() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm({
    defaultValues: {
      daysAway: 0,
      ibs: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const result = submitForm(value);
      setResult(result);
    },
  });

  const { panties, daysAway, ibs, hitMax } = result || {};
  const hasPanties = Boolean(panties);

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Pantie Calculator</CardTitle>
          <CardDescription>How many panties do you need...</CardDescription>
        </CardHeader>

        <form
          id="pantie-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <CardContent>
            <FieldGroup>
              <form.Field
                name="daysAway"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Days / Nights Away
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        aria-invalid={isInvalid}
                        placeholder="4"
                        type="number"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <FieldGroup>
              <form.Field
                name="ibs"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <FieldSet className="gap-2">
                      <FieldGroup>
                        <Field
                          orientation="horizontal"
                          data-invalid={isInvalid}
                        >
                          <Checkbox
                            id="form-tanstack-checkbox-responses"
                            name={field.name}
                            checked={field.state.value}
                            onCheckedChange={(checked) =>
                              field.handleChange(checked === true)
                            }
                          />
                          <FieldLabel
                            htmlFor="form-tanstack-checkbox-responses"
                            className="font-normal"
                          >
                            Stomach Troubles?
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                      <FieldDescription>
                        Do you have issues with your bowels (IBS)? Are you prone
                        to accidents, have had an accident before, or some
                        close-calls?
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldSet>
                  );
                }}
              />
            </FieldGroup>

            <Button type="submit" variant="invert" className="mt-8 w-full">
              Calculate Panties
            </Button>
          </CardContent>
        </form>
      </Card>

      <Card className="min-h-[400px] w-full max-w-md">
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        {hasPanties && (
          <CardContent className="flex flex-col gap-2">
            <p>
              Based on you being away for {daysAway} days, you should pack{" "}
              <strong>{panties}</strong> pairs of panties.
            </p>

            {hitMax ? (
              <p>
                We recommend that you look up laundrettes in your area, as
                packing anymore pairs of panties would be excessive.
              </p>
            ) : (
              <>
                <p>
                  This provides a fresh pair of panties for each day, plus some
                  peace-of-mind extras. {ibs && <i>Just in case...</i>}
                </p>
                <p>
                  The extra pairs may come in handy during activity / exercise
                  days!
                </p>
              </>
            )}

            {ibs && (
              <p>You may also want to pack wet wipes and hand sanitiser.</p>
            )}
          </CardContent>
        )}
      </Card>
    </>
  );
}

type Result = {
  panties: number;
  daysAway: number;
  ibs: boolean;
  hitMax: boolean;
};

const submitForm = (data: z.infer<typeof formSchema>): Result => {
  const { daysAway, ibs } = data;

  const hitMax = daysAway >= MAX_DAYS;
  const panties = hitMax ? 20 : calculateThePanties(daysAway, ibs);

  return {
    hitMax,
    daysAway,
    ibs,
    panties,
  };
};

function calculateThePanties(daysAway: number, hasBadBowels?: boolean) {
  let panties = Math.ceil(daysAway * 1.3);
  if (daysAway > 5) {
    panties += 1;
  }
  if (hasBadBowels) {
    panties += 1;
  }
  return panties;
}
