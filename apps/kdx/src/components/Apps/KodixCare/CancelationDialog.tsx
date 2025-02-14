"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@kdx/ui";

import { api } from "~/utils/api";

/**
 * To use this this component, you need to wrap it around a AlertDialogTrigger component.
 */
export default function CancelationDialog({
  eventMasterId,
  eventExceptionId,
  date,
  open,
  setOpen,
}: {
  eventMasterId: string | undefined;
  eventExceptionId: string | undefined;
  date: Date;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!eventMasterId && !eventExceptionId)
    throw new Error("eventMasterId or eventExceptionId must be defined");

  const [radioValue, setRadioValue] = useState<
    "all" | "thisAndFuture" | "single"
  >("single");

  const [buttonLoading, setButtonLoading] = useState(false);
  const ctx = api.useContext();
  const { mutate: cancelEvent } = api.event.cancelEvent.useMutation({
    onMutate: () => {
      setButtonLoading(true);
    },
    onSuccess: () => {
      void ctx.event.getAll.invalidate();
      setOpen(false);
    },
    onSettled: () => {
      setButtonLoading(false);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Exclude recurrent event</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="my-6">
              <RadioGroup
                className="flex flex-col space-y-2"
                defaultValue="thisEvent"
              >
                <div className="flex">
                  <RadioGroupItem
                    id="single"
                    value={"single"}
                    onClick={() => {
                      setRadioValue("single");
                    }}
                    className=""
                  />
                  <Label htmlFor="single" className="ml-2">
                    This event
                  </Label>
                </div>
                <div className="flex">
                  <RadioGroupItem
                    id="thisAndFuture"
                    value={"thisAndFuture"}
                    onClick={() => {
                      setRadioValue("thisAndFuture");
                    }}
                  />
                  <Label htmlFor="thisAndFuture" className="ml-2">
                    This and future events
                  </Label>
                </div>
                <div className="flex">
                  <RadioGroupItem
                    id="all"
                    value={"all"}
                    onClick={() => {
                      setRadioValue("all");
                    }}
                  />
                  <Label htmlFor="all" className="ml-2">
                    All events
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-background">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();

              const objWithId = eventExceptionId
                ? { eventExceptionId }
                : { eventMasterId };

              if (radioValue === "all")
                cancelEvent({
                  ...objWithId,
                  exclusionDefinition: "all",
                });
              else if (
                radioValue === "thisAndFuture" ||
                radioValue === "single"
              )
                cancelEvent({
                  ...objWithId,
                  exclusionDefinition: radioValue,
                  date,
                });
            }}
          >
            {buttonLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>OK</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
