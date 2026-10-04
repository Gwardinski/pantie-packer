import {
  Button,
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
} from "@/components/gmac.ui";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

const formSchema = z.object({
  daysAway: z
    .string()
    .min(1, { message: "How many days are you away for?" })
    .transform(Number)
    .pipe(
      z
        .number()
        .int({ message: "Whole days only please" })
        .min(1, { message: "Time travelling unsupported" }),
    ),
  ibs: z.boolean(),
});

const MAX_DAYS = 18;

function App() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm({
    defaultValues: {
      daysAway: "",
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
      <Card variant="glass" className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Panty Calculator</CardTitle>
          <CardDescription>How many panties do you need...</CardDescription>
        </CardHeader>

        <form
          id="pantie-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <CardBody>
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
                        variant="glass"
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="4"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        step={1}
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

            <Button type="submit" className="mt-8 w-full">
              Calculate Panties
            </Button>
          </CardBody>
        </form>
      </Card>

      <Card variant="glass" className="min-h-100 w-full max-w-md">
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        {hasPanties && (
          <CardBody className="flex flex-col gap-2">
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
          </CardBody>
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

const submitForm = (data: z.input<typeof formSchema>): Result => {
  const { ibs } = data;
  const daysAway = Number(data.daysAway);

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
