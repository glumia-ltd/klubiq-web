interface getErrorResponseMessageProps {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
}

export const getErrorResponseMessage = ({
  response,
  message,
}: getErrorResponseMessageProps) => {
  if (response && response.data) {
    return response.data.message;
  }
  if (message) {
    return message;
  }
  return "Something went Wrong";
};
export const getErrorResponseMessageTwo = ({
  response,
  message,
}: getErrorResponseMessageProps) => {
  if (response && response.data) {
    return response.data.message;
  }
  if (message) {
    return message;
  }
  return "Something went Wrong";
};
