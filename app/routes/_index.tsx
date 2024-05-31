import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import {
  RemixFormProvider,
  getValidatedFormData,
  useRemixForm,
} from "remix-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormItems,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const FormSchema = z.object({
  daysAway: z.coerce.number().min(1),
  ibs: z.boolean().optional(),
});
export const formResolver = zodResolver(FormSchema);
export type FormType = z.infer<typeof FormSchema>;

const MAX_DAYS = 18;

export const action = async ({ request }: ActionFunctionArgs) => {
  // Validate Form Data
  const { receivedValues, errors, data } = await getValidatedFormData<FormType>(
    request,
    formResolver,
  );
  if (errors) {
    return json(
      {
        panties: 0,
        daysAway: 0,
        ibs: 0,
        hitMax: false,
        errors,
        receivedValues,
      },
      400,
    );
  }

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

export default function Index() {
  const actionRes = useActionData<typeof action>();

  const form = useRemixForm<FormType>({
    resolver: formResolver,
    defaultValues: {
      ibs: false,
    },
  });

  const panties = actionRes?.panties;
  const daysAway = actionRes?.daysAway;
  const ibs = actionRes?.ibs;
  const hitMax = actionRes?.hitMax;
  const hasPanties = Boolean(panties);

  return (
    <section className="flex w-full flex-col items-center gap-4 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Pantie Calculator</CardTitle>
          <CardDescription>How many days will you be away?</CardDescription>
        </CardHeader>

        <Form method="post" onSubmit={form.handleSubmit}>
          <RemixFormProvider {...form}>
            <CardContent>
              <FormItems>
                <FormField
                  control={form.control}
                  name="daysAway"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Days Away</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="7" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ibs"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>

                      <FormLabel className="pl-1 font-normal">
                        Do you have issues with your bowel (ibs)? Are prone to
                        accidents, have had an accident before, or some
                        near-misses.
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </FormItems>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                Calculate Panties
              </Button>
            </CardFooter>
          </RemixFormProvider>
        </Form>
      </Card>

      {hasPanties && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
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
              <p>
                This provides a fresh pair of panties for each day, plus some
                piece-of-mind extras. {ibs && <i>Just in case...</i>}
              </p>
            )}

            {ibs && (
              <p>You may also want to pack wet wipes and hand sanitiser.</p>
            )}
          </CardContent>
        </Card>
      )}
    </section>
  );
}

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
