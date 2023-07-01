import type { BoxProps } from "@chakra-ui/react";
import { Box, Button, VStack } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";

interface Props extends BoxProps {
  children: React.ReactNode;
  noOfLines: number;
}

export const ExpandableText = forwardRef<HTMLDivElement, Props>(
  ({ children, noOfLines, ...rest }, ref) => {
    const [expandedCount, setExpandedCount] = useState<number | undefined>(
      noOfLines
    );
    const [isClicked, setIsClicked] = useState(false);

    const handleToggle = () => {
      setIsClicked(true);
      setExpandedCount(expandedCount ? undefined : noOfLines);
    };

    const inputRef = React.useRef<HTMLInputElement>(null);

    // this is extremely slow to update, not sure why
    const isTextClamped =
      (inputRef.current?.scrollHeight as number) >
        (inputRef.current?.clientHeight as number) || isClicked;

    return (
      <VStack ref={ref} {...rest} alignItems={"flex-start"}>
        <Box ref={inputRef} noOfLines={expandedCount}>
          {children}
        </Box>
        <Button
          display={isTextClamped ? "block" : "none"}
          size="sm"
          colorScheme="blue"
          variant="link"
          fontWeight={"semibold"}
          onClick={handleToggle}
        >
          {!expandedCount ? "Show less" : "Show more"}
        </Button>
      </VStack>
    );
  }
);
