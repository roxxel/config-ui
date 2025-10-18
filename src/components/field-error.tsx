export const FieldError = ({ message }: { message: string | null }) => {
  if (!message) {
    return <p></p>;
  }

  return <p class="text-red-400">{message}</p>;
};
