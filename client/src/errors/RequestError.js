class RequestError extends Error {
  constructor(message, status, metadata) {
    super(message);
    this.status = status;
    this.metadata = metadata;
  }
}

export default RequestError;
