const formatError = (error) => {
  if (!(error instanceof Error)) return error;

  const { stack, data, message, token, ...rest } = error as any;

  const errorData = {
    token,
    data,
    message: message || 'Error processing request',
  };

  const errorToLog = {
    ...errorData,
    ...rest,
    stack,
    message,
  };

  console.log('Error during request processing', errorToLog);

  return errorData;
};

export const errorHandler = () => (err, _req, res, _next) => {
  if (err && err.redirect) {
    res.redirect(err.redirect);
  } else {
    res.status(err.status || 500).json(formatError(err));
  }
};
