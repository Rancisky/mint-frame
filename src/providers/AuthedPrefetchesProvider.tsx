"use client";

import React from "react";

import { Loading } from "@/components/ui/loading";

import { useViewer } from "./FrameContextProvider";

function AuthedPrefetchesProvider({ children }: React.PropsWithChildren) {
  const { fid } = useViewer();

  const [readyToLoad, setReadyToLoad] = React.useState<boolean>(false);

  const prefetch = React.useCallback(async () => {
    await Promise.all([
      // Let's at least make sure to wait for small amount of seconds
      // so the splash dismiss is not too jarring. We can always remove later.
      await new Promise((resolve) => setTimeout(resolve, 1e3 * 2)),
    ]);
    console.log("fid:", fid);

    setReadyToLoad(true);
  }, [fid]);

  React.useEffect(() => {
    prefetch();
  }, [prefetch]);

  if (!readyToLoad) {
    return <Loading />;
  }

  return children;
}

export { AuthedPrefetchesProvider };