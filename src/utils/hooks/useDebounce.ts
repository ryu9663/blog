/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from "react";
import debounce from "lodash/debounce";

export const useDebounce = (
  millisec: number = 500
): [
  string,
  Dispatch<SetStateAction<string>>,
  string,
  Dispatch<SetStateAction<string>>
] => {
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    handleChangeQuery(input || "");
  }, [input]);

  const handleChangeQuery = useCallback(
    debounce((input: string) => {
      setQuery(input);
    }, millisec),
    []
  );

  return [input, setInput, query, setQuery];
};
