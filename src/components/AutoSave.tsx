import React, { memo, useCallback } from "react";

import debounce from "debounce";
import { useFormContext, useWatch } from "react-hook-form";
import useDeepCompareEffect from "use-deep-compare-effect";

const AutoSave = memo(({ defaultValues, onSubmit }: Props) => {
  const methods = useFormContext();

  const debouncedSave = useCallback(
    debounce(() => {
      console.log("Saving");
      methods.handleSubmit(onSubmit)();
    }, 1000),
    []
  );

  // // Watch all the data, provide with defaultValues from server, this way we know if the new data came from server or where actually edited by user
  // const watchedData = methods.watch(undefined, defaultValues);
  const watchedData = useWatch({
    control: methods.control,
    defaultValue: defaultValues,
  });

  useDeepCompareEffect(() => {
    console.log("Triggered");
    if (methods.formState.isDirty) {
      debouncedSave();
    }
  }, [watchedData]);

  return null;
});

AutoSave.displayName = "AutoSave";

type Props = {
  defaultValues: any;
  onSubmit: any;
};

export default AutoSave;
