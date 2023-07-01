import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { uploadIncidentFile } from "../services/incident";

export const FileUploadModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const toast = useToast();

  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const uploadIncidentFileMutation = useMutation({
    mutationFn: uploadIncidentFile,
    onError: () => {
      toast({
        title: "Something went wrong, try again",
        status: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getIncidents");
      onClose();
    },
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      toast({
        title: "Please select a file.",
        status: "error",
      });

      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await uploadIncidentFileMutation.mutateAsync(formData);
  };

  // NOTE: the file input for chakra needs a lot of styling work
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Incident</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <FormLabel>Select a file</FormLabel>
              <Input type="file" accept=".json" onChange={handleFileChange} />
            </FormControl>
            <Button
              type="submit"
              mt="4"
              isLoading={uploadIncidentFileMutation.isLoading}
            >
              Upload
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
