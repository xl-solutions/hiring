interface Error {
  status: number;
  message: string;
}

export default (error): Error => {
  return {
    status: error.status || 500,
    message: error.message || 'Internal Error'
  }
}
