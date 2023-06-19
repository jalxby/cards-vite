import React, { FC, ReactNode } from "react";
import { Skeleton } from "@mantine/core";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { selectIsLoading } from "@/app/app.selectors.ts";

type PropsType = {
  children: ReactNode;
};

export const TableDataItem: FC<PropsType> = React.memo(({ children }) => {
  const isLoading = useAppSelector(selectIsLoading);
  return <Skeleton visible={isLoading}>{children}</Skeleton>;
});
