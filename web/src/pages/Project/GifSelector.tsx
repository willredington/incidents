import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { searchGifs } from "../../services/gif";

export function GifSelector({ gifHint }: { gifHint: string }) {
  const { getAccessTokenSilently } = useAuth0();

  const [pageIndex, setPageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState(gifHint);

  const { isLoading, data: gifs } = useQuery({
    queryKey: ["searchGifs", searchTerm, pageIndex],
    queryFn: () =>
      searchGifs({
        getJwtToken: getAccessTokenSilently,
        searchTerm,
        limit: 9,
        offset: pageIndex,
      }),
    enabled: !!searchTerm,
  });

  return (
    <>
      <FormControl>
        <FormLabel>GIF Search Term</FormLabel>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          placeholder="Search for a GIF"
        />
      </FormControl>
      <Grid templateColumns={"1fr 1fr 1fr"}>
        {gifs?.map((gif) => (
          <Box key={gif.id} height={"100px"}>
            <Image
              src={gif.images.downsized.url}
              alt={gif.title}
              objectFit="cover"
              width="full"
              height="full"
            />
          </Box>
        ))}
      </Grid>
      <ButtonGroup w="full" justifyContent={"space-between"}>
        <Button
          disabled={pageIndex <= 0 || isLoading}
          onClick={() => setPageIndex((current) => current - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => setPageIndex((current) => current + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </>
  );
}
